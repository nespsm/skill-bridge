import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { WorkerCategoryTile } from '../worker-category-title/worker-category-tile';
import { WorkerListTable } from '../worker-list-table/worker-list-table';
import { WorkerCatSkillType, WorkerCatType, WorkerListData } from '../../../models/worker.interfaces';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { CallDialog } from '../../../../../../../../shared/src/lib/ui/call-dialog/call-dialog';
import { MasterCategoryService } from '../../../../master/services/master-category-service';
import { CATEGORY_STYLE_MAP, FALLBACK_CARDS, FALLBACK_ICONS } from '../../../constants/worker-category-style.constants';
import { WorkerCategorySkillTile } from '../worker-category-skill-tile/worker-category-skill-tile';
import { MasterSkillService } from '../../../../master/services/master-skill-service';

@Component({
  selector: 'worker-list',
  imports: [
    CommonModule,
    WorkerListTable,
    WorkerCategoryTile,
    WorkerCategorySkillTile
  ],
  templateUrl: './worker-list.html',
  styleUrl: './worker-list.scss',
})
export class WorkerList {

  workers = signal<WorkerListData[]>([]);
  workersCount = signal(0);
  page = signal(0);
  size = signal(10);
  totalPages = signal(0);
  loading = signal(false);
  selectedStatus = signal('all');

  filteredWorkers = computed(() => {
    const status = this.selectedStatus();
    const workers = this.workers();
    if (status === 'all') return workers;

    return workers.filter(worker =>
      worker.status.toLowerCase() === status.toLowerCase()
    );
  });

  workersCategories = signal<WorkerCatType[]>([]);
  selectedCategoryId = signal<number | null>(null);
  selectedCategoryName = signal<string>("");
  selectedSkillId = signal<number | null>(null);
  workerCategorySkills = signal<WorkerCatSkillType[]>([]);





  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private workerService = inject(WorkerManagementService);
  private categoryService = inject(MasterCategoryService);
  private skillService = inject(MasterSkillService);


  ngOnInit() {
    this.listenQueryParams();
  }

  listenQueryParams() {

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
      const payload = {
        page: this.page(),
        size: this.size(),
      };
      this.loadWorkers(payload);
    });
  }

  loadWorkers(payload: any) {

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
              status: w.isAvailable
                ? 'Active'
                : 'Inactive',
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

    this.categoryService
      .getCategoryStats()
      .subscribe({
        next: (response) => {
          this.workersCategories.set(response.map((item: any, index: number) => {

            const style =
              CATEGORY_STYLE_MAP[item.categoryName] || {
                iconClass: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
                cardClass: FALLBACK_CARDS[index % FALLBACK_CARDS.length]
              };

            return {
              ...item,
              iconClass: style.iconClass,
              cardClass: style.cardClass
            };
          }));

          this.loading.set(false);
        },
        error: (error: Error) => {
          console.error(error);
          this.loading.set(false);
        }
      });
  }


  onCategorySelect(category: WorkerCatType) {

    this.selectedCategoryId.set(category.categoryId);
    this.selectedCategoryName.set(category.categoryName);
    this.selectedCategoryId.set(category.categoryId);

    this.loadCategorySkills(category.categoryId);
    const payload = {
      page: this.page(),
      size: this.size(),
      categoryId: category.categoryId
    };
    this.loadWorkers(payload);
  }


  onSkillSelect(skill: WorkerCatSkillType) {
    this.selectedSkillId.set(skill.skillId);

    const payload = {
      page: this.page(),
      size: this.size(),
      categoryId: this.selectedCategoryId(),
      skillId: this.selectedSkillId()
    };
    this.loadWorkers(payload);
  }

  loadCategorySkills(categoryId: number) {

    this.skillService
      .getSkillStats(categoryId)
      .subscribe({
        next: (response) => {
          this.workerCategorySkills.set(response.map((skill: any, index: number) => ({
            ...skill,
            iconClass: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
            cardClass: FALLBACK_CARDS[index % FALLBACK_CARDS.length]
          })));

          console.log("skills----", this.workerCategorySkills());
        },

        error: (error) => {
          console.error(error);
        }

      });
  }

  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
    this.size.set(event.pageSize);
    const payload = {
      page: this.page(),
      size: this.size(),
    };
    this.loadWorkers(payload);
  }


  onViewWorker(id: number) {
    this.router.navigate(['/workers/details'], {
      queryParams: { workerId: id }
    });
  }


  onCallWorker(worker: WorkerListData) {
    this.dialog.open(CallDialog, {
      data: {
        name: worker.name,
        phone: worker.mobileNumber
      }
    });
  }
}
