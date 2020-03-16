const createDOMPurify = require('dompurify');
global.DOMPurify = createDOMPurify(window);

global.ClipboardJS = require('clipboard');

// Mock for html_beautify should do nothing to the content
global.html_beautify = function(content) {
  return content;
};

global.waitForExpect = require('wait-for-expect');