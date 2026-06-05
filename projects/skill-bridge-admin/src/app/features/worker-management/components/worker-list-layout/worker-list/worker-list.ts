import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { WorkerCategoryTile } from '../worker-category-title/worker-category-tile';
import { WorkerListTable } from '../worker-list-table/worker-list-table';
import {
  WorkerCatSkillType,
  WorkerCatType,
  WorkerListData
} from '../../../models/worker.interfaces';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { MasterCategoryService } from '../../../../master/services/master-category-service';
import { WorkerCategorySkillTile } from '../worker-category-skill-tile/worker-category-skill-tile';
import { MasterSkillService } from '../../../../master/services/master-skill-service';
import { resolveIcon } from '../../../utilities/worker-management.utilities';
import {
  CATEGORY_CARD_CLASS,
  SKILL_CARD_CLASS
} from '../../../constants/worker-management.constants';
import { CallDialog } from '../../../../../../../../shared/src/lib/ui/call-dialog/call-dialog';

@Component({
  selector: 'worker-list',
  imports: [
    CommonModule,
    WorkerListTable,
    WorkerCategoryTile,
    WorkerCategorySkillTile
  ],
  templateUrl: './worker-list.html',
  styleUrl: './worker-list.scss'
})
export class WorkerList {

  workers = signal<WorkerListData[]>([]);
  workersCount = signal(0);
  page = signal(0);
  size = signal(10);
  totalPages = signal(0);
  loading = signal(false);

  selectedStatus = signal('all');

  workersCategories = signal<WorkerCatType[]>([]);
  workerCategorySkills = signal<WorkerCatSkillType[]>([]);

  selectedCategoryId = signal<number | null>(null);
  selectedCategoryName = signal('');
  selectedSkillId = signal<number | null>(null);

  searchKey = signal('');
  sortBy = signal('');

  filteredWorkers = computed(() => {
    const status = this.selectedStatus();
    const workers = this.workers();

    if (status === 'all') {
      return workers;
    }

    return workers.filter(
      worker =>
        worker.status.toLowerCase() === status.toLowerCase()
    );
  });

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private workerService = inject(WorkerManagementService);
  private categoryService = inject(MasterCategoryService);
  private skillService = inject(MasterSkillService);

  ngOnInit(): void {
    this.listenQueryParams();
  }

  private listenQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const status = params['status'];

      if (!status) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { status: 'all' },
          queryParamsHandling: 'merge'
        });
        return;
      }

      this.selectedStatus.set(status);


      this.loadCategoryStats();
      this.loadWorkers(this.buildPayload());
    });
  }

  private buildPayload() {

    const payload: any = {
      page: this.page(),
      size: this.size()
    };

    const categoryId = this.selectedCategoryId();
    const skillId = this.selectedSkillId();
    const searchKey = this.searchKey().trim();
    const sortBy = this.sortBy().trim();

    if (categoryId !== null) {
      payload.categoryId = categoryId;
    }

    if (skillId !== null) {
      payload.skillId = skillId;
    }

    if (searchKey) {
      payload.searchKey = searchKey;
    }

    if (sortBy) {
      payload.sortBy = sortBy;
    }

    return payload;
  }

  loadWorkers(payload: any): void {
    this.loading.set(true);

    this.workerService
      .seacrhWorker(payload)
      .subscribe({
        next: (response) => {
          const result = response.result;

          this.workersCount.set(result.totalRecords);
          this.totalPages.set(result.totalPages);

          this.workers.set(
            result.data.map((w: any) => ({
              id: w.id,
              workerId: w.workerCode,
              name: `${w.firstName} ${w.lastName}`,
              role: '-',
              profileCompletion: 0,
              status: w.isAvailable ? 'Active' : 'Inactive',
              interest: 'No',
              hiredAbroad: 'No',
              createdDate: '',
              passport: 'No',
              mobileNumber: '-'
            }))
          );

          this.loading.set(false);
        },
        error: (error: Error) => {
          console.error(error);
          this.loading.set(false);
        }
      });


  }

  private loadCategoryStats(): void {
    this.categoryService
      .getCategoryStats()
      .subscribe({
        next: (response) => {
          this.workersCategories.set(
            response.map((item: any) => ({
              ...item,
              iconClass: resolveIcon(item.categoryName),
              cardClass: CATEGORY_CARD_CLASS
            }))
          );
        },
        error: (error: Error) => {
          console.error(error);
        }
      });
  }

  onCategorySelect(category: WorkerCatType): void {

    this.page.set(0);

    this.selectedCategoryId.set(category.categoryId);
    this.selectedCategoryName.set(category.categoryName);

    this.selectedSkillId.set(null);

    this.loadCategorySkills(category.categoryId);

    this.loadWorkers(this.buildPayload());
  }

  onSkillSelect(skill: WorkerCatSkillType): void {

    this.page.set(0);

    this.selectedSkillId.set(skill.skillId);

    this.loadWorkers(this.buildPayload());
  }

  private loadCategorySkills(categoryId: number): void {

    this.skillService
      .getSkillStats(categoryId)
      .subscribe({
        next: (response) => {
          this.workerCategorySkills.set(
            response.map((skill: any) => ({
              ...skill,
              iconClass: resolveIcon(skill.skillName),
              cardClass: SKILL_CARD_CLASS
            }))
          );
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSearchChanged(value: string): void {

    this.page.set(0);

    this.searchKey.set(value);

    this.loadWorkers(this.buildPayload());
  }

  onSortChanged(sortBy: string): void {

    this.page.set(0);

    this.sortBy.set(sortBy);

    this.loadWorkers(this.buildPayload());
  }

  onPageChange(event: PageEvent): void {

    this.page.set(event.pageIndex);
    this.size.set(event.pageSize);

    this.loadWorkers(this.buildPayload());
  }

  onViewWorker(id: number): void {
    this.router.navigate(
      ['/workers/details'],
      {
        queryParams: {
          workerId: id
        }
      }
    );
  }

  onCallWorker(worker: WorkerListData): void {
    this.dialog.open(CallDialog, {
      data: {
        name: worker.name,
        phone: worker.mobileNumber
      }
    });
  }
}