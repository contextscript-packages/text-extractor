(function(){

function main(skipClass){
  console.log(`hello ES6 world!`);
  var walk = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
  var fullText = "";
  // The mappings from text ranges to their corresponding HTML nodes.
  var nodeMappings = [];
  var n;
  var text;
  while(n=walk.nextNode()) {
    if(n.classList && (n.classList.contains(skipClass))) {
      n = walk.nextSibling();
    }
    if(n.nodeType !== 3) continue;
    if(n.parentElement.tagName in {"STYLE":"", "SCRIPT":"", "NOSCRIPT":""}) continue;
    text = n.nodeValue.trim();
    if(text === '') continue;
    nodeMappings = nodeMappings.concat([
      {
        start: fullText.length + 1,
        end: fullText.length + 1 + text.length,
        node: n
      }
    ]);
    fullText += " " + text;
  }
  var allText = fragments.join(' ');
  return {
    text: fullText,
    nodeMappings: nodeMappings
  };
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = main;
  }
  exports.main = main;
}

}.call(this));
