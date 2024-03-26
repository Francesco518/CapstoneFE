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
  public loginError: boolean = false
  public errorMessage: string = ''

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    this.authSrv.login(loginForm.value).subscribe({
      next: () => {
        this.loginError = false
      },
      error: (err) => {
        this.loginError = true
        this.errorMessage = err.message
        console.log(err)
        this.router.navigate(['/login']);
      }
    })
  }


  goRegister() {
    this.router.navigate(['/register']);
  }
}
