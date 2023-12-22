import { Nullable } from '../../shared/domain/Nullable';
import { Book } from './Book';

export interface BookExternalRepository {

  list(): Promise<Book>;
  search(id: string): Promise<Nullable<Book>>;

}
