import { State } from '@/store';
import { createSelector, Selector } from 'reselect';
import { User } from '@/store/reducers/user';

const userState = (state: State) => state.userReducer;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
);

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoggedIn }) => isLoggedIn
);
