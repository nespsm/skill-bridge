import { Component, computed, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryType } from '../../../models/category.model';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';
import { FormsModule } from '@angular/forms';
import { SortOption } from '../../../models/modal-mode.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'category-table',
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss',
})
export class CategoryTable {

  readonly data = input.required<CategoryType[]>();

  @Output() edit = new EventEmitter<CategoryType>();
  @Output() view = new EventEmitter<CategoryType>();
  @Output() delete = new EventEmitter<CategoryType>();
  @Output() addCatSkill = new EventEmitter<CategoryType>();
  @Output() addCategory = new EventEmitter<void>();
  @Output() addSkill = new EventEmitter<void>();

  private readonly dialogService = inject(DialogService);

  readonly searchText = signal('');
  readonly sortOption = signal<SortOption>('');
  readonly showOnlyWithDescription = signal(false);

  readonly sortLabel = computed(() => {

    switch (this.sortOption()) {

      case 'name-asc':
        return 'A → Z';

      case 'name-desc':
        return 'Z → A';

      default:
        return 'Sort';
    }

  });

  readonly categories = computed(() => {
    let result = [...this.data()];
    const search = this.searchText()
      .trim()
      .toLowerCase();

    if (search) {
      result = result.filter(category =>
        category.categoryName?.toLowerCase().includes(search) ||
        category.description?.toLowerCase().includes(search)
      );
    }

    if (this.showOnlyWithDescription()) {
      result = result.filter(
        category => !!category.description?.trim()
      );
    }

    switch (this.sortOption()) {
      case 'name-asc':
        result.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName, undefined, { sensitivity: 'base' })
        );
        break;

      case 'name-desc':
        result.sort((a, b) =>
          b.categoryName.localeCompare(a.categoryName, undefined, { sensitivity: 'base' })
        );
        break;
    }

    return result;
  });

  readonly totalCategories = computed(() => this.data().length);
  readonly filteredCount = computed(() => this.categories().length);

  toggleDescriptionFilter(): void {
    this.showOnlyWithDescription.update(value => !value);
  }

  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  updateSort(value: SortOption): void {
    this.sortOption.set(value);
  }

  deleteCategory(row: CategoryType): void {
    this.dialogService
      .confirm(
        `You want to delete ${row.categoryName} Category?`,
        'Are you sure?'
      ).afterClosed().subscribe(result => {
        if (result) {
          this.delete.emit(row);
        }
      });
  }



  toggleSort(): void {

    const current = this.sortOption();

    switch (current) {

      case '':
        this.sortOption.set('name-asc');
        break;

      case 'name-asc':
        this.sortOption.set('name-desc');
        break;

      default:
        this.sortOption.set('');
        break;
    }
  }
}
