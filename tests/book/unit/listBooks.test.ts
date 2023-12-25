import { BookGetter } from "../../../src/book/application/BookGetter"
import { BookLister } from "../../../src/book/application/BookLister"
import { Book } from "../../../src/book/domain/Book"
import { CommandHandler } from "../../../src/CommandHandler"
import { BookApiRepositoryMock } from "./mock/BookApiRepositoryMock"
import { BookDBRepositoryMock } from "./mock/BookDBRepositoryMock"

const bookDBRepositoryMock = new BookDBRepositoryMock()
const bookApiRepositoryMock = new BookApiRepositoryMock()
const bookGetter = new BookGetter(bookApiRepositoryMock, bookDBRepositoryMock)
const bookLister = new BookLister(bookApiRepositoryMock, bookDBRepositoryMock)

const commandHandler = new CommandHandler(bookGetter, bookLister)


describe('List all books', () => {

  it('Get all books and save it on the DB successfully', async () => {

    const mockedBook1 = new Book('1', "book title", 'book author', 2000);
    const mockedBook2 = new Book('2', "book title", 'book author', 2024);


    bookApiRepositoryMock.returnOnList([mockedBook1, mockedBook2])
    const command = {
      event: "listbooks",
      action: "LIST",
      code: ""
    };

    const commandString = JSON.stringify(command)

    await commandHandler.handle(commandString);

    bookDBRepositoryMock.assertLastSavedAllBooksAre([mockedBook1, mockedBook2]);

  });

})
