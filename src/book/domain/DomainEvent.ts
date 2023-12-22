
export class DomainEvent {

  readonly eventId: string;
  readonly aggregateId: string;
  readonly ocurredOn: string;
  readonly eventName: string;

  constructor(
    eventId: string,
    aggregateId: string,
    eventName: string,
  ) {
    this.eventId = eventId;
    this.aggregateId = aggregateId;
    this.eventName = eventName;
    this.ocurredOn = Date.now().toString(),

  }

}
