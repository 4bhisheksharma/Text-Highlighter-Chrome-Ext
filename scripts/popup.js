document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("enableHighlight").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "enableHighlight" });
    });
  });

  document.getElementById("clearHighlights").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "clearHighlights" });
    });
  });
});