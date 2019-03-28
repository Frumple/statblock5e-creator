export default function printHtml(content) {
  const frame = createFrame(content);
  document.body.appendChild(frame);
}

function createFrame(content) {
  const frame = document.createElement('iframe');

  frame.addEventListener('load', onLoadFrame);
  frame.style.position = 'fixed';
  frame.style.right = '0';
  frame.style.bottom = '0';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';
  frame.srcdoc = content;

  return frame;
}

function onLoadFrame() {
  this.contentWindow.__container__ = this;
  this.contentWindow.addEventListener('beforeunload', onUnloadFrame);
  this.contentWindow.addEventListener('afterprint', onUnloadFrame);
  this.contentWindow.focus();
  this.contentWindow.print();
}

function onUnloadFrame() {
  document.body.removeChild(this.__container__);
}