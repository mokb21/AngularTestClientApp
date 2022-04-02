import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Book } from "../core/classes/book.class";

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private _url: string = environment.apiUrl + '/Books'

    constructor(private _http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this._http.get<Book[]>(this._url).pipe(
            catchError(this.handleError)
        );
    }

    getBook(id: UUID): Observable<Book> {
        return this._http.get<Book>(this._url + '/' + id).pipe(
            catchError(this.handleError)
        );
    }

    delete(id: UUID): Observable<{}> {
        return this._http.delete(this._url + '/' + id).pipe(
            catchError(this.handleError)
        );
    }

    add(book: Book): Observable<Book> {
        return this._http.post<Book>(this._url, book).pipe(
            catchError(this.handleError)
        );
    }

    update(book: Book): Observable<Book> {
        return this._http.put<Book>(this._url, book).pipe(
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