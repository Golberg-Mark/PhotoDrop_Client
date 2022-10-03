import { createActionCreators } from 'immer-reducer';
import axios from 'axios';
import { push } from '@lagunovsky/redux-react-router';
import { Buffer } from 'buffer';

import { UpdateUser, UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';
import { PhoneRequest } from '@/api/mainApi';
import { HandleToggle } from '@/hooks/useToggle';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setAuthNumber>
  | ReturnType<typeof userActions.setAuthStep>
  | ReturnType<typeof userActions.cleanAuthState>
  | ReturnType<typeof userActions.setTempUserPhoto>
  | ReturnType<typeof userActions.setTempUserName>
  | ReturnType<typeof userActions.setTempUserEmail>
  | ReturnType<typeof userActions.setAlbums>
  | ReturnType<typeof userActions.setAllPhotos>
  | ReturnType<typeof userActions.setSelectedAlbum>;

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

export const createAccountAction  = (body: PhoneRequest, isResend?: boolean): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { message } = await mainApi.createAccount(body);

    if (message) {
      if (!isResend) {
        const redirectPath = body.newNumber ? '/profile/settings/changePhone/verify' : '/auth/verify';

        dispatch(userActions.setAuthStep(2));
        dispatch(push(redirectPath));
      }
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const verifyOtpAction  = (body: PhoneRequest, code: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainApiProtected }
) => {
  try {
    const { token } = await mainApi.verifyOtp(body, code);

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

export const uploadSelfieAction = (file: string, withoutRouting: boolean = false): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const url = await mainApiProtected.getPreassignedUrl('image/jpeg');

    if (url) {
      const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64');

      axios.put(url, buf, {
        headers: {
          'ContentEncoding': 'base64',
          'Content-Type': 'image/jpeg'
        }
      }).then(__ => {
        dispatch(userActions.setTempUserPhoto(file));
        if (!withoutRouting) dispatch(push('/'));
      });
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const updateClientAction = (body: UpdateUser, navigateTo: string): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const { message } = await mainApiProtected.updateClient(body);

    if (message) {
      body.name
        ? dispatch(userActions.setTempUserName(body.name))
        : dispatch(userActions.setTempUserEmail(body.email!));

      dispatch(push(navigateTo));
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const getAlbumsAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const { albums, allPhotos } = await mainApiProtected.getAlbums();

    dispatch(userActions.setAlbums(albums));
    dispatch(userActions.setAllPhotos(allPhotos));
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const getSelectedAlbumAction = (albumName: string): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const album = await mainApiProtected.getAlbum(albumName);

    dispatch(userActions.setSelectedAlbum(album));
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};

interface IRemoveWatermark {
  albumName: string,
  photoName?: string,
  callback: HandleToggle
}

export const removeWatermarkAction = ({ albumName, photoName }: IRemoveWatermark): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const { message } = await mainApiProtected.removeWatermark(photoName || albumName);

    if (message) {
      dispatch(push('/albums/thanks', { albumName }));
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 400) dispatch(errorActions.setErrorMessage(error.message));
  }
};
