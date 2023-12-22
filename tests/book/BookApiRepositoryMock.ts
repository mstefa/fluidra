import { Book } from "../../src/book/domain/Book";
import { BookExternalRepository } from "../../src/book/domain/BookExternalRepository";
import { Nullable } from "../../src/shared/domain/Nullable";

export class BookApiRepositoryMock implements BookExternalRepository {

  list(): Promise<Book> {
    throw new Error("Method not implemented.");
  }

  search(id: string): Promise<Nullable<Book>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {
      const book = new Book(id, "book title", 'book author', 2000);

      resolve(book);

    });
  }

}
