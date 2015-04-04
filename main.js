export default (options) => {
  var skipSelectors;
  if(options) {
    { skipSelectors } = options;
  }
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
    if(("matches" in n) && skipSelectors.some((selector)=> n.matches(selector))) {
      n = walk.nextSibling();
    }
    if(!("nodeType" in n) || n.nodeType !== 3) continue;
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
