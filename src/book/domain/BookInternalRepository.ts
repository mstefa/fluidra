import { Book } from './Book';

export interface BookInternalRepository {

  save(name: Book): Promise<void>;
  saveAll(name: Book[]): Promise<void>;

}
