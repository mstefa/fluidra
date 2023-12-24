import { BookGetter } from "./book/application/BookGetter";
import { BookLister } from "./book/application/BookLister";
import { InvalidArgumentError } from "./shared/domain/errors/InvalidArgumentError";
import { Command, CommandActionEnum } from "./shared/infrastructure/Command";
import { Logger } from "./shared/infrastructure/logger/Logger";

export class CommandHandler {

  constructor(
    private bookGetter: BookGetter,
    private bookLister: BookLister
  ) {

  }

  async handle(commandString: string) {
    const commandData = JSON.parse(commandString) as Command;
    const command = new Command(commandData.event, commandData.action, commandData.code)

    switch (command.action) {
      case CommandActionEnum.GET:
        await this.bookGetter.run(command?.code);
        break
      case CommandActionEnum.LIST:
        await this.bookLister.run()
        break
      default:
        const error = new InvalidArgumentError(`Command <${command.action}> is Not a Valid Command`);
        Logger.error(error)
    }


  }

}

