import { createActionCreators } from 'immer-reducer';
import axios from 'axios';
import { push } from '@lagunovsky/redux-react-router';
import { Buffer } from 'buffer';

import { PhoneNumber, User, UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setAuthNumber>
  | ReturnType<typeof userActions.setAuthStep>
  | ReturnType<typeof userActions.cleanAuthState>
  | ReturnType<typeof userActions.setTempUserPhoto>;

export const getMeAction  = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    if (localStorage.getItem('token')) {
      const user = await mainApiProtected.getClient();

      dispatch(userActions.setUser(user));
      dispatch(userActions.setIsLoggedIn(true));

      if (!user.selfie) dispatch(push('/selfie'));
    }
  } catch (error: any) {
    console.log(error);
    localStorage.removeItem('token');
    dispatch(userActions.setIsLoggedIn(false));
    dispatch(userActions.setUser(null));
  }
};

export const createAccountAction  = (number: PhoneNumber, isResend?: boolean): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { message } = await mainApi.createAccount(number);

    if (message && !isResend) {
      dispatch(userActions.setAuthStep(2));
      dispatch(push('/auth/verify'));
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const verifyOtpAction  = (number: PhoneNumber, code: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainApiProtected }
) => {
  try {
    const { token } = await mainApi.verifyOtp(number, code);

    if (token) {
      localStorage.setItem('token', token);

      const user = await mainApiProtected.getClient();

      if (user) {
        dispatch(userActions.setAuthStep(1));
        dispatch(userActions.setUser(user));
        dispatch(userActions.setIsLoggedIn(true));

        if (!user.selfie) dispatch(push('/selfie'));
        else dispatch(push('/'));
      }
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const uploadSelfieAction = (file: string): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const { url } = await mainApiProtected.getPreassignedUrl();

    if (url) {
      const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64');

      axios.put(url, buf, {
        headers: {
          'ContentEncoding': 'base64',
          'Content-Type': 'image/jpeg'
        }
      }).then(__ => {
        dispatch(userActions.setTempUserPhoto(file));
        dispatch(push('/'));
      });
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};
