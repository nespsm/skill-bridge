import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyData } from '../../../models/company.interfaces';
import { CommonModule } from '@angular/common';
import { DynamicClassService } from '../../../../../../../../shared/src/lib/services/dynamic-class-service';

@Component({
    selector: 'company-list-table',
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './company-list-table.html',
    styleUrl: './company-list-table.scss',
})
export class CompanyListTable {

    @Input() status: any;
    @Input() companies: CompanyData[] = [];
    @Input() companyCount: number = 0;

    @Output() view = new EventEmitter<number>();

    private dynamicClass = inject(DynamicClassService);



    getBadgeClass(value: string): string {
        return this.dynamicClass.getBadgeClass(value);
    }



    viewCompanyDetails(id: number) {
        this.view.emit(id);
    }

}
