import HttpClient from '@/api/httpClient';
import { PhoneNumber } from '@/store/reducers/user';

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super('https://pgq3rrm92c.execute-api.us-east-1.amazonaws.com/dev');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public createAccount = (number: PhoneNumber) => (
    this.instance.post<{ message: string }>('/sendOtp', { number })
  );

  public verifyOtp = (number: PhoneNumber, code: string) => (
    this.instance.post<{ token: string }>('/verifyOtp', { number, code })
  );
}

export default MainApi;
