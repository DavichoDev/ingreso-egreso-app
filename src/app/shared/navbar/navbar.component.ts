import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  nombre: string = '';

  constructor(
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('user')
      .pipe( filter( ( auth ) => auth.user != null ) )
      .subscribe( ({ user }) => this.nombre = user?.nombre );
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
