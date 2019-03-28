const createDOMPurify = require('/lib/js/purify.min.js');
global.DOMPurify = createDOMPurify(window);

global.ClipboardJS = require('/lib/js/clipboard.min.js');

// Mock for html_beautify should do nothing to the content
global.html_beautify = function(content) {
  return content;
};