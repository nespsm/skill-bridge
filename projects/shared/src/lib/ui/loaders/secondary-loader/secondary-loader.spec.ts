import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLoader } from './secondary-loader';

describe('SecondaryLoader', () => {
  let component: SecondaryLoader;
  let fixture: ComponentFixture<SecondaryLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
