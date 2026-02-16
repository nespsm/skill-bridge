import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListTable } from './company-list-table';

describe('CompanyListTable', () => {
  let component: CompanyListTable;
  let fixture: ComponentFixture<CompanyListTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyListTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyListTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
