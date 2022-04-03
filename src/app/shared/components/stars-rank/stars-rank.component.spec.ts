import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRankComponent } from './stars-rank.component';

describe('StarsRankComponent', () => {
  let component: StarsRankComponent;
  let fixture: ComponentFixture<StarsRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
