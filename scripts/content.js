// Highlight selected text
function highlightSelection() {
  const selection = window.getSelection();
  if (!selection.toString().trim()) return;
  
  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "text-highlight";
  span.textContent = selection.toString();
  
  range.deleteContents();
  range.insertNode(span);
  selection.removeAllRanges();
  
  saveHighlights();
}

// Save highlights to storage
function saveHighlights() {
  const url = window.location.href;
  const highlights = Array.from(document.querySelectorAll('.text-highlight'))
    .map(el => el.textContent);
  
  chrome.storage.local.set({ [url]: highlights });
}

// Restore highlights on page load
function restoreHighlights() {
  const url = window.location.href;
  
  chrome.storage.local.get([url], (result) => {
    const highlights = result[url] || [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentNode.classList.contains('text-highlight')) continue;
      
      highlights.forEach(text => {
        if (node.textContent.includes(text)) {
          const newSpan = document.createElement('span');
          newSpan.className = 'text-highlight';
          newSpan.textContent = text;
          
          const newText = node.textContent.replace(text, '\0');
          const parts = newText.split('\0');
          
          const fragment = document.createDocumentFragment();
          fragment.appendChild(document.createTextNode(parts[0]));
          fragment.appendChild(newSpan.cloneNode(true));
          fragment.appendChild(document.createTextNode(parts[1]));
          
          node.parentNode.replaceChild(fragment, node);
        }
      });
    }
  });
}

// Clear all highlights
function clearHighlights() {
  document.querySelectorAll('.text-highlight').forEach(el => {
    const textNode = document.createTextNode(el.textContent);
    el.parentNode.replaceChild(textNode, el);
  });
  
  const url = window.location.href;
  chrome.storage.local.remove(url);
}

// Message handling
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "enableHighlight") {
    document.addEventListener('mouseup', highlightSelection);
  } 
  else if (message.action === "clearHighlights") {
    clearHighlights();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', restoreHighlights);