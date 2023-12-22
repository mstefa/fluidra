import { BookGetter } from "./book/application/BookGetter";
import { InvalidArgumentError } from "./shared/domain/errors/InvalidArgumentError";
import { Command, CommandActionEnum } from "./shared/infrastructure/Command";

export class CommandHandler {

  constructor(
    private bookGetter: BookGetter
  ) {

  }

  handle(commandString: string) {
    const commandData = JSON.parse(commandString) as Command;
    const command = new Command(commandData.event, commandData.action, commandData.code)

    switch (command.action) {
      case CommandActionEnum.GET:
        this.bookGetter.run(command?.code);
        break
      case CommandActionEnum.LIST:
        this.listBooks();
        break
      default:
        throw new InvalidArgumentError(`Command <${command.action}> is Not a Valid Command`);
    }


  }


  listBooks(): void {
    console.log('listing books')
  }
}

