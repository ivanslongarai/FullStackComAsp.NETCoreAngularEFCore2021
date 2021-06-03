import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/Auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  title = 'Registro';
  user! : User;

  constructor(private authService : AuthService,
      public router : Router, public fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  insertUser() {
    if(this.registerForm.valid
      &&
      (this.registerForm.controls.password.value ===
          this.registerForm.controls.confirmPassword.value)){
            this.user = Object.assign(this.registerForm.value);
          console.log(this.user);
          this.authService.register(this.user).subscribe(
            () => {
              this.router.navigate(['/user/login']);
              this.toastr.success('Cadastrado com sucesso;');
            },
            error => {
              const err = error;
              console.log(error);
              err.array.forEach(element => {
                switch (element.code) {
                  case 'DuplicateUserName': this.toastr.error('Cadastro duplicado'); break;
                  default: this.toastr.error(`Erro no Cadastro CODE: ${error.code}`); break;
                }
              });
            }
          )
    } else {
      this.toastr.error('Senha e Confirmar senha não conferem');
    }
  }
}
