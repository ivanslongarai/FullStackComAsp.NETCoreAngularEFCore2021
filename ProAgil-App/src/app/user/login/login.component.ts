import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  model : any = {};

  constructor(private authService : AuthService,
    public router : Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.authService.login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        }, err => {
          this.toastr.error(`Falha ao tentar logar`);
        }
      )
  }

}
