import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface User {
  number: string,
  email?: string,
  selfie?: string,
  name?: string
}

interface UserState {
  user: User | null,
  isLoggedIn: boolean
}

const InitialState: UserState = {
  user: null,
  isLoggedIn: !!localStorage.getItem('token')
}

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;
  }
}

export default createReducerFunction(UserReducer, InitialState);
