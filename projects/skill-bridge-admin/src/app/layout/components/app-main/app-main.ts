import { Component } from '@angular/core';
import { AppNavBar } from '../app-nav-bar/app-nav-bar';
import { AppHeader } from '../app-header/app-header';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-main',
  imports: [RouterOutlet, CommonModule,AppNavBar, AppHeader],
  templateUrl: './app-main.html',
  styleUrl: './app-main.scss',
})
export class AppMain {

  collapsed = false;

  toggleSidebar() {  this.collapsed = !this.collapsed;}

  isSidebarCollapsed() {
    return this.collapsed ? 'sidebar-collapsed' : '';
  }
}
