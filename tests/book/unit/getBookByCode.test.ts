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

// beforeEach(() => {

//   commandHandler = new CommandHandler()

// });

describe('Get a book by Code', () => {
  it('Get a book an save it on the DB successfully', async () => {
    const id = '11';
    const mockedBook = new Book(id, "book title", 'book author', 2000);
    bookApiRepositoryMock.returnOnSearch(mockedBook)
    const command = {
      event: "booksrequest",
      action: "GET",
      code: id
    };

    const commandString = JSON.stringify(command)

    await commandHandler.handle(commandString)

    bookDBRepositoryMock.assertLastSavedBookIs(mockedBook)

  })

})
