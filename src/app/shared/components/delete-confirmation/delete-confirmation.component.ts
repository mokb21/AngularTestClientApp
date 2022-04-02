import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  _obj: any;

  constructor(private _dialog: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this._obj = data;
  }

  ngOnInit(): void {
  }

  deleteConfirm(): void {
    this._dialog.close({ data: this._obj, event: 'deleted' });
  }

  closeDialog(): void {
    this._dialog.close({ event: 'cancel' });
  }
}
