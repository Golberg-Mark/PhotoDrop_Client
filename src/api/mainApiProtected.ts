import { HttpClientProtected } from '@/api/httpClientProtected';
import { Album, Photo, SelectedAlbum, UpdateUser, User } from '@/store/reducers/user';

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

  public getPreassignedUrl = (contentType: string) => this.instance.post<string>('/getPresignedUrl', { contentType });

  public updateClient = (body: UpdateUser) => this.instance.put<{ message: string }>('/client', body);

  public getAlbums = () => this.instance.get<{ albums: Album[], allPhotos: Photo[] }>('/albums');

  public getAlbum = (albumName: string) => this.instance.get<SelectedAlbum>(`/albums/${albumName}`);

  public checkoutSession = (albumID: string, albumName: string) => this.instance.post<string>(`/createCheckoutSession/${albumID}`, {
    successUrl: `${process.env.NODE_ENV === 'production'
      ? `https://photo-drop-client-one.vercel.app/purchase/${albumName}`
      : `http://127.0.0.1:3000/purchase/${albumName}`}`,
    cancelUrl: `${process.env.NODE_ENV === 'production'
      ? `https://photo-drop-client-one.vercel.app/purchase-failed/${albumName}`
      : `http://127.0.0.1:3000/purchase-failed/${albumName}`}`
  });
}
