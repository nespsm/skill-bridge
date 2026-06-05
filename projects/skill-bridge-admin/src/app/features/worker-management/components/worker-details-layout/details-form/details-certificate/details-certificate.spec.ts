import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCertificate } from './details-certificate';

describe('DetailsCertificate', () => {
  let component: DetailsCertificate;
  let fixture: ComponentFixture<DetailsCertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCertificate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
