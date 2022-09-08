import { State } from '@/store';
import { createSelector, Selector } from 'reselect';

const userState = (state: State) => state.userReducer;

export const selectExample: Selector<State, {}> = createSelector(
  userState,
  (state) => state
);
