import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  users : User[] = [];
  constructor(private userService: UserService) { }

  data_check = "Please wait until fetching the data...";
  

  ngOnInit(): void {
    setTimeout(() => {
      this.data_check = "No Data Found :)";
    }, 3000);

    // this.users  = this.userService.getAllUsers();
    this.userService.getAllUsers().subscribe((users)=>{this.users = users});
  }

}
