import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTabs } from './details-tabs';

describe('DetailsTabs', () => {
  let component: DetailsTabs;
  let fixture: ComponentFixture<DetailsTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
