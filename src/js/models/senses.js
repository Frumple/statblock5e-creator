import PropertyLineModel from './property-line-model.js';

export default class Senses extends PropertyLineModel {
  constructor(skills) {
    super('Senses');

    this.skills = skills;

    this.reset();
  }

  reset() {
    this.blindsight = null;
    this.blindBeyondThisRadius = false;
    this.darkvision = null;
    this.tremorsense = null;
    this.truesight = null;

    this.useCustomText = false;
    this.customText = '';
    this.htmlCustomText = '';
  }

  get jsonPropertyNames() {
    return [
      'blindsight',
      'blindBeyondThisRadius',
      'darkvision',
      'tremorsense',
      'truesight',
      'useCustomText',
      'customText'
    ];
  }

  get passivePerception() {
    return this.skills.skills['perception'].passiveScore;
  }

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    return this.normalText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.normalText;
  }

  get normalText() {
    const unit = 'ft.';
    const list = [];

    if (this.blindsight != null) {
      const blindBeyondThisRadius = (this.blindBeyondThisRadius ? ' (blind beyond this radius)' : '');
      list.push(`blindsight ${this.blindsight} ${unit}${blindBeyondThisRadius}`);
    }
    if (this.darkvision != null) {
      list.push(`darkvision ${this.darkvision} ${unit}`);
    }
    if (this.tremorsense != null) {
      list.push(`tremorsense ${this.tremorsense} ${unit}`);
    }
    if (this.truesight != null) {
      list.push(`truesight ${this.truesight} ${unit}`);
    }

    list.push(`passive Perception ${this.passivePerception}`);

    return list.join(', ');
  }
}