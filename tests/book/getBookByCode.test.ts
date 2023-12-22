import { BookGetter } from "../../src/book/application/BookGetter"
import { Book } from "../../src/book/domain/Book"
import { CommandHandler } from "../../src/CommandHandler"
import { BookApiRepositoryMock } from "./BookApiRepositoryMock"
import { BookDBRepositoryMock } from "./BookDBRepositoryMock"

const bookDBRepositoryMock = new BookDBRepositoryMock()
const bookApiRepositoryMock = new BookApiRepositoryMock()
const bookGetter = new BookGetter(bookApiRepositoryMock, bookDBRepositoryMock)
const commandHandler = new CommandHandler(bookGetter)

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
