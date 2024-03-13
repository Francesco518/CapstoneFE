import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showPassword!: boolean

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    // console.log(loginForm);
    try {
      this.authSrv.login(loginForm.value).subscribe();
    } catch (error) {
      alert('Login errato!');
      console.log(error);
      this.router.navigate(['/login']);
    }
  }


  goRegister() {
    this.router.navigate(['/register']);
  }
}
