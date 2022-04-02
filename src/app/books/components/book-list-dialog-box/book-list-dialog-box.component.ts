import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppErrorStateMatcher } from 'src/app/shared/helpers/app-error-state-matcher';
import { BookList } from '../../core/classes/book-list.class';

@Component({
  selector: 'app-book-list-dialog-box',
  templateUrl: './book-list-dialog-box.component.html',
  styleUrls: ['./book-list-dialog-box.component.scss']
})
export class BookListDialogBoxComponent implements OnInit {
  bookList!: BookList;
  action!: string;
  listForm!: FormGroup;
  matcher: AppErrorStateMatcher = new AppErrorStateMatcher();

  constructor(private _dialog: MatDialogRef<BookListDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: BookList) {
    this.bookList = data;
  }

  ngOnInit(): void {
    this.action = this.bookList.id != null ? 'Update' : 'Add';
    this._buildForm();
  }

  private _buildForm(): void {
    this.listForm = new FormGroup({
      name: new FormControl(this.bookList.name, [Validators.required, Validators.maxLength(200)]),
    });
  }

  saveList(): void {
    if (!this.listForm.valid)
      return;

    this.bookList.name = this.listForm.controls['name'].value;

    this._saveAction();
  }

  _saveAction(): void {
    this._dialog.close({ data: this.bookList, event: this.bookList.id != null ? 'updated' : 'added' });
  }

  closeDialog(): void {
    this._dialog.close({ event: 'canceled' });
  }
}
