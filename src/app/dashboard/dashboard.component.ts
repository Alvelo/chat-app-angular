import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [ MatCardModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private router: Router) {
    this.getCurrentUser();
  }


 async getCurrentUser() {
    try{
      const user = await fetchUserAttributes();
      //console.log(user);
      this.data.next(user);
      console.log(this.data.value.name);
    } catch(err) {

    }
  }
}
