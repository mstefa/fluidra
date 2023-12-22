import { Book } from "../../src/book/domain/Book";
import { BookExternalRepository } from "../../src/book/domain/BookExternalRepository";
import { Nullable } from "../../src/shared/domain/Nullable";

export class BookApiRepositoryMock implements BookExternalRepository {

  private mockBook: Nullable<Book> = null;

  list(): Promise<Book> {
    throw new Error("Method not implemented.");
  }

  search(id: string): Promise<Nullable<Book>> {
    console.log(id)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {

      resolve(this.mockBook);
    });
  }

  returnOnSearch(book: Book) {
    this.mockBook = book;
  }

}
