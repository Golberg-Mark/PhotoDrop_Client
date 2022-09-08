import { createActionCreators } from 'immer-reducer';
import axios from 'axios';

import { UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setIsLoggedIn>;

export const someActionExample  = (): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {

  } catch (error: any) {
    const message = error.code === 400 ? 'Invalid phone number' : error.message;
    dispatch(errorActions.setErrorMessage(message));
  }
};
