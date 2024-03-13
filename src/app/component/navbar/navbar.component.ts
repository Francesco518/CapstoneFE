import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AuthData } from 'src/app/auth/interfaces/auth-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData |  null;
  

  constructor(private authSrv: AuthService) { }

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
