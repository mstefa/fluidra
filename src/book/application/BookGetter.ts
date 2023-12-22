export class BookGetter {
  //private repository: Repository;

  constructor(/**repository: repository*/) {
    //this.repository = repository;
  }

  async run(bookCode: string): Promise<void> {
    console.log(bookCode)
  }
}
