import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesList } from './enquiries-list';

describe('EnquiriesList', () => {
  let component: EnquiriesList;
  let fixture: ComponentFixture<EnquiriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiriesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiriesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
