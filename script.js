document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded. Ready for further enhancements.");
    // Fade in the content after the page loads
    const content = document.querySelector(".content");
    if (content) {
        setTimeout(() => {
            content.classList.add("loaded");
        }, 500); // Delay for background visibility
    }
});