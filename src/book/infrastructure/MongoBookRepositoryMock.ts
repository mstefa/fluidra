


import { Logger } from '../../shared/infrastructure/logger/Logger';
import { MongoRepository } from '../../shared/infrastructure/mongo/MongoRepository';
import { Nullable } from '../../shared/Nullable';
import { Book } from '../domain/Book';
import { BookInternalRepository } from '../domain/BookInternalRepository';

interface BookDocument {
  id: string,
  title: string,
  author: string,
  year: number
}

export class MongoBookRepositoryMock extends MongoRepository<Book> implements BookInternalRepository {

  protected collectionName(): string {
    return 'book';
  }

  async save(book: Book): Promise<void> {
    Logger.info('Saving...')
    const collection = await this.collection();
    const document = { ...book }
    await collection.insertOne(document);
  }

  async saveAll(books: Book[]): Promise<void> {
    const collection = await this.collection();
    await collection.insertMany(books)
  }

  async search(id: string): Promise<Nullable<Book>> {
    Logger.info('Searching...')
    const collection = await this.collection();
    const document = await collection.findOne<BookDocument>({ id })
    if (!document) {
      return null
    }

    return new Book(document.id, document.title, document.author, document.year)
  }

  async dropMock() {

    const delay = (milliseconds: number): Promise<void> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, milliseconds);
      });
    };

    Logger.info('Cleaning Test DB')
    await delay(2000);

    // const clientCurrent = await this.client()
    // if ( clientCurrent.db().currentOp()){

    // }
    await this._drop()
    Logger.info('DB Cleaned')

  }

}
