import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener() {
    this.auth.authState.subscribe( (fireUser) => {
      if ( fireUser ) {
        this.userSubscription = this.userSubscription =   this.firestore.doc(`${ fireUser.uid }/usuario`).valueChanges()
          .subscribe( ( firestoreUser: any ) => {

            const user = Usuario.fromFirebase( firestoreUser );
            this.store.dispatch( authActions.setUser( { user } ) );

          });
      } else {

        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unsetUser() );

      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword( email, password )
      .then( ({user}) => {
        const newUser = new Usuario( user.uid, nombre, user.email );
        this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
      });
  }

  loginUsuario( email: string, password: string ){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fireUser => fireUser !== null )
    );
  }

}
