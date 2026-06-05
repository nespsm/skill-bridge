import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBankInfo } from './details-bank-info';

describe('DetailsBankInfo', () => {
  let component: DetailsBankInfo;
  let fixture: ComponentFixture<DetailsBankInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBankInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBankInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
