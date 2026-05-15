import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';


import { UserTable } from '../user-table/user-table';
import { MasterUserService } from '../../../services/master-user-service';
import { UserData } from '../../../models/user.model';
import { MasterUserModalMode } from '../../../models/modal-mode.type';
import { firstValueFrom } from 'rxjs';
import { UserModal } from '../user-modal/user-modal';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,

    UserTable
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

  private dialog = inject(MatDialog);
  private userService = inject(MasterUserService);
  private overlay = inject(Overlay);

  users = signal<UserData[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getUsers().subscribe(res => {
      // this.categories = res.result || [];
      this.users.set(res.result ?? []);
    });

    this.users.set([
      { id: 1, name: "Ram", roleName: "Admin", email: "ram@gmail.com", age: 12 },
      { id: 2, name: "Shyam", roleName: "Super Admin", email: "ram@gmail.com", age: 12 },
      { id: 3, name: "Ganshyam", roleName: "Moderator", email: "ram@gmail.com", age: 12 },
      { id: 4, name: "Tekram", roleName: "Manager", email: "ram@gmail.com", age: 12 },
      { id: 5, name: "Tukaram", roleName: "HR", email: "ram@gmail.com", age: 12 },
      { id: 6, name: "Ramnam", roleName: "Admin", email: "ram@gmail.com", age: 12 },
    ]);
  }

  async openModal(mode: MasterUserModalMode, data?: UserData) {
    let userRoles = null;
    if (!(mode === "view")) {
      try {
        const userRoleResponse = await firstValueFrom(this.userService.getUserRoles());
        userRoles = userRoleResponse.result;
      }
      catch (e) {
        console.log("Error in fetching user roles:", e);
      }
    }
    const ref = this.dialog.open(UserModal,
      {
        width: '650px',
        maxHeight: '90vh',
        disableClose: true,
        autoFocus: false,
        restoreFocus: false,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        panelClass: 'app-dialog',
        data: { mode, data, userRoles }
      });
    ref.afterClosed().subscribe(ok => { if (ok) this.load(); });
  }

  delete(row: UserData) {
    this.userService.deleteUser({ id: row.id })
      .subscribe(() => this.load());
  }
}