import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavBarItem } from '../../models/layout.interfaces';
import { NAVBAR_DATA } from '../../constants/nav-bar-data';
import { Router, RouterModule } from '@angular/router';
import { UserTypes } from '../../../../../../shared/src/lib/auth/enums/user-type.enum';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-nav-bar.html',
  styleUrl: './app-nav-bar.scss',
})
export class AppNavBar {

  collapsed: boolean = false;
  navBarData: NavBarItem[] = NAVBAR_DATA;
  currentUserType: UserTypes = UserTypes.ADMIN; // later get from store/auth service
  
  private router: Router = inject(Router);


  @Output() toggleSidebar = new EventEmitter<void>();

  toggleBtnClicked() {
    this.collapsed = !this.collapsed;
    this.toggleSidebar.emit();
  }

  isSidebarCollapsed() {
    return this.collapsed ? 'collapsed' : '';
  }


  get filteredNavItems(): NavBarItem[] {
    return this.navBarData.filter(item =>
      item.usertype.includes(this.currentUserType)
    );
  }


  logout() {

    this.router.navigate(['auth/login']);  
  }
}
