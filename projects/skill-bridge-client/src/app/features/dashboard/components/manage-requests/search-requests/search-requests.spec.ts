import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequests } from './search-requests';

describe('SearchRequests', () => {
  let component: SearchRequests;
  let fixture: ComponentFixture<SearchRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
