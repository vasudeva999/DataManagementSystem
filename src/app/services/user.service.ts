import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLogin = !!localStorage.getItem('token');

  constructor(
    private http: HttpClient
    ) {
    }


  PORT = 4000;
  PATH = "/data";

  

  // urlGetAllUsers: string = "http://localhost:"+ this.PORT + this.PATH +"/getAllUsers";
  // urlAuthenticate: string = "http://localhost:"+ this.PORT + this.PATH +"/authenticate";
  // urlSetUser: string = "http://localhost:"+ this.PORT + this.PATH +"/addUser";
  // urlDeleteUser: string = "http://localhost:"+ this.PORT + this.PATH +"/dropUser/";
  // urlIsExists: string = "http://localhost:"+ this.PORT + this.PATH +"/isUserExists/";
  // urlUpdateUser: string = "http://localhost:"+ this.PORT + this.PATH + "/updateUser/";

  urlGetAllUsers: string = "http://3.142.152.225:4000/data/"+"/getAllUsers";
  urlAuthenticate: string = "http://3.142.152.225:4000/data/"+"/authenticate";
  urlSetUser: string = "http://3.142.152.225:4000/data/"+"/addUser";
  urlDeleteUser: string = "http://3.142.152.225:4000/data/"+"/dropUser/";
  urlIsExists: string = "http://3.142.152.225:4000/data/"+"/isUserExists/";
  urlUpdateUser: string = "http://3.142.152.225:4000/data/"+"/updateUser/";

  getIsLogin(){
    return this.isLogin;
  }

  setIsLogin(val: boolean){
    this.isLogin = val;
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlGetAllUsers)
  }

  authenticate(user: User): Observable<any>{
    return this.http.post<any>(this.urlAuthenticate, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  setUser(user: User): Observable<any>{
    return this.http.post<any>(this.urlSetUser, user);
    // AllUsers.push(user);
  }

  updateUser(email: string, user: User): Observable<User>{
    return this.http.post<User>(this.urlUpdateUser + email, user);
  }

  isExists(email: string): Observable<boolean>{
    return this.http.get<boolean>(this.urlIsExists + email);
  }

  deleteUser(email: string): Observable<any>{
    return this.http.delete(this.urlDeleteUser + email);
  }

  
}
