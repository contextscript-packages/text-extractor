export default ({ skipSelector } = {}) => {
  var walk = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
  var fullText = "";
  // The mappings from text ranges to their corresponding HTML nodes.
  var nodeMappings = [];
  var n;
  var text;
  while(n=walk.nextNode()) {
    if(
      (
        ("style" in n) && n.style.display === "none"
      ) || (
        skipSelector && ("matches" in n) && n.matches(skipSelector)
      )
    ) {
      n = walk.nextSibling();
    }
    if(!n || n.nodeType !== 3) continue;
    if(n.parentElement.tagName in {"STYLE":"", "SCRIPT":"", "NOSCRIPT":""}) continue;
    text = n.nodeValue.trim();
    if(text === '') continue;
    if(fullText.length !== 0) {
      fullText += " ";
    }
    nodeMappings = nodeMappings.concat([
      {
        start: fullText.length,
        end: fullText.length + text.length,
        node: n
      }
    ]);
    fullText += text;
  }
  return {
    text: fullText,
    nodeMappings: nodeMappings
  };
}
