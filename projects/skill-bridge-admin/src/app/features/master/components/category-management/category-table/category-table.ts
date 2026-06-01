import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { CategoryType } from '../../../models/category.model';
import { SortOption } from '../../../models/modal-mode.type';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';

@Component({
  selector: 'category-table',
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
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

  readonly page = signal(0);
  readonly size = signal(10);

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

    // Search
    if (search) {
      result = result.filter(category =>
        category.categoryName?.toLowerCase().includes(search) ||
        category.description?.toLowerCase().includes(search)
      );
    }

    // Sort
    switch (this.sortOption()) {
      case 'name-asc':
        result.sort((a, b) =>
          a.categoryName.localeCompare(
            b.categoryName,
            undefined,
            { sensitivity: 'base' }
          )
        );
        break;

      case 'name-desc':
        result.sort((a, b) =>
          b.categoryName.localeCompare(
            a.categoryName,
            undefined,
            { sensitivity: 'base' }
          )
        );
        break;
    }

    return result;
  });

  readonly totalCategories = computed(
    () => this.data().length
  );

  readonly filteredCount = computed(
    () => this.categories().length
  );

  readonly paginatedCategories = computed(() => {
    const start = this.page() * this.size();

    return this.categories().slice(
      start,
      start + this.size()
    );
  });

  updateSearch(value: string): void {
    this.searchText.set(value);
    this.page.set(0);
  }

  toggleSort(): void {
    switch (this.sortOption()) {
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

    this.page.set(0);
  }

  onPaginationChange(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.size.set(event.pageSize);
  }

  deleteCategory(row: CategoryType): void {
    this.dialogService
      .confirm(
        `You want to delete ${row.categoryName} Category?`,
        'Are you sure?'
      )
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.delete.emit(row);
        }
      });
  }
}