import { HttpClientProtected } from '@/api/httpClientProtected';
import { UpdateUser, User } from '@/store/reducers/user';

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

  public getPreassignedUrl = () => this.instance.get<{ url: string }>('/getPresignedUrl');

  public updateClient = (body: UpdateUser) => this.instance.put<{ message: string }>('/client', body);
}
