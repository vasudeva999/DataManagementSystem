import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  alert_msg = "Please wait! We are validating your data";
  alert_title = "Loading!";

  ngOnInit(): void {
    if (!this.userService.getIsLogin()){
      this.alert_msg = "Please Login! To get the access.";
      this.alert_title = "Error!";

      document.getElementById("pop_up")?.click();      

      setTimeout(()=>{
        document.getElementById("alert_close")?.click();
        this.router.navigate(["/login"])
      }, 1800);
    }else{
      this.alert_msg = "Please wait! We are validating your data";
      this.alert_title = "Loading!";
    }
  }

  errorMsg = "";

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

  submitForm(){
    this.userService.isExists(this.email).subscribe(isExists => {
      this.isExists=isExists;
    
      if (!this.isExists){
        if (this.name != '' && this.email != '' && this.password != ''){
          this.userService.setUser({
              name: this.name,
              email: this.email,
              password: this.password
          }).subscribe((res)=>{
            console.log(res);
            
              if(res.token){
                localStorage.setItem('token', res.token)
              }
          });

          this.alert_msg = "User with email id "+ this.email +" has been added to DataBase";
          this.alert_title = "Success!";

          this.name = ''
          this.email = ''
          this.password = ''

        }else {
          this.alert_msg = "All fields are mandatory!";
          this.alert_title = "Error!";  
        }
      }else {
        this.alert_msg = "User with email id "+ this.email +" is already Exists in DataBase";
        this.alert_title = "Error!";

      }
      setTimeout(() => {
        document.getElementById("alert_close")?.click();
      }, 5000);

    })
  }

}
