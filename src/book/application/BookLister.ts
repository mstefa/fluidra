import { Logger } from "../../shared/infrastructure/logger/Logger";
import { BookExternalRepository } from "../domain/BookExternalRepository";
import { BookInternalRepository } from "../domain/BookInternalRepository";

export class BookLister {
  private externalRepository: BookExternalRepository;
  private internalRepository: BookInternalRepository;

  constructor(
    externalRepository: BookExternalRepository,
    internalRepository: BookInternalRepository
  ) {
    this.externalRepository = externalRepository;
    this.internalRepository = internalRepository;
  }

  async run(): Promise<void> {

    const book = await this.externalRepository.list()

    if (book.length === 0) {
      Logger.info(`No book was found`)

      return
    }

    this.internalRepository.saveAll(book)

  }
}
