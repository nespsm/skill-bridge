import { Component } from '@angular/core';
import { AppNavBar } from '../app-nav-bar/app-nav-bar';
import { AppFooter } from '../app-footer/app-footer';
import { AppHeader } from '../app-header/app-header';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-main',
  imports: [RouterOutlet, CommonModule,AppNavBar, AppFooter, AppHeader],
  templateUrl: './app-main.html',
  styleUrl: './app-main.scss',
})
export class AppMain {

}
