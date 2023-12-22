
export enum CommandActionEnum {
  GET = 'GET',
  LIST = 'LIST'
}

export class Command {
  constructor(
    readonly event: string,
    readonly action: CommandActionEnum,
    readonly code: string
  ) { }
}
