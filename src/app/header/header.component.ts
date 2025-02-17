import { Component, OnInit } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export default class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthState();
  }

  private async checkAuthState() {
    try {
      const user = await getCurrentUser();
      this.isAuthenticated = !!user;
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
