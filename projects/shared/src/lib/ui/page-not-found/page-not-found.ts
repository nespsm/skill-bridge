import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectSessionData } from '../../auth/store/auth.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss'
})
export class PageNotFound {

  private store = inject(Store);
  sessionData$ = this.store.select(selectSessionData);


  goToDashboard() {
    return this.sessionData$.pipe(
      map(userData => {
        if (userData && userData.userType)  return '/dashboard';
        
        return '/auth/login';
      })
    );
  }


}
