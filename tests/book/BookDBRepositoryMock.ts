import { Book } from "../../src/book/domain/Book";
import { BookInternalRepository } from "../../src/book/domain/BookInternalRepository";


export class BookDBRepositoryMock implements BookInternalRepository {

  private mockSave = jest.fn();
  private mockSaveAll = jest.fn();

  async save(book: Book): Promise<void> {
    this.mockSave(book);
  }

  saveAll(books: Book[]): Promise<void> {
    return this.mockSaveAll(books);
  }

  assertLastSavedBookIs(expected: Book): void {
    const mock = this.mockSave.mock;
    const lastSavedBook = mock.calls[mock.calls.length - 1][0] as Book;
    expect(lastSavedBook).toBeInstanceOf(Book);
    expect(lastSavedBook).toEqual(expected);
  }

  // assertLastSavedAllBooksAre(expected: Book[]): void {
  //   const mock = this.mockSaveAll.mock;
  //   const lastSavedBooks = mock.calls[mock.calls.length - 1][0];
  //   console.log(lastSavedBooks)
  //   console.log(expected)

  //   throw new Error('Method not implemented.')
  // }

}
