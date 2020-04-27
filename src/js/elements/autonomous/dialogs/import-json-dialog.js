import ImportDialog from './import-dialog.js';

const dragEnterClass = 'import-json-dialog__file-upload-drop-zone_drag-enter';

export default class ImportJsonDialog extends ImportDialog {
  static get elementName() { return 'import-json-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-json-dialog',
      'src/html/elements/autonomous/dialogs/import-json-dialog.html');
  }

  constructor() {
    super(ImportJsonDialog.templatePaths);

    this.fileInput = this.shadowRoot.getElementById('file-input');
    this.chooseFileButton = this.shadowRoot.getElementById('choose-file-button');
    this.fileUploadDropZone = this.shadowRoot.getElementById('file-upload-drop-zone');

    // This counter is needed to prevent dragleave events from removing CSS when dragging over child elements in the drop zone.
    this.dragEnterCounter = 0;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.fileInput.addEventListener('change', this.onFileSelected.bind(this));
      this.chooseFileButton.addEventListener('click', this.onClickChooseFileButton.bind(this));
      this.fileUploadDropZone.addEventListener('dragenter', this.onFileDragEnter.bind(this));
      this.fileUploadDropZone.addEventListener('dragleave', this.onFileDragLeave.bind(this));
      this.fileUploadDropZone.addEventListener('dragover', this.onFileDragOver.bind(this));
      this.fileUploadDropZone.addEventListener('drop', this.onFileDropped.bind(this));

      this.isInitialized = true;
    }
  }

  onClickChooseFileButton(event) {
    event.preventDefault();

    this.fileInput.click();
  }

  onFileSelected() {
    const file = this.fileInput.files[0];
    this.importFile(file);
  }

  onFileDragEnter() {
    this.dragEnterCounter++;
    this.fileUploadDropZone.classList.add(dragEnterClass);
  }

  onFileDragLeave() {
    this.dragEnterCounter--;
    if (this.dragEnterCounter === 0) {
      this.fileUploadDropZone.classList.remove(dragEnterClass);
    }
  }

  onFileDragOver(event) {
    // Prevent the browser's default behaviour of opening the file when dragging the file over the drop zone.
    event.preventDefault();
  }

  onFileDropped(event) {
    event.preventDefault();

    const items = event.dataTransfer.items;

    if (items) {
      if (items.length < 1) {
        this.setStatus('Error: Dragged item contains no data.', 'error');
      } else if (items.length > 1) {
        this.setStatus('Error: Cannot upload multiple dragged items.', 'error');
      } else if (items[0].kind !== 'file') {
        this.setStatus('Error: Dragged item is not a file.', 'error');
      } else {
        const file = items[0].getAsFile();
        this.importFile(file);
      }
    }
  }

  async importFile(file) {
    this.setStatus('Uploading file...');

    const text = await file.text();
    const json = JSON.parse(text);

    this.importCallback(json);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    this.fileInput.value = '';
    this.fileUploadDropZone.classList.remove(dragEnterClass);
    this.setStatus('');
    this.showModal();
  }
}