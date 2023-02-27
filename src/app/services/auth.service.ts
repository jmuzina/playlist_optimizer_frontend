import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticatedUser?: User;
  public get authenticatedUser(): User | undefined {
    return this._authenticatedUser;
  }

  constructor() {}

  public async me(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this._authenticatedUser) {
        resolve(this._authenticatedUser);
        return;
      }
      // No user was found!
      if (localStorage.getItem('token')) {
        // There is a cookie found but no user found: a previously authed user is logging in for the first time in this session (cold load)
        // Send token to backend to prove user identity
        //  ID proven: resolve with user
        //  not proven: prompt for login
        return;
      }
      // No user found and no cookie!

      // Prompt for user log in
    });
  }
}
