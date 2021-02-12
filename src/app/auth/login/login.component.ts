import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) {}

  ngOnInit(): void {
    this.constuirForm();

    this.uiSubscription = this.store.select('ui')
      .subscribe( (ui) => {
        this.loading = ui.loading;
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  constuirForm(){
    this.loginForm = this.formBuilder.group({
      correo: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }

  login() {
    if ( this.loginForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario( correo, password )
      .then(
        ( credenciales ) => {
          this.store.dispatch( ui.stopLoading() );
          this.router.navigate(['/']);
        }
        ).catch(
        ( error ) => {
          this.router.navigate(['/']);
          this.store.dispatch( ui.stopLoading() );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contrasena no valido'
          });
        }

      );
  }

}
