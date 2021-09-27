import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit, OnChanges {

  @Input() 
  users: User[] = [];
  
  data_check = "Please wait until fetching the data...";
  errorMsg = '';

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
    setTimeout(() => {
      this.data_check = "No Data Found :(";
    }, 3000);

    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users
      },
      error => {
        this.errorMsg = error.message;
        console.log(error);
      }
      );

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users
      },
      error => {
        this.errorMsg = error.message;
        console.log(error);
      }
      );
    
    
  }

  



  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.data_check = "No Data Found :(";
  //   }, 3000);
 
  //   this.userService.getAllUsers().subscribe(
  //     users => {
  //       this.users = users
  //     },
  //     error => {
  //       this.errorMsg = error.message;
  //       console.log(error);
  //     }
  //     );
  
  // }

  

}
