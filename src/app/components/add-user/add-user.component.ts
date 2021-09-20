import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }


  name = '';
  email = '';
  password = '';


  password_type = 'password';
  btn_status = "Show Password";
  class_status = "btn btn-primary btn-lg";

  alert_msg = "";
  alert_title = "";

  show_password(){
    if (this.password_type == 'password') {
      this.password_type = 'text';
      this.btn_status = "Hide password";
      this.class_status = "btn btn-danger btn-lg";
    }
    else {
      this.password_type = 'password';
      this.btn_status = "Show password";
      this.class_status = "btn btn-primary btn-lg";
    }
  }


  submitForm(){
    if (!this.userService.isExists(this.email)){
      if (this.name != '' && this.email != '' && this.password != ''){
        this.userService.setUser({
            name: this.name,
            email: this.email,
            password: this.password
        })

        this.alert_msg = "User with email id "+ this.email +" has been added to DataBase";
        this.alert_title = "Success!";

        this.name = ''
        this.email = ''
        this.password = ''

      }
    }else {
      this.alert_msg = "User with email id "+ this.email +" is already Exists in DataBase";
      this.alert_title = "Error!";

    }
    setTimeout(() => {
      document.getElementById("alert_close")?.click();
    }, 5000);
  }

}
