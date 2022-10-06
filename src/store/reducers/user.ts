import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export type AuthStep = 1 | 2;

export interface PhoneNumber {
  countryCode: string,
  phoneNumber: string
}

export interface User {
  number: PhoneNumber,
  email?: string,
  selfie?: string,
  fullName?: string
}

export interface UpdateUser {
  fullName?: string,
  email?: string
}

export interface Photo {
  id: string,
  albumId: string,
  albumName: string,
  url150: string,
  url300: string,
  url600: string,
  url1200: string,
  originalUrl?: string,
  watermark: boolean,
  countAlbumPhotos: number
}

export interface Album {
  id: string,
  name: string,
  location: string,
  date: string,
  url150: string,
  url300: string
}

export interface SelectedAlbum {
  id: string,
  name: string,
  location: string,
  date: string,
  photos: Photo[]
}

interface UserState {
  user: User | null,
  albums: Album[] | null,
  allPhotos: Photo[] | null,
  selectedAlbum: SelectedAlbum | null,
  tempUserPhoto: string | null,
  tempUserName: string | null,
  tempUserEmail: string | null,
  authNumber: PhoneNumber | null,
  authStep: AuthStep,
  isLoggedIn: boolean
}

const InitialState: UserState = {
  user: null,
  albums: null,
  allPhotos: null,
  selectedAlbum: null,
  tempUserPhoto: null,
  tempUserName: null,
  tempUserEmail: null,
  authNumber: null,
  authStep: 1,
  isLoggedIn: !!localStorage.getItem('token')
}

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setTempUserPhoto(value: string | null) {
    this.draftState.tempUserPhoto = value;
  }

  public setTempUserName(value: string | null) {
    this.draftState.tempUserName = value;
  }

  public setTempUserEmail(value: string | null) {
    this.draftState.tempUserEmail = value;
  }

  public setAlbums(value: Album[] | null) {
    this.draftState.albums = value;
  }

  public setAllPhotos(value: Photo[] | null) {
    this.draftState.allPhotos = value;
  }

  public setSelectedAlbum(value: SelectedAlbum | null) {
    this.draftState.selectedAlbum = value;
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
