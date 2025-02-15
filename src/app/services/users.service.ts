import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  user: any;
  set userSet(user: any) {
    this.user = user;
  }

  get userAws() {
    return this.user;
  }
}

