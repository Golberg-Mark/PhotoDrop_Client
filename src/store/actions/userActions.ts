import { createActionCreators } from 'immer-reducer';
import axios from 'axios';

import { PhoneNumber, UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';
import { push } from '@lagunovsky/redux-react-router';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setAuthNumber>
  | ReturnType<typeof userActions.setAuthStep>;

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
  { mainApi }
) => {
  try {
    const { token } = await mainApi.verifyOtp(number, code);

    if (token) {
      localStorage.setItem('token', token);
      dispatch(userActions.setIsLoggedIn(true));
      dispatch(userActions.setAuthStep(1));
      dispatch(push('/'));
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};
