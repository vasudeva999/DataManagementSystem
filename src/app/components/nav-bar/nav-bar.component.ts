import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

declare var FB: any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(
    public userService: UserService,
    private router: Router,
    private authService: SocialAuthService
    ) {}

  ngOnInit(): void {
  }

  App_Name = "Data Management System";

  signOut(): void {
    this.userService.setIsLogin(false);
    this.authService.signOut();
    this.router.navigate(["/"]);
  }
  

}
