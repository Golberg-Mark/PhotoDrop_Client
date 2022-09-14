import { createActionCreators } from 'immer-reducer';
import axios from 'axios';

import { UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setIsLoggedIn>;

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
    }
  } catch (error: any) {
    console.log(error);
    localStorage.removeItem('token');
    dispatch(userActions.setIsLoggedIn(false));
    dispatch(userActions.setUser(null));
  }
};
