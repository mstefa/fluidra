import { BookExternalRepository } from "../domain/BookExternalRepository";

export class BookGetter {
  private externalRepository: BookExternalRepository;

  constructor(externalRepository: BookExternalRepository) {
    this.externalRepository = externalRepository;
  }

  async run(bookCode: string): Promise<void> {
    console.log(bookCode)

    const book = await this.externalRepository.search(bookCode)

    console.log(book)
  }
}
