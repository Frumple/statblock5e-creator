import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DragAndDropList extends CustomAutonomousElement {
  constructor(templatePaths) {
    super(templatePaths);

    this.draggedItem = null;
  }

  insertDraggedItemBefore(element) {
    if (this.draggedItem !== null) {
      this.insertBefore(this.draggedItem, element);
      this.draggedItem = null;
    }
  }
}