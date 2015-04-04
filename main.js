(function(){

var _ = require("underscore");

function main(){
  console.log(_);
  var walk = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
  var fragments = [];
  var n;
  var text;
  while(n=walk.nextNode()) {
    if(n.classList && (n.classList.contains('ctxscript-container'))) {
      n = walk.nextSibling();
    }
    if(n.nodeType !== 3) continue;
    if(n.parentElement.tagName in {"STYLE":"", "SCRIPT":"", "NOSCRIPT":""}) continue;
    text = n.nodeValue.trim();
    if(text === '') continue;
    fragments = fragments.concat(text);
  }
  var allText = fragments.join(' ');
  return allText;
};

var root = this;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = main;
  }
  exports.main = main;
} else {
  root.main = main;
}

}.call(this));
