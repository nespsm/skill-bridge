import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompanyListTable } from '../company-list-table/company-list-table';
import { CompanyData } from '../../../models/company.interfaces';
import { CompanyManagementService } from '../../../services/company-management-service';
import { generate } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'company-list',
  imports: [
    CommonModule,
    RouterModule,
    CompanyListTable,

  ],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
})
export class CompanyList {


  status: any;
  companies: CompanyData[] = [
    {
      id: 1,
      name: 'TCS',
      status: 'Active',
      orderNumber: 'CKB-550000',
      workerNumber: '1000',
      dateOfOrder: '12-12-2025'
    },
    {
      id: 2,
      name: 'MIT',
      status: 'Inactive',
      orderNumber: 'CKB-550001',
      workerNumber: '2000',
      dateOfOrder: '02-08-2025'
    },
    {
      id: 3,
      name: 'Health Kart',
      status: 'Active',
      orderNumber: 'CKB-550009',
      workerNumber: '3000',
      dateOfOrder: '24-10-2025'
    },
    {
      id: 4,
      name: 'Motherson',
      status: 'Inactive',
      orderNumber: 'CKB-551089',
      workerNumber: '500',
      dateOfOrder: '12-10-2025'
    },
    {
      id: 5,
      name: 'Puma',
      status: 'Done',
      orderNumber: 'CKB-550290',
      workerNumber: '1500',
      dateOfOrder: '31-01-2026'
    },
    {
      id: 6,
      name: 'Stellar',
      status: 'Active',
      orderNumber: 'CKB-556060',
      workerNumber: '5500',
      dateOfOrder: '01-01-2026'
    },
    {
      id: 7,
      name: 'New India',
      status: 'Active',
      orderNumber: 'CKB-550071',
      workerNumber: '900',
      dateOfOrder: '15-02-2026'
    },
    {
      id: 8,
      name: 'Roto Pumps',
      status: 'Inactive',
      orderNumber: 'CKB-550088',
      workerNumber: '9999',
      dateOfOrder: '14-12-2025'
    },
    {
      id: 9,
      name: 'Godrej',
      status: 'Pending',
      orderNumber: 'CKB-558888',
      workerNumber: '1155',
      dateOfOrder: '13-12-2025'
    },
    {
      id: 10,
      name: 'Genpect',
      status: 'Active',
      orderNumber: 'CKB-559999',
      workerNumber: '1000',
      dateOfOrder: '12-12-2025'
    },
    {
      id: 11,
      name: 'Nagarro',
      status: 'In-progress',
      orderNumber: 'CKB-551177',
      workerNumber: '6000',
      dateOfOrder: '22-01-2026'
    }
  ];
  filteredCompanies: CompanyData[] = [];
  companyCount: number = 900;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private companyService = inject(CompanyManagementService);


  ngOnInit() {
    this.listenQueryParams();
  }

  listenQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (!params['status']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { status: 'all' },
          queryParamsHandling: 'merge'
        });
        return;
      }

      this.loadClients(params['status']);
    });
  }

  loadClients(status: string) {

    this.companyService.getClients({ active: status }).subscribe({
      next: (response) => {

      },
      error: (error: Error) => {


      }
    });


    if (status === 'all') {
      this.filteredCompanies = this.companies;
      return;
    }

    this.filteredCompanies = this.companies.filter(company =>
      company.status.toLowerCase() === status.toLowerCase()
    );
  }



  onViewCompany(id: number) {
    this.router.navigate(['/clients/details'], {
      queryParams: { clientId: id }
    });
  }
}
