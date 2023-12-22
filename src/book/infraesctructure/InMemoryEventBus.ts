import { DomainEvent } from "../domain/DomainEvent";
import { EventBus } from "../domain/EventBus";

export class InMemoryEventBus implements EventBus {

  private events: DomainEvent[] = [];

  constructor() { }

  publish(event: DomainEvent): void {
    this.events.push(event);
  }

  getEvents() {
    return this.events;
  }
}
