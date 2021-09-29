import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  errorMsg = '';

  constructor(
    public userService: UserService,
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

  email = ''
  password = ''

  

  isExists = false;

  deleteUser(email: string){
    this.userService.isExists(email).subscribe(isExists=>{
      this.isExists=isExists;})

      console.log(email);
      
      console.log(this.isExists);
      

      if (this.isExists){
        if (email != ''){
          this.userService.deleteUser(email).subscribe(
            error => this.errorMsg = error.message
          );
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
