import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if ( this.loginForm.invalid ) { return; }

    Swal.fire({
      title: 'Espere un momento.',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario( correo, password )
      .then(
        ( credenciales ) => {
          // console.log( credenciales );
          Swal.close();
          this.router.navigate(['/']);
        }
        ).catch(
        ( error ) => {
          console.log( error );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contrasena no valido'
          });
        }

      );
  }

}
