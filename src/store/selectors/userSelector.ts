import { State } from '@/store';
import { createSelector, Selector } from 'reselect';
import { Album, AuthStep, PhoneNumber, User } from '@/store/reducers/user';

const userState = (state: State) => state.userReducer;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
);

export const selectTempUserPhoto: Selector<State, string | null> = createSelector(
  userState,
  ({ tempUserPhoto }) => tempUserPhoto
);

export const selectTempUserName: Selector<State, string | null> = createSelector(
  userState,
  ({ tempUserName }) => tempUserName
);

export const selectTempUserEmail: Selector<State, string | null> = createSelector(
  userState,
  ({ tempUserEmail }) => tempUserEmail
);

export const selectAlbums: Selector<State, Album[] | null> = createSelector(
  userState,
  ({ albums }) => albums
);

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectAuthNumber: Selector<State, PhoneNumber | null> = createSelector(
  userState,
  ({ authNumber }) => authNumber
);

export const selectAuthStep: Selector<State, AuthStep> = createSelector(
  userState,
  ({ authStep }) => authStep
);
