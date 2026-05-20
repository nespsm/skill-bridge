import { Component, inject } from '@angular/core';
import { AppNavBar } from '../app-nav-bar/app-nav-bar';
import { AppHeader } from '../app-header/app-header';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../../../../shared/src/lib/services/loader-service';
import { SecondaryLoader } from '../../../../../../shared/src/lib/ui/loaders/secondary-loader/secondary-loader';
import { filter } from 'rxjs';

@Component({
  selector: 'app-app-main',
  imports: [
    RouterOutlet,
    CommonModule,
    AppNavBar,
    AppHeader,
    SecondaryLoader,
  ],
  templateUrl: './app-main.html',
  styleUrl: './app-main.scss',
})
export class AppMain {

  collapsed = false;
  loaderService = inject(LoaderService);
  private router = inject(Router);

  constructor() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
        this.loaderService.clear();
      });
  }

  toggleSidebar() { this.collapsed = !this.collapsed; }

  isSidebarCollapsed() {
    return this.collapsed ? 'sidebar-collapsed' : '';
  }
}
