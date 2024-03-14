import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AuthData } from 'src/app/auth/interfaces/auth-data';
import { ProfileService } from 'src/app/auth/service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData |  null;


  

  constructor(private authSrv: AuthService, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.restore()
    this.authSrv.user$.subscribe((user) => {
      this.userLoggedIn = user
    })
  }
  logout() {
    this.authSrv.logout()
  }
 
}
