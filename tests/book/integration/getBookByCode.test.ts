import { MongoClient } from "mongodb"

import { BookGetter } from "../../../src/book/application/BookGetter"
import { BookLister } from "../../../src/book/application/BookLister"
import { Book } from "../../../src/book/domain/Book"
import { BookApiRepository } from "../../../src/book/infrastructure/BookApiRepository"
import { MongoBookRepository } from "../../../src/book/infrastructure/MongoBookRepository"
import { EvenHandler } from "../../../src/EvenHandler"
import { config } from '../../../src/shared/config/appConfig';
import { Logger } from "../../../src/shared/infrastructure/logger/Logger"
import { MongoClientFactory } from "../../../src/shared/infrastructure/mongo/MongoClientFactory";
import MockServer from "./MockServer"

let bookDBRepository: MongoBookRepository;
let bookApiRepository: BookApiRepository;
let bookGetter: BookGetter;
let bookLister: BookLister;
let commandHandler: EvenHandler;
let _mongoClient: Promise<MongoClient>;
let mockServer: MockServer


describe('Integration: Get a book by Code', () => {

  afterAll(async () => {
    Logger.info('Stopping Mock Server...')

    await mockServer.stop();
    Logger.info('Mock Server Stopped')

    Logger.info('Cleaning Test DB...')

    const client = await _mongoClient
    const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray();
    const collectionsNames = collections.map(collection => collection.name);
    for (const collectionName of collectionsNames) {
      // eslint-disable-next-line no-await-in-loop
      await client.db().collection(collectionName).deleteMany({});
    }

    await client.close(true)
    Logger.info('DB Cleaned, Connection Closed')

  })

  beforeAll(async () => {
    Logger.info('Starting Mock Server...')

    mockServer = new MockServer(4000);
    await mockServer.start();

    Logger.info('Connecting to DB...')

    const url = `${config.db.host}/${config.app.env}`;
    _mongoClient = MongoClientFactory.createClient({ url });

    bookDBRepository = new MongoBookRepository(_mongoClient);
    bookApiRepository = new BookApiRepository('http://localhost:4000')
    bookGetter = new BookGetter(bookApiRepository, bookDBRepository)
    bookLister = new BookLister(bookApiRepository, bookDBRepository)
    commandHandler = new EvenHandler(bookGetter, bookLister)

  });



  it('Get a book an save it on the DB successfully', async () => {
    const id = '111';
    const mockedBook = new Book(id, "book title", 'book author', 2000);

    const command = {
      event: "booksrequest1",
      action: "GET",
      code: id
    };
    const commandString = JSON.stringify(command);

    await commandHandler.handle(commandString);

    const actual = await bookDBRepository.search(id);

    expect(actual).toEqual(mockedBook);

  })

  it('Handler correctly when the api respond an error 400', async () => {
    const id = 'ERROR400';

    const command = {
      event: "booksrequest2",
      action: "GET",
      code: id
    };
    const commandString = JSON.stringify(command);

    await commandHandler.handle(commandString);
  })

  it('Handler correctly when the api respond an error 500', async () => {
    const id = 'ERROR500';

    const command = {
      event: "booksrequest3",
      action: "GET",
      code: id
    };
    const commandString = JSON.stringify(command);

    await commandHandler.handle(commandString);
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
