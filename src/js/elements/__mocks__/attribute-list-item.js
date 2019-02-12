export default class AttributeListItem {
  constructor(parent) {
    this._parent = parent;
    this._text = '';
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  remove() {
    let index = this._list.indexOf(this);
    if (index !== -1) {
      this._list.splice(index, 1);
    }
  }  
}