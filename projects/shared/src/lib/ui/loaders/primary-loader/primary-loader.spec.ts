import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryLoader } from './primary-loader';

describe('PrimaryLoader', () => {
  let component: PrimaryLoader;
  let fixture: ComponentFixture<PrimaryLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
