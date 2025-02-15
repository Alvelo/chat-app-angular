import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fetchUserAttributes, getCurrentUser, updateUserAttributes, signOut, } from 'aws-amplify/auth';
import {Amplify} from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { BrowserModule } from '@angular/platform-browser';

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
  imports: [ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    AmplifyAuthenticatorModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

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

  // Form
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

}
