import { MongoClient } from "mongodb"

import { BookGetter } from "../../../src/book/application/BookGetter"
import { BookLister } from "../../../src/book/application/BookLister"
import { Book } from "../../../src/book/domain/Book"
import { BookApiRepository } from "../../../src/book/infrastructure/BookApiRepository"
import { MongoBookRepositoryMock } from "../../../src/book/infrastructure/MongoBookRepositoryMock"
import { CommandHandler } from "../../../src/CommandHandler"
import { config } from '../../../src/shared/config/appConfig';
import { MongoClientFactory } from "../../../src/shared/infrastructure/mongo/MongoClientFactory";
import MockServer from "./MockServer"

let bookDBRepository: MongoBookRepositoryMock;
let bookApiRepository: BookApiRepository;
let bookGetter: BookGetter;
let bookLister: BookLister;
let commandHandler: CommandHandler;
let _mongoClient: Promise<MongoClient>;
let mockServer: MockServer


describe('Integration: Get a book by Code', () => {

  afterAll(async () => {

    await mockServer.stop();
    await bookDBRepository.dropMock()
    const client = await _mongoClient

    await client.close(true)

  })

  beforeAll(async () => {

    mockServer = new MockServer(4000);
    await mockServer.start();

    const url = `${config.db.host}/${config.app.env}`;
    _mongoClient = MongoClientFactory.createClient({ url });

    bookDBRepository = new MongoBookRepositoryMock(_mongoClient);
    bookApiRepository = new BookApiRepository('http://localhost:4000')
    bookGetter = new BookGetter(bookApiRepository, bookDBRepository)
    bookLister = new BookLister(bookApiRepository, bookDBRepository)
    commandHandler = new CommandHandler(bookGetter, bookLister)

  });



  it('Get a book an save it on the DB successfully', async () => {
    const id = '111';
    const mockedBook = new Book(id, "book title", 'book author', 2000);

    const command = {
      event: "booksrequest",
      action: "GET",
      code: id
    };
    const commandString = JSON.stringify(command);

    await commandHandler.handle(commandString);

    const actual = await bookDBRepository.search(id);

    expect(actual).toEqual(mockedBook);

  })

})
