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
    let removeEvent = new CustomEvent('attributeListItemRemoved', {
      bubbles: true,
      composed: true,
      detail: {
        itemText: this.text
      }
    });
    document.dispatchEvent(removeEvent);

    let index = this._parent._list.indexOf(this);
    if (index >= 0) {
      this._parent._list.splice(index, 1);
    }
  }  
}