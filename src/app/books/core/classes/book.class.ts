import { UUID } from "angular2-uuid";

export interface Book {
    id: UUID;
    title: string;
    author: string;
    rank: number;
    date: Date;
    bookListId: UUID;
}