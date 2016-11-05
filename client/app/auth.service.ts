import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { myConfig } from './auth.config';
import { UserApi } from "./shared/sdk/services/custom/User";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

  constructor(private userApi: UserApi) {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {

      this.lock.getProfile(authResult.idToken, (error, profile ) => {
        if (error) {
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        this.userApi.auth0(authResult.idToken)
          .subscribe((data) => {
            console.log('coucou data', data);
          });
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}
