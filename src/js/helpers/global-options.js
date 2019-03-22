class GlobalOptions {
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

export default new GlobalOptions();
