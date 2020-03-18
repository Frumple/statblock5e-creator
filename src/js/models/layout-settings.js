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

  fromJson(json) {
    this.columns = json.columns;
    this.twoColumnMode = json.twoColumnMode;
    this.twoColumnHeight = json.twoColumnHeight;
  }

  toJson() {
    return {
      columns: this.columns,
      twoColumnMode: this.twoColumnMode,
      twoColumnHeight: this.twoColumnHeight,
    };
  }
}