import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DragAndDropListItem extends CustomAutonomousElement {
  static get templatePaths() {
    return super.templatePaths.set(
      'drag-and-drop-list-item',
      'src/html/elements/autonomous/lists/drag-and-drop-list-item.html');
  }

  constructor(templatePaths, parent) {
    super(templatePaths, parent);

    this.list = parent;
    this.dragImage = null;

    this.container = this.shadowRoot.getElementById('drag-and-drop-list-item-container');
    this.dragHandle = this.shadowRoot.getElementById('drag-and-drop-list-item-drag-handle');
  }

  connectedCallback() {
    this.dragHandle.style.cssText = 'user-select: none; -webkit-user-drag: element;';
    this.dragHandle.setAttribute('draggable', 'true');

    this.addEventListener('dragstart', this.onDragStartItem.bind(this));
    this.addEventListener('dragover', this.onDragOverItem.bind(this));
    this.addEventListener('dragleave', this.onDragLeaveItem.bind(this));
    this.addEventListener('dragend', this.onDragEndItem.bind(this));
    this.addEventListener('drop', this.onDropItem.bind(this));
  }

  onDragStartItem(event) {
    // Drag and Drop on Firefox only works if data is set
    event.dataTransfer.setData('text', '');

    event.dataTransfer.setDragImage(this.dragImage, 0, 0);

    this.list.draggedItem = event.target;
  }

  onDragOverItem(event) {
    event.preventDefault();

    if (this.list.draggedItem !== null) {
      event.dataTransfer.dropEffect = 'move';

      const rect = event.target.getBoundingClientRect();
      const midpointY = rect.y + (rect.height / 2);

      if (event.clientY < midpointY) {
        this.dragoverRegion = 'top';
      } else {
        this.dragoverRegion = 'bottom';
      }
    } else {
      event.dataTransfer.dropEffect = 'none';
    }
  }

  onDragLeaveItem() {
    this.dragoverRegion = 'none';
  }

  onDragEndItem() {
    this.list.draggedItem = null;
  }

  onDropItem(event) {
    event.preventDefault();

    if (this.dragoverRegion === 'top') {
      this.list.insertDraggedItemBefore(this);
      this.dragoverRegion = 'none';
    } else if (this.dragoverRegion === 'bottom') {
      this.list.insertDraggedItemBefore(this.nextElementSibling);
      this.dragoverRegion = 'none';
    }
  }

  get dragoverRegion() {
    return this.dataset.dragoverRegion;
  }

  set dragoverRegion(state) {
    const dragoverTopClass = 'drag-and-drop-list-item__container_dragover-top';
    const dragoverBottomClass = 'drag-and-drop-list-item__container_dragover-bottom';

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