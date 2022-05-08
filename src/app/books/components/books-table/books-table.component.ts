import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Book } from '../../core/classes/book.class';
import { BooksService } from '../../services/books.service';
import { BookDialogBoxComponent } from '../book-dialog-box/book-dialog-box.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BooksListService } from '../../services/book-lists.service';
import { BookList } from '../../core/classes/book-list.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'date', 'author', 'rank', 'action'];
  dataSource = new MatTableDataSource<Book>();
  selectedBookList!: BookList;
  private _getNewListSubscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _booksService: BooksService,
    private _bookListService: BooksListService,
    private _sharedService: SharedService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this._listenOnListIdChange();
  }

  ngOnDestroy():void{
    this._getNewListSubscription.unsubscribe();
  }

  private _listenOnListIdChange(): void {
    this._getNewListSubscription = this._sharedService.getNewList().subscribe(list => this._getBooksByListId(list));
  }

  private _getBooksByListId(list: BookList): void {
    this.selectedBookList = list;
    this._bookListService.getBooks(this.selectedBookList.id).subscribe({
      next: (books: Book[]) => this._refreshTable(books),
      error: (err: any) => this._showMessage('Oops! Somthing went wrong'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _refreshTable(books: Book[]): void {
    this.dataSource = new MatTableDataSource<Book>(books);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _removeTableRow(book: Book): void {
    this.dataSource.data.splice(this.dataSource.data.findIndex(function (element) {
      return element.id === book.id;
    }), 1);

    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _addTableRow(book: Book): void {
    this.dataSource.data.push(book);
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _replaceTableRow(book: Book): void {
    this._removeTableRow(book);
    this._addTableRow(book);
  }

  openBookDialog(book: any): void {
    const dialog = this._dialog.open(BookDialogBoxComponent, {
      width: '700px',
      data: Object.assign({}, book)
    });

    dialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.event == 'added') {
          result.data.bookListId = this.selectedBookList.id;
          this._booksService.add(result.data).subscribe({
            next: (book: Book) => this._addTableRow(book),
            error(err: any): void {
              console.log(err);
            },
          });
        }
        else if (result.event == 'updated') {
          result.data.bookListId = this.selectedBookList.id;
          this._booksService.update(result.data).subscribe({
            next: (book: Book) => this._replaceTableRow(book),
            error(err: any): void {
              console.log(err);
            },
          });
        }
      }
    });
  }

  openDeleteDialog(book: Book): void {
    const dialog = this._dialog.open(DeleteConfirmationComponent, {
      width: '300px',
      data: book,
    });

    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result.event == 'deleted')
        this._booksService.delete(book.id).subscribe({
          next: () => this._removeTableRow(book),
          error: (err: any) => this._showMessage('Oops! Somthing went wrong'),
        });
    });
  }

  private _showMessage(message: string): void {
    this._snackBar.open(message, undefined, { duration: 300 });
  }
}
