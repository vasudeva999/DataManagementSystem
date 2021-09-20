import { Injectable } from '@angular/core';
import { AllUsers } from './app.allUsers';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000/displayUsers";

  getAllUsers(): Observable<User[]>{ 
    return this.http.get<User[]>(this.url);
  }

  setUser(user: any){
    AllUsers.push(user);
  }

  isExists(email: string){
    var isUserExists = false;
    for(let i=0; i<AllUsers.length; i++){
      if (AllUsers[i].email == email){
        isUserExists = true;
        break;
      }
    }

    return isUserExists;
  }

  deleteUser(email: any){
    var i = 0;
    while (i< AllUsers.length){
      if (AllUsers[i].email == email)
        AllUsers.splice(i, 1);
      else
        i++;
    }
  }

  
}
