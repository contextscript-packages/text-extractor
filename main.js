import * as _ from 'underscore';
export function main(skipSelectors){
  console.log(_);
  if(!skipSelectors) {
    skipSelectors = []
  } else if(typeof skipSelectors === "string") {
    skipSelectors = [skipSelectors];
  }
  var walk = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
  var fullText = "";
  // The mappings from text ranges to their corresponding HTML nodes.
  var nodeMappings = [];
  var n;
  var text;
  while(n=walk.nextNode()) {
    if(skipSelectors.some((selector)=> n.matches(selector))) {
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
  return {
    text: fullText,
    nodeMappings: nodeMappings
  };
}
