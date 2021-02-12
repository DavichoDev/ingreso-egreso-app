import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

// NgRx
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  loading: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {

    this.construirForm();

    this.uiSubscription = this.store.select('ui')
      .subscribe( (ui) => {
        this.loading = ui.loading;
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  construirForm(){
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(6)] ],
    });
  }

  crearUsuario(){
    if ( this.registroForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Espere un momento.',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { nombre, correo, password } = this.registroForm.value;
    this.authServices.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch( ui.stopLoading() );

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });

        console.error( error );
      } );
  }
}
