import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavBar } from './app-nav-bar';

describe('AppNavBar', () => {
  let component: AppNavBar;
  let fixture: ComponentFixture<AppNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
