import { Nullable } from '../../shared/domain/Nullable';
import { Uuid } from '../../shared/infrastructure/Uuid';
import { Article } from './Article';

export interface ArticleRepository {
  save(user: Article): Promise<void>;
  search(id: Uuid): Promise<Nullable<Article>>;
}
