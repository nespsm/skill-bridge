import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavBarItem } from '../../models/layout.interfaces';
import { NAVBAR_DATA } from '../../constants/nav-bar-data';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../../../../../shared/src/lib/auth/store/auth.actions';
import { selectSessionData } from '../../../../../../shared/src/lib/auth/store/auth.selectors';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app-nav-bar.html',
  styleUrl: './app-nav-bar.scss',
})
export class AppNavBar {

  collapsed: boolean = false;
  navBarData: NavBarItem[] = NAVBAR_DATA;

  private router: Router = inject(Router);
  private store = inject(Store);
  sessionData = this.store.selectSignal(selectSessionData);

  get filteredNavItems(): NavBarItem[] {
    // return this.navBarData.filter(item =>
    //   item.usertype.includes(this.sessionData().role)
    // );
    return this.navBarData;
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['auth/login']);
  }

  getRole() {
    return this.sessionData().role.replace(/_/g, ' ');
  }
}
