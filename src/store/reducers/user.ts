import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export type AuthStep = 1 | 2;

export interface PhoneNumber {
  countryCode: string,
  phoneNumber: string
}

export interface User {
  number: string,
  email?: string,
  selfie?: string,
  name?: string
}

interface UserState {
  user: User | null,
  authNumber: PhoneNumber | null,
  authStep: AuthStep,
  isLoggedIn: boolean
}

const InitialState: UserState = {
  user: null,
  authNumber: null,
  authStep: 1,
  isLoggedIn: !!localStorage.getItem('token')
}

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;
  }

  public setAuthNumber(value: PhoneNumber | null) {
    this.draftState.authNumber = value;
  }

  public setAuthStep(value: AuthStep) {
    this.draftState.authStep = value;
  }

  public cleanAuthState() {
    this.draftState.authStep = 1;
    this.draftState.authNumber = null;
  }
}

export default createReducerFunction(UserReducer, InitialState);
