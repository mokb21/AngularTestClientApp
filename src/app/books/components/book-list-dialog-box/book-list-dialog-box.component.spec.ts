import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListDialogBoxComponent } from './book-list-dialog-box.component';

describe('BookListDialogBoxComponent', () => {
  let component: BookListDialogBoxComponent;
  let fixture: ComponentFixture<BookListDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
