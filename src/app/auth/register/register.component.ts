import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario(){
    if ( this.registroForm.invalid ) { return; }
    Swal.fire({
      title: 'Espere un momento.',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, password } = this.registroForm.value;
    this.authServices.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
        console.error( error );
      } );
  }
}
