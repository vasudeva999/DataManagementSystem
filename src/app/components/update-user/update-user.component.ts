import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    
  ) { }

  alert_title = "Loading!";
  alert_msg = "Please wait! We are validating your data";

  ngOnInit(): void {
    if (!this.userService.getIsLogin()){
      this.alert_msg = "Please Login! To get the access.";
      this.alert_title = "Error!";

      document.getElementById("pop_up")?.click();      

      setTimeout(()=>{
        document.getElementById("alert_close")?.click();
        this.router.navigate(["/"])
      }, 1800);
    }else{
      this.alert_msg = "Please wait! We are validating your data";
      this.alert_title = "Loading!";
    }
  }

  errorMsg = ''

  existsEmail = ''

  name = '';
  email = '';
  password = '';

  password_type = 'password';
  btn_status = "Show Password";
  class_status = "btn btn-primary btn-lg";


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

  isExists = false;
  isExistsNew = false;

  submitForm(){
    this.userService.isExists(this.existsEmail).subscribe(isExists => {
      this.isExists=isExists;

      this.userService.isExists(this.email).subscribe(isExistsNew=>{
        this.isExistsNew=isExistsNew;

        if ((this.email==this.existsEmail) || (this.isExists && !this.isExistsNew)){
          if (this.name != '' && this.email != '' && this.password != ''){
            this.userService.updateUser(this.existsEmail, {
                name: this.name,
                email: this.email,
                password: this.password
            }).subscribe(
              ()=>{},
              error => {this.errorMsg = error.message}
            );
  
            this.alert_msg = "User with email id "+ this.email +" has been updated!";
            this.alert_title = "Success!";
  
            this.name = ''
            this.email = ''
            this.password = ''

            this.existsEmail = ''
  
          }else {
            this.alert_msg = "All fields are mandatory!";
            this.alert_title = "Error!";  
          }
        }else if(this.isExistsNew){
          this.alert_msg = "User with email id "+ this.email +" is already Exists in DataBase";
          this.alert_title = "Error!";
        }else {
          this.alert_msg = "User with email id "+ this.existsEmail +" is not Exists in DataBase";
          this.alert_title = "Error!";
  
        }
        

      })
      setTimeout(() => {
        document.getElementById("alert_close")?.click();
      }, 5000);

    })
  }

}
