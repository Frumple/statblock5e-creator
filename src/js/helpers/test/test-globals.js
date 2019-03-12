const createDOMPurify = require('/lib/js/purify.min.js');
global.DOMPurify = createDOMPurify(window);

global.document.clear = function() {
  document.body.innerHTML = '';
};