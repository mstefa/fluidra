


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

export class MongoBookRepository extends MongoRepository<Book> implements BookInternalRepository {

  protected collectionName(): string {
    return 'book';
  }

  async save(book: Book): Promise<void> {
    Logger.info('Saving Book on DB')
    const collection = await this.collection();
    const document: BookDocument = { ...book }
    await collection.insertOne(document);
  }

  async saveAll(books: Book[]): Promise<void> {
    Logger.info('Saving Books on DB')

    const collection = await this.collection();

    const documents = [...books]
    await collection.insertMany(documents)
  }

  async search(id: string): Promise<Nullable<Book>> {
    Logger.info('Searching book in DB')
    const collection = await this.collection();
    const document = await collection.findOne<BookDocument>({ id })
    if (!document) {
      return null
    }

    return new Book(document.id, document.title, document.author, document.year)
  }


}
