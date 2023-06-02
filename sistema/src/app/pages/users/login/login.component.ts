import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users';
import { DataLoginService } from 'src/app/services/data-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataLogin: DataLoginService){
      this.loginForm = this.fb.group(
        {
            username: ['', Validators.required],
            password: ['', Validators.required]
        }
      )
  }

  loginUser(){

   const USER: Usuario = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.dataLogin.nombreUsuario = this.loginForm.get('username')?.value;

    console.log(this.dataLogin.nombreUsuario);

    this.router.navigate(['/listar-productos'])

  }

}


