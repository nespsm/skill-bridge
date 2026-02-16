import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHiringHistory } from './details-hiring-history';

describe('DetailsHiringHistory', () => {
  let component: DetailsHiringHistory;
  let fixture: ComponentFixture<DetailsHiringHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHiringHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsHiringHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
