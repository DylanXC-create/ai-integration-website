document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded. Ready for further enhancements.");
    // Fade in the content after the page loads
    const content = document.querySelector(".content");
    if (content) {
        setTimeout(() => {
            content.style.opacity = "1";
        }, 500); // Delay for background visibility
    }
});