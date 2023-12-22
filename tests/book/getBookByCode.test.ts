import { BookGetter } from "../../src/book/application/BookGetter"
import { CommandHandler } from "../../src/CommandHandler"
import { BookApiRepositoryMock } from "./BookApiRepositoryMock"

const bookApiRepositoryMock = new BookApiRepositoryMock()
const bookGetter = new BookGetter(bookApiRepositoryMock)
const commandHandler = new CommandHandler(bookGetter)

// beforeEach(() => {

//   commandHandler = new CommandHandler()

// });

describe('Get a book by Code', () => {
  it('Get a book an save it on the DB successfully', async () => {

    const command = {
      event: "booksrequest",
      action: "GET",
      code: "1"
    };

    const commandString = JSON.stringify(command)

    commandHandler.handle(commandString)

  })

})
