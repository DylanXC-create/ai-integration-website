document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded. Ready for further enhancements.");
    const content = document.querySelector(".content");
    if (content) {
        setTimeout(() => {
            content.classList.add("loaded");
        }, 500);
    }
});

// Function to toggle the intersections dropdown
function toggleIntersections(header) {
    const intersections = header.nextElementSibling;
    const arrow = header.querySelector(".arrow");
    intersections.classList.toggle("show");
    arrow.classList.toggle("down");
}