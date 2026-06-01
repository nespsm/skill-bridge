import { Component, inject } from '@angular/core';
import { AppHeader } from '../app-header/app-header';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-main',
  imports: [
    RouterOutlet,
    CommonModule,
    AppHeader,
  ],
  templateUrl: './app-main.html',
  styleUrl: './app-main.scss',
})
export class AppMain {

  private router = inject(Router);

}
