import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { WorkerCategoryTile } from '../worker-category-title/worker-category-tile';
import { WorkerListTable } from '../worker-list-table/worker-list-table';
import { WorkerCatType, WorkerListData } from '../../../models/worker.interfaces';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { CallDialog } from '../../../../../../../../shared/src/lib/ui/call-dialog/call-dialog';

@Component({
  selector: 'worker-list',
  imports: [
    CommonModule,
    WorkerListTable,
    WorkerCategoryTile,
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

  // workers: WorkerListData[] = [
  //   {
  //     id: 1,
  //     workerId: "SKB-005876",
  //     name: "Rajesh Kumar",
  //     profileCompletion: 90,
  //     role: "Mehcanic",
  //     status: "Active",
  //     interest: "Yes",
  //     hiredAbroad: "Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'Yes',
  //     mobileNumber: "9876543211",
  //   },
  //   {
  //     id: 2,
  //     workerId: "SKB-105876",
  //     name: "Raj Kumar",
  //     profileCompletion: 9,
  //     role: "Carpenter",
  //     status: "Inactive",
  //     interest: "No",
  //     hiredAbroad: "Not Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'No',
  //     mobileNumber: "9876553211",
  //   },
  //   {
  //     id: 3,
  //     workerId: "SKB-115876",
  //     name: "Rajnish Tiwari",
  //     profileCompletion: 70,
  //     role: "Guard",
  //     status: "Active",
  //     interest: "Yes",
  //     hiredAbroad: "Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'Yes',
  //     mobileNumber: "8876543211",
  //   },
  //   {
  //     id: 4,
  //     workerId: "SKB-109876",
  //     name: "Rahul",
  //     profileCompletion: 90,
  //     role: "Painter",
  //     status: "Pending",
  //     interest: "Yes",
  //     hiredAbroad: "Not Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'Yes',
  //     mobileNumber: "7776543211",
  //   },
  //   {
  //     id: 5,
  //     workerId: "SKB-000222",
  //     name: "Vikas Singh",
  //     profileCompletion: 60,
  //     role: "Electrician",
  //     status: "Inactive",
  //     interest: "Yes",
  //     hiredAbroad: "Not Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'No',
  //     mobileNumber: "8886543211",
  //   },
  //   {
  //     id: 6,
  //     workerId: "SKB-555876",
  //     name: "Teg Bahadur",
  //     profileCompletion: 25,
  //     role: "Plumber",
  //     status: "Active",
  //     interest: "Yes",
  //     hiredAbroad: "Not Hired for Abroad",
  //     createdDate: "12-12-2025",
  //     passport: 'No',
  //     mobileNumber: "9986543211",
  //   },
  // ];

  workerTypes: WorkerCatType[] = [
    {

      title: 'Mechanic',
      count: 200,
      iconClass: 'icon-mask icon-xl icon-mechanic',
      cardClass: 'card-color-red-gd'
    },
    {

      title: 'Electrician',
      count: 300,
      iconClass: 'icon-mask icon-xl icon-electrician',
      cardClass: 'card-color-blue-gd'
    },
    {

      title: 'Painter',
      count: 250,
      iconClass: 'icon-mask icon-xl icon-painter',
      cardClass: 'card-color-green-gd'
    },
    {

      title: 'Guard',
      count: 150,
      iconClass: 'icon-mask icon-xl icon-guard',
      cardClass: 'card-color-gold-gd'
    },
    {

      title: 'Driver',
      count: 400,
      iconClass: 'icon-mask icon-xl icon-driver',
      cardClass: 'card-color-voilet-gd'
    },
    {

      title: 'Carpenter',
      count: 200,
      iconClass: 'icon-mask icon-xl icon-mechanic',
      cardClass: 'card-color-orange-gd'
    },
  ]





  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private workerService = inject(WorkerManagementService);


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
      this.loadWorkers();
    });
  }

  loadWorkers() {

    this.loading.set(true);
    const payload = {
      page: this.page(),
      size: this.size(),
    };

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
  }


  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
    this.size.set(event.pageSize);
    this.loadWorkers();
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
