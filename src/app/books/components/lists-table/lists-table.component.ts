import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BookList } from '../../core/classes/book-list.class';
import { BooksListService } from '../../services/book-lists.service';
import { BookListDialogBoxComponent } from '../book-list-dialog-box/book-list-dialog-box.component';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})
export class ListsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<BookList>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _bookListService: BooksListService,
    private _sharedService: SharedService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this._bookListService.getLists().subscribe({
      next: (bookList: BookList[]) => this._refreshTable(bookList),
      error: (err: any) => this._showMessage('Oops! Somthing went wrong'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _refreshTable(bookLists: BookList[]): void {
    this.dataSource = new MatTableDataSource<BookList>(bookLists);
    this.dataSource.sort = this.sort;
  }

  private _removeTableRow(bookList: BookList): void {
    this.dataSource.data.splice(this.dataSource.data.findIndex(function (element) {
      return element.id === bookList.id;
    }), 1);

    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  private _addTableRow(bookList: BookList): void {
    this.dataSource.data.push(bookList);
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  private _replaceTableRow(bookList: BookList): void {
    this._removeTableRow(bookList);
    this._addTableRow(bookList);
  }

  private _showMessage(message: string): void {
    this._snackBar.open(message, undefined, { duration: 300 });
  }

  openDeleteDialog(bookList: BookList): void {
    const dialog = this._dialog.open(DeleteConfirmationComponent, {
      width: '300px',
      data: bookList,
    });

    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result.event == 'deleted')
        this._bookListService.delete(bookList.id).subscribe({
          next: () => this._removeTableRow(bookList),
          error: (err: any) => this._showMessage('Oops! Somthing went wrong'),
        });
    });
  }

  openListDialog(bookList: any): void {
    const dialog = this._dialog.open(BookListDialogBoxComponent, {
      width: '700px',
      data: Object.assign({}, bookList)
    });

    dialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.event == 'added') {
          this._bookListService.add(result.data).subscribe({
            next: (bookList: BookList) => this._addTableRow(bookList),
            error(err: any): void {
              console.log(err);
            },
          });
        }
        else if (result.event == 'updated') {
          this._bookListService.update(result.data).subscribe({
            next: (bookList: BookList) => this._replaceTableRow(bookList),
            error(err: any): void {
              console.log(err);
            },
          });
        }
      }
    });
  }

  loadlistBooks(bookList: BookList): void {
    this._sharedService.setNewList(bookList);
  }
}