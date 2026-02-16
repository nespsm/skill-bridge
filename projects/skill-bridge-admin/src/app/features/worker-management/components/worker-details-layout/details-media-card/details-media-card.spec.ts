import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMediaCard } from './details-media-card';

describe('DetailsMediaCard', () => {
  let component: DetailsMediaCard;
  let fixture: ComponentFixture<DetailsMediaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMediaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMediaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
