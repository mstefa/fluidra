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


describe('Integration: List all books', () => {

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



  it('List all books and save them on the DB successfully', async () => {
    const id1 = '1001';
    const id2 = '1002';

    const mockedBook1 = new Book(id1, "book title1", 'book author1', 2000);
    const mockedBook2 = new Book(id2, "book title2", 'book author2', 2002);

    const command = {
      event: "booksrequest101",
      action: "LIST",
      code: ''
    };

    const commandString = JSON.stringify(command);

    await commandHandler.handle(commandString);

    const actual1 = await bookDBRepository.search(id1);
    const actual2 = await bookDBRepository.search(id2);

    expect(actual1).toEqual(mockedBook1);
    expect(actual2).toEqual(mockedBook2);


  });

})
