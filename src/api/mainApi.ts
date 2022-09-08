import HttpClient from '@/api/httpClient';

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super('https://pgq3rrm92c.execute-api.us-east-1.amazonaws.com/dev');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }
}

export default MainApi;
