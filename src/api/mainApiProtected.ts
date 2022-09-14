import { HttpClientProtected } from '@/api/httpClientProtected';
import { User } from '@/store/reducers/user';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public getClient = () => this.instance.get<User>('/client');
}
