import { Nullable } from '../../shared/Nullable';
import { Book } from './Book';

export interface BookInternalRepository {

  save(book: Book): Promise<void>;
  saveAll(books: Book[]): Promise<void>;
  search(id: string): Promise<Nullable<Book>>

}
