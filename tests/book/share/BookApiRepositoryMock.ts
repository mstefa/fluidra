import { Book } from "../../../src/book/domain/Book";
import { BookExternalRepository } from "../../../src/book/domain/BookExternalRepository";
import { Nullable } from "../../../src/shared/domain/Nullable";

export class BookApiRepositoryMock implements BookExternalRepository {

  private mockBook: Nullable<Book> = null;
  private mockBooks: Book[] = [];


  list(): Promise<Book[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {

      resolve(this.mockBooks);
    });

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(_id: string): Promise<Nullable<Book>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {
      resolve(this.mockBook);
    });
  }

  returnOnSearch(book: Book) {
    this.mockBook = book;
  }

  returnOnList(books: Book[]) {
    this.mockBooks = books;
  }

}
