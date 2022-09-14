import { State } from '@/store';
import { createSelector, Selector } from 'reselect';
import { AuthStep, PhoneNumber, User } from '@/store/reducers/user';

const userState = (state: State) => state.userReducer;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
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
