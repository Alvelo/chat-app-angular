import { Component, input, OnInit } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { CommonModule } from '@angular/common';
import { Hub } from 'aws-amplify/utils';


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export default class HeaderComponent implements OnInit {

  isAuthenticated = false;
  private hubListener: any;

  constructor(private router: Router) {}

  ngOnInit() {
     this.checkAuthState();

        // Listen for auth events
        this.hubListener = Hub.listen('auth', ({ payload }) => {
          const { event } = payload;
          switch (event) {
            case 'signedIn':
              this.isAuthenticated = true;
              break;
            case 'signedOut':
              this.isAuthenticated = false;
              this.router.navigate(['/']);
              break;
            case 'tokenRefresh':
              this.checkAuthState();
              break;
          }
        });
  }

  private async checkAuthState() {
    try {
      const user = await getCurrentUser();
      this.isAuthenticated = !!user;
      console.log(user)
      if (!this.isAuthenticated) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    }
  }

  async handleSignOut() {
    try {
      await signOut();
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
