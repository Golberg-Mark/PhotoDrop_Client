import { HttpClientProtected } from '@/api/httpClientProtected';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }
}
