import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BookList } from "src/app/books/core/classes/book-list.class";

@Injectable({ providedIn: 'root' })
export class SharedService {
    private list = new Subject<BookList>();

    getNewList(): Observable<BookList> {
        return this.list.asObservable();
    }

    setNewList(list: BookList) {
        this.list.next(list);
    }
}