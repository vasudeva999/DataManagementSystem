import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  email = ''
  password = ''

  alert_msg = "";
  alert_title = "";

  deleteUser(email: any){
    if (this.userService.isExists(email)){
      if (email != ''){
        this.userService.deleteUser(email);
        this.email = '';

        this.alert_msg = "User with email id "+ email +" has been removed from DataBase";
        this.alert_title = "Success!";

    }
    }
    else{
      this.alert_msg = "User with email id "+ email +" Not Exists in DataBase";
      this.alert_title = "Error!";
      
    }
    setTimeout(() => {
      document.getElementById("alert_close")?.click();
    }, 5000);
  }

}
