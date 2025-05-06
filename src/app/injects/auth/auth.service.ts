import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dev = isDevMode;

  loggendIn: WritableSignal<boolean> = signal(false);
  user: WritableSignal<{id: number} | null> = signal(null);

  constructor(private http: HttpClient) { }

  login() {
    const popup = window.open(
      this.dev() ? 'http://localhost:3002/api/auth/google/login' : 'https://koop-games.walternicolas.de/api/auth/google/login',
      'GoogleAuth',
      'width=500,height=600,menubar=no,toolbar=no'
    );

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        
        this.http.get('http://localhost:3002/api/users/loggedIn', { withCredentials: true }).subscribe({
          next: (response) => {
            console.log('Logged in successfully', response);
            this.user.set(response as {id: number});
            this.loggendIn.set(true);
          },
          error: (error) => {
            console.error('Error logging in', error);
            this.loggendIn.set(false);
          }
        });
      }
    });
  }

  getLoggedIn() {
    return this.loggendIn;
  }
}
