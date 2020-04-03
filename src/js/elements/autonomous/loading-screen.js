import CustomAutonomousElement from './custom-autonomous-element.js';

const hiddenClass = 'loading-screen_hidden';

export default class LoadingScreen extends CustomAutonomousElement {
  static get elementName() { return 'loading-screen'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'loading-screen',
      'src/html/elements/autonomous/loading-screen.html');
  }

  constructor() {
    super(LoadingScreen.templatePaths);

    this.container = this.shadowRoot.getElementById('container');
    this.statusElement = this.shadowRoot.getElementById('status');
  }

  set visible(isVisible) {
    if(isVisible) {
      this.container.classList.remove(hiddenClass);
    } else {
      this.container.classList.add(hiddenClass);
    }
  }

  get visible() {
    return ! this.container.classList.contains(hiddenClass);
  }

  set status(text) {
    this.statusElement.textContent = text;
  }

  get status() {
    return this.statusElement.textContent;
  }
}