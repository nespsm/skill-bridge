import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppNavBar } from '../app-nav-bar/app-nav-bar';


import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavBarItem } from '../../models/layout.interfaces';
import { NAVBAR_DATA } from '../../constants/nav-bar-data';
import { Store } from '@ngrx/store';
import { selectSessionData } from '../../../../../../shared/src/lib/auth/store/auth.selectors';

import * as AuthActions from '../../../../../../shared/src/lib/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    // TitleCasePipe,
    AppNavBar,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader implements OnInit {

  navBarData: NavBarItem[] = NAVBAR_DATA;

  private router: Router = inject(Router);
  private store = inject(Store);
  sessionData = this.store.selectSignal(selectSessionData);


  ngOnInit(): void {
  }

  showNotification() {

  }

  goToProfile(event: MouseEvent) {
    // event.stopPropagation();
    this.router.navigate(['user/details']);
    // Navigate to profile page
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['auth/login']);
  }


  createEnquiry(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/enquiry/create']);
  }
}
