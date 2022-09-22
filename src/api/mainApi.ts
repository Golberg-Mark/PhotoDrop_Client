import HttpClient from '@/api/httpClient';
import { PhoneNumber } from '@/store/reducers/user';

export interface PhoneRequest {
  number: PhoneNumber,
  newNumber?: PhoneNumber
}

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super('https://pgq3rrm92c.execute-api.us-east-1.amazonaws.com/dev');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public createAccount = (body: PhoneRequest) => (
    this.instance.post<{ message: string }>('/sendOtp', body)
  );

  public verifyOtp = (body: PhoneRequest, code: string) => (
    this.instance.post<{ token: string }>('/verifyOtp', { ...body, code })
  );
}

export default MainApi;
