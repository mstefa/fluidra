import { Logger } from "../../shared/infrastructure/logger/Logger";
import { BookExternalRepository } from "../domain/BookExternalRepository";
import { BookInternalRepository } from "../domain/BookInternalRepository";

export class BookGetter {
  private externalRepository: BookExternalRepository;
  private internalRepository: BookInternalRepository;

  constructor(
    externalRepository: BookExternalRepository,
    internalRepository: BookInternalRepository
  ) {
    this.externalRepository = externalRepository;
    this.internalRepository = internalRepository;
  }

  async run(bookCode: string): Promise<void> {

    const book = await this.externalRepository.search(bookCode)

    if (book === null) {
      Logger.info(`No book with BookCode <${bookCode}> was found`)

      return
    }

    this.internalRepository.save(book)

  }
}
