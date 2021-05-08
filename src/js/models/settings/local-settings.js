// Contains settings that are saved in local storage, but not in JSON

export default class LocalSettings {
  constructor() {
    this.reset();
  }

  reset() {
    this.version = '0.0.0';
    this.emptySectionsVisibility = true;
    this.gettingStartedVisibility = true;
  }
}