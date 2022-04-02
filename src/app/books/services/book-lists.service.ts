import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Book } from "../core/classes/book.class";
import { BookList } from "../core/classes/book-list.class";


@Injectable({
    providedIn: 'root',
})
export class BooksListService {
    private _url: string = environment.apiUrl + '/BookList'

    constructor(private _http: HttpClient) { }

    getLists(): Observable<BookList[]> {
        return this._http.get<BookList[]>(this._url).pipe(
            catchError(this.handleError)
        );
    }

    getList(id: UUID): Observable<BookList> {
        return this._http.get<BookList>(this._url + '/' + id).pipe(
            catchError(this.handleError)
        );
    }

    getBooks(id: UUID): Observable<Book[]> {
        return this._http.get<Book[]>(this._url + '/' + id + '/Books').pipe(
            catchError(this.handleError)
        );
    }

    delete(id: UUID): Observable<{}> {
        return this._http.delete(this._url + '/' + id).pipe(
            catchError(this.handleError)
        );
    }

    add(bookList: BookList): Observable<BookList> {
        return this._http.post<BookList>(this._url, bookList).pipe(
            catchError(this.handleError)
        );
    }

    update(bookList: BookList): Observable<BookList> {
        return this._http.put<BookList>(this._url, bookList).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(() => 'Something bad happened; please try again later.');
    }
}