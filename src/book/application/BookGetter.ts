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

    Logger.info(`Searching book with BookCode <${bookCode}> `)
    const book = await this.externalRepository.search(bookCode)

    if (book === null) {
      Logger.info(`No book with BookCode <${bookCode}> was found`)

      return
    }
    Logger.info(`Saving book with BookCode <${bookCode}> `)

    await this.internalRepository.save(book)

    Logger.info(`Book with BookCode <${bookCode}> Saved`)

    return

  }
}
