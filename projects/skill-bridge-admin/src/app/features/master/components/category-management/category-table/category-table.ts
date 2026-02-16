import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryType } from '../../../models/category.model';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';

@Component({
  selector: 'category-table',
  imports: [RouterModule],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss',
})
export class CategoryTable {


  @Input() data: CategoryType[] = [];
  @Output() edit = new EventEmitter<CategoryType>();
  @Output() view = new EventEmitter<CategoryType>();
  @Output() delete = new EventEmitter<CategoryType>();
  @Output() addCatSkill = new EventEmitter<CategoryType>();
  @Output() addCategory = new EventEmitter<CategoryType>();
  @Output() addSkill = new EventEmitter<CategoryType>();


  private dialogService = inject(DialogService);

  deleteCategory(row: CategoryType) {

    this.dialogService.confirm(`You want to delete ${row.categoryName} Category?`, 'Are you sure!')
      .afterClosed()
      .subscribe(result => {
        if (result) { this.delete.emit(row); }
      });
  }
}
