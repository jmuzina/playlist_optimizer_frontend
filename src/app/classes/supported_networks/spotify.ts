import { User } from '../user';

export class SpotifyUser {
  constructor(
    public user: User,
    public spotifyUserID: number,
    public email: string,
    public displayName: string,
    public profilePictureURL: string
  ) {}
}
