export default class EventInterceptor {
  constructor(eventTarget, eventType) {
    this.event = null;

    eventTarget.addEventListener(eventType, (event) => {
      this.event = event;
    });
  }

  popEvent() {
    const event = this.event;
    this.event = null;
    return event;
  }
}