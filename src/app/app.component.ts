import { Component, isDevMode, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './injects/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskManagementSystem';

  loggedIn: WritableSignal<boolean>;
  user: WritableSignal<{id: number} | null>;
  

  dev = isDevMode;

  constructor(private authService: AuthService) {
    this.loggedIn = this.authService.getLoggedIn();
    this.user = this.authService.user;
  }

  login() {
    this.authService.login();
  }
}
