import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppErrorStateMatcher } from 'src/app/shared/helpers/app-error-state-matcher';
import { Book } from '../../core/classes/book.class';

@Component({
  selector: 'app-book-dialog-box',
  templateUrl: './book-dialog-box.component.html',
  styleUrls: ['./book-dialog-box.component.scss']
})
export class BookDialogBoxComponent implements OnInit {
  book!: Book;
  action!: string;
  bookForm!: FormGroup;
  matcher: AppErrorStateMatcher = new AppErrorStateMatcher();

  constructor(private _dialog: MatDialogRef<BookDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Book) {
    this.book = data;
  }

  ngOnInit(): void {
    this.action = this.book.id != null ? 'Update' : 'Add';
    this._buildForm();
  }

  private _buildForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required, Validators.maxLength(200)]),
      author: new FormControl(this.book.author, [Validators.required, Validators.maxLength(200)]),
      date: new FormControl(this.book.date, [Validators.required]),
      rank: new FormControl(this.book.rank, [Validators.required, Validators.min(0), Validators.max(5)]),
    });
  }

  saveBook(): void {
    if (!this.bookForm.valid)
      return;

    this.book.title = this.bookForm.controls['title'].value;
    this.book.author = this.bookForm.controls['author'].value;
    this.book.date = this.bookForm.controls['date'].value;
    this.book.rank = this.bookForm.controls['rank'].value;

    this._saveAction();
  }

  _saveAction(): void {
    this._dialog.close({ data: this.book, event: this.book.id != null ? 'updated' : 'added' });
  }

  closeDialog(): void {
    this._dialog.close({ event: 'canceled' });
  }
}
