import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

import { MatDialog } from '@angular/material/dialog';

import { MasterCategoryService } from '../../../services/master-category-service';
import { MasterSkillService } from '../../../services/master-skill-service';

import { CategoryModal } from '../category-modal/category-modal';
import { CategoryTable } from '../category-table/category-table';
import { CategoryType } from '../../../models/category.model';
import { MasterModalMode } from '../../../models/modal-mode.type';

@Component({
  selector: 'category',
  imports: [
    CommonModule,
    RouterModule,

    CategoryTable
  ],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {

  private dialog = inject(MatDialog);
  private categoryService = inject(MasterCategoryService);
  private skillService = inject(MasterSkillService);
  private overlay = inject(Overlay);

  categories: CategoryType[] = [];

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.result || [];
    });

    this.categories = [
      { id: 1, categoryName: "Mechanic", description: "Mechanic Despciption" },
      { id: 2, categoryName: "Carpenter", description: "Carpenter Despciption" },
      { id: 3, categoryName: "Painter", description: "Painter Despciption" },
      { id: 4, categoryName: "Guard", description: "Gaurd Despciption" },
      { id: 5, categoryName: "Driver", description: "Driver Despciption" },
      { id: 6, categoryName: "Electrician", description: "Electrician Despciption" },
    ]
  }

  async openModal(mode: MasterModalMode, data?: CategoryType) {
    const categories = mode === "add-skills" ? this.categories : null;
    let skills = null;
    if (!(mode === "add-category")) {
      try {
        skills = data?.id
          ? await firstValueFrom(this.skillService.getSkills({ categoryId: data.id }))
          : null;
        skills = [
          { id: 1, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 2, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 3, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 4, skillName: 'Primary Wiring', description: "Adding wirees" }
        ];
      }
      catch (e) {
        skills = [
          { id: 1, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 2, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 3, skillName: 'Primary Wiring', description: "Adding wirees" },
          { id: 4, skillName: 'Primary Wiring', description: "Adding wirees" }
        ]
      }
    }
    const ref = this.dialog.open(CategoryModal,
      {
        width: '650px',
        maxHeight: '90vh',
        disableClose: true,
        autoFocus: false,
        restoreFocus: false,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        panelClass: 'app-dialog',
        data: { mode, data, categories, skills }
      });
    ref.afterClosed().subscribe(ok => { if (ok) this.load(); });
  }

  delete(row: CategoryType) {
    this.categoryService.deleteCategory({ id: row.id })
      .subscribe(() => this.load());
  }
}
