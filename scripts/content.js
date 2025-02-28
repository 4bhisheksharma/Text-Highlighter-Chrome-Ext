// Function to highlight selected text
function highlightSelection() {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let span = document.createElement("span");
    span.className = "highlighted-text";
    span.style.backgroundColor = "yellow";
    span.textContent = selection.toString();

    range.deleteContents();
    range.insertNode(span);

    saveHighlights();
}

// Save highlights to localStorage
function saveHighlights() {
    let highlights = [...document.querySelectorAll(".highlighted-text")].map(h => h.textContent);
    localStorage.setItem("highlightedTexts", JSON.stringify(highlights));
}

// Restore highlights after refresh
function restoreHighlights() {
    let savedTexts = JSON.parse(localStorage.getItem("highlightedTexts")) || [];
    let bodyText = document.body.innerHTML;

    savedTexts.forEach(text => {
        let regex = new RegExp(text, "g");
        bodyText = bodyText.replace(regex, `<span class="highlighted-text" style="background-color: yellow;">${text}</span>`);
    });

    document.body.innerHTML = bodyText;
}

// Run on page load
window.onload = restoreHighlights;
