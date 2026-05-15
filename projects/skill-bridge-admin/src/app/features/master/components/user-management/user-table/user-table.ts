import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserData } from '../../../models/user.model';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';

@Component({
  selector: 'user-table',
  imports: [
    CommonModule,

  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {


  @Input() data: UserData[] = [];
  @Output() edit = new EventEmitter<UserData>();
  @Output() view = new EventEmitter<UserData>();
  @Output() delete = new EventEmitter<UserData>();
  @Output() add = new EventEmitter<UserData>();


  private dialogService = inject(DialogService);

  deleteCategory(row: UserData) {
    this.dialogService.confirm(`You want to delete ${row.name} Category?`, 'Are you sure!')
      .afterClosed()
      .subscribe(result => {
        if (result) { this.delete.emit(row); }
      });
  }
}
