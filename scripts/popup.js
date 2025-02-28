document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("enableHighlight").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let url = tabs[0].url;
            
            // Check if it's a valid webpage (not chrome:// or extensions page)
            if (url.startsWith("http://") || url.startsWith("https://")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: enableHighlightMode
                });
            } else {
                alert("Text Highlighter only works on regular websites!");
            }
        });
    });

    document.getElementById("clearHighlights").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let url = tabs[0].url;

            if (url.startsWith("http://") || url.startsWith("https://")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: clearHighlights
                });
            } else {
                alert("Cannot clear highlights on this page.");
            }
        });
    });
});
