document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded. Ready for further enhancements.");
    const content = document.querySelector(".content");
    if (content) {
        setTimeout(() => {
            content.classList.add("loaded");
        }, 500);
    }
});