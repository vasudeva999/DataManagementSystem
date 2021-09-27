import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: SocialAuthService
    ) { }

  email = '';
  password = '';

  password_type = 'password';
  btn_status = "Show Password";
  class_status = "btn btn-primary btn-lg";

  alert_msg = "Please wait! We are validating your data";
  alert_title = "Loading!";

  user: SocialUser | undefined;

  ngOnInit(): void {
      this.authService.authState.subscribe((user)=>{
        this.user = user;
        this.userService.setIsLogin(user != null);
        
        if (user && this.userService.getIsLogin()){
          this.userService.isExists(user.email).subscribe((isExists)=>{
            if (!isExists){
              this.userService.setUser({'name': user.name, 'email': user.email, 'password': user.id})
                          .subscribe()
            }
          })
          
          this.userService.setIsLogin(true);
          this.router.navigate(["/"]);
        }
        
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


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


  submit(){
    console.log("srtd"+this.email);
    
    this.userService.authenticate({
      name: '',
      email: this.email,
      password: this.password
    }).subscribe((res)=>{
        if (!res.success){
          this.alert_title = "Error!";
          if (res.status == "Incorrect Password"){
            this.alert_msg = res.message;
          }else if (res.status == "Invalid USer"){
            this.alert_msg = res.message;
          }else{
            this.alert_msg = res.message;
          }
          

        }else {
          this.alert_msg = "Logged-in, Please wait! ";
          this.alert_title = "Success!";

          setTimeout(()=>{
            document.getElementById("alert_close")?.click();
            this.userService.setIsLogin(true);
            this.router.navigate(['/']);
          }, 2000);
          
        }
    })

    setTimeout(() => {
      document.getElementById("alert_close")?.click();
    }, 5000);
    
  }

  

}
