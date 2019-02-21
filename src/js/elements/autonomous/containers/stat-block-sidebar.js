import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class StatBlockSidebar extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-sidebar'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-sidebar',
      'src/html/elements/autonomous/containers/stat-block-sidebar.html');
  }

  constructor() {
    super(StatBlockSidebar.templatePaths);

    this.sidebar = this.shadowRoot.getElementById('stat-block-sidebar');
    this.autoHeightModeButton = this.shadowRoot.getElementById('auto-height-mode-label');
    this.manualHeightModeButton = this.shadowRoot.getElementById('manual-height-mode-label');
    this.manualHeightSliderContainer = this.shadowRoot.getElementById('slider-container');
    this.manualHeightSlider = this.shadowRoot.getElementById('slider');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.autoHeightModeButton.addEventListener('click', this.onClickAutoHeightModeButton.bind(this));
      this.manualHeightModeButton.addEventListener('click', this.onClickManualHeightModeButton.bind(this));
      this.manualHeightSlider.addEventListener('input', this.onInputSlider.bind(this));

      this.isInitialized = true;
    }
  }

  onClickAutoHeightModeButton() {
    this.heightMode = 'auto';
    this.dispatchHeightChangedEvent('auto');
  }

  onClickManualHeightModeButton() {
    this.heightMode = 'manual';
    this.dispatchHeightChangedEvent('manual');
  }

  onInputSlider() {
    this.dispatchHeightChangedEvent('manual');
  }

  dispatchHeightChangedEvent(mode) {
    let height = null;

    if (mode === 'manual') {
      height = parseInt(this.manualHeightSlider.value);
    }    

    let heightEvent = new CustomEvent('twoColumnHeightChanged', {
      bubbles: true,
      composed: true,
      detail: {
        mode: mode,
        height: height
      }
    });
    this.dispatchEvent(heightEvent);
  }

  get visible() {
    return ('visible' in this.dataset);
  }

  set visible(isVisible) {
    const sidebarHiddenClass = 'stat-block-sidebar_hidden';

    if (isVisible) {
      this.dataset.visible = '';
      this.sidebar.classList.remove(sidebarHiddenClass);
    } else {
      delete this.dataset.visible;
      this.sidebar.classList.add(sidebarHiddenClass);
    }
  }

  get heightMode() {
    return this.dataset.heightMode;
  }

  set heightMode(mode) {
    const sliderContainerHiddenClass = 'stat-block-sidebar__slider-container_hidden';

    if (mode === 'auto') {      
      this.dataset.heightMode = 'auto';    
      this.manualHeightSliderContainer.classList.add(sliderContainerHiddenClass);
    } else if(mode === 'manual') {      
      this.dataset.heightMode = 'manual';
      this.manualHeightSliderContainer.classList.remove(sliderContainerHiddenClass);
    }
  }
}