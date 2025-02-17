import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { 
  fetchUserAttributes, 
  getCurrentUser, 
  updateUserAttributes, 
  signOut, 
  GetCurrentUserOutput,
} from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils'; 
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_kFsocEHV9',
      userPoolClientId: '46vjh3venau7gbfq7uv0mefp5l'
    }
  }
});

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    AmplifyAuthenticatorModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };

  userForm!: FormGroup;
  private hubListener: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Listen for auth events using Hub
    this.hubListener = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      
      if (event === 'signedIn') {
        // User is signed in, redirect to dashboard
        this.router.navigate(['/connect']);
      }
    });

    // Optional: Check if user is already signed in
    this.checkAuthState();
  }

  ngOnDestroy(): void {
    // Clean up the listener when component is destroyed
    if (this.hubListener) {
      this.hubListener();
    }
  }

  private async checkAuthState() {
    try {
      const user = await getCurrentUser();
      if (user) {
        // User is already signed in, redirect to dashboard
        this.router.navigate(['/connect']);
      }
    } catch (error) {
      // User is not signed in, stay on login page
      console.log('User is not signed in');
    }
  }
}