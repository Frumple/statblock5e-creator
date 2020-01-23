export default class LayoutSettings {
  constructor() {
    this.reset();
  }

  reset() {
    this.columns = 1;
    this.twoColumnMode = 'auto';
    this.twoColumnHeight = 600;
    this.emptySectionsVisibility = true;
  }
}