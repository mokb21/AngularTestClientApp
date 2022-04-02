import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

//App Comnents
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { BooksTableComponent } from './books/components/books-table/books-table.component';
import { BooksPageComponent } from './books/components/books-page/books-page.component';
import { DeleteConfirmationComponent } from './shared/components/delete-confirmation/delete-confirmation.component';
import { BookDialogBoxComponent } from './books/components/book-dialog-box/book-dialog-box.component';

//Matrial Compnents
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListsTableComponent } from './books/components/lists-table/lists-table.component';
import { BookListDialogBoxComponent } from './books/components/book-list-dialog-box/book-list-dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksTableComponent,
    NavBarComponent,
    BooksPageComponent,
    DeleteConfirmationComponent,
    BookDialogBoxComponent,
    ListsTableComponent,
    BookListDialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
