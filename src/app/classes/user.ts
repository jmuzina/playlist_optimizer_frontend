import { SpotifyUser } from './supported_networks/spotify';

export class User {
  public spotifyAccount?: SpotifyUser;

  constructor(public id: number) {}
}
