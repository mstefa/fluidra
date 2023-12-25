import { BookGetter } from "./src/book/application/BookGetter";
import { BookLister } from "./src/book/application/BookLister";
import { BookApiRepository } from "./src/book/infrastructure/BookApiRepository";
import { MongoBookRepository } from "./src/book/infrastructure/MongoBookRepository";
import { EvenHandler } from "./src/EvenHandler";
import { config } from "./src/shared/config/appConfig";
import { MongoClientFactory } from "./src/shared/infrastructure/mongo/MongoClientFactory";
import MockServer from "./tests/book/integration/MockServer"

const port = 4001;

const mockServer = new MockServer(port);


const url = `${config.db.host}/${config.app.env}`;
const _mongoClient = MongoClientFactory.createClient({ url });
const bookDBRepository = new MongoBookRepository(_mongoClient);
const bookApiRepository = new BookApiRepository(`http://localhost:${port}`)
const bookGetter = new BookGetter(bookApiRepository, bookDBRepository)
const bookLister = new BookLister(bookApiRepository, bookDBRepository)

const id = '111';
const commandHandler = new EvenHandler(bookGetter, bookLister)
const command = {
  event: "booksreques",
  action: "LIST",
  code: id
};
const commandString = JSON.stringify(command);




async function start() {
  await mockServer.start();
  await commandHandler.handle(commandString);


}

async function stop() {
  await mockServer.stop();
}

start()

stop()
