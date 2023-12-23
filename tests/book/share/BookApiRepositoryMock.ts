import { Book } from "../../../src/book/domain/Book";
import { BookExternalRepository } from "../../../src/book/domain/BookExternalRepository";
import { Nullable } from "../../../src/shared/domain/Nullable";
import { Logger } from "../../../src/shared/infrastructure/logger/Logger";

export class BookApiRepositoryMock implements BookExternalRepository {

  private mockBook: Nullable<Book> = null;
  private mockBooks: Book[] = [];


  list(): Promise<Book[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {

      resolve(this.mockBooks);
    });

  }

  search(id: string): Promise<Nullable<Book>> {
    Logger.info(`External ${id}`)

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
