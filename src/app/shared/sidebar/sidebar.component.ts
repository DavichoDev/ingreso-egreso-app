import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  nombre: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
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

  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }

}
