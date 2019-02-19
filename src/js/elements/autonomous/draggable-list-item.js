import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class DraggableListItem extends CustomAutonomousElement {
  static get templatePaths() {
    return super.templatePaths.set(
      'draggable-list-item',
      'src/html/elements/autonomous/draggable-list-item.html');
  }

  constructor(templatePaths) {
    super(templatePaths);
  }

  connectedCallback() {
    this.container.style.cssText = 'user-select: none; -webkit-user-drag: element;';
    this.container.setAttribute('draggable', 'true');

    this.addEventListener('dragstart', this.onDragStartItem);
    this.addEventListener('dragover', this.onDragOverItem);
    this.addEventListener('dragleave', this.onDragLeaveItem);
    this.addEventListener('dragend', this.onDragEndItem);
    this.addEventListener('drop', this.onDropItem);
  }

  onDragStartItem(event) {
    // Drag and Drop on Firefox only works if data is set
    event.dataTransfer.setData('text', '');

    let target = event.target;
    target.parentNode.draggedItem = target;
  }

  onDragOverItem(event) {
    event.preventDefault();

    let target = event.target;

    if (target.parentNode.draggedItem !== null) {
      event.dataTransfer.dropEffect = 'move';
    
      let rect = target.getBoundingClientRect();
      let midpointY = rect.y + (rect.height / 2);

      if (event.clientY < midpointY) {
        target.dragoverRegion = 'top';
      } else {
        target.dragoverRegion = 'bottom';
      }
    } else {
      event.dataTransfer.dropEffect = 'none';
    }    
  }

  onDragLeaveItem() {
    this.dragoverRegion = 'none';
  }

  onDragEndItem(event) {
    let target = event.target;
    target.parentNode.draggedItem = null;
  }

  onDropItem(event) {
    event.preventDefault();

    let target = event.target;
    if (target.dragoverRegion === 'top') {
      target.parentNode.insertDraggedItemBefore(target);
      target.dragoverRegion = 'none';
    } else if (target.dragoverRegion === 'bottom') {
      target.parentNode.insertDraggedItemBefore(target.nextElementSibling);
      target.dragoverRegion = 'none';
    }
  }

  get dragoverRegion() {
    return this.dataset.dragoverRegion;
  }

  set dragoverRegion(state) {
    const dragoverTopClass = 'draggable-list-item__container_dragover-top';
    const dragoverBottomClass = 'draggable-list-item__container_dragover-bottom';

    switch (state) {
    case 'top':
      this.dataset.dragoverRegion = 'top';
      this.container.classList.add(dragoverTopClass);
      this.container.classList.remove(dragoverBottomClass);
      break;
    case 'bottom':
      this.dataset.dragoverRegion = 'bottom';
      this.container.classList.remove(dragoverTopClass);
      this.container.classList.add(dragoverBottomClass);
      break;
    default:
      this.dataset.dragoverRegion = 'none';
      this.container.classList.remove(dragoverTopClass);
      this.container.classList.remove(dragoverBottomClass);
    }
  }  
}