const createDOMPurify = require('/lib/js/purify.min.js');
global.DOMPurify = createDOMPurify(window);

// Mock for html_beautify should do nothing to the content
global.html_beautify = function(content) {
  return content;
};