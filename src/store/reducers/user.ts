import { ImmerReducer, createReducerFunction } from 'immer-reducer';

interface UserState {
  isLoggedIn: boolean
}

const InitialState: UserState = {
  isLoggedIn: false
}

export class UserReducer extends ImmerReducer<UserState> {
  public setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;
  }
}

export default createReducerFunction(UserReducer, InitialState);
