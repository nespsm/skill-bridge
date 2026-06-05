import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';


import * as AuthActions from '../../../shared/src/lib/auth/store/auth.actions';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('skill-bridge-admin');


  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(AuthActions.rehydrateAuth());
  }
}
