// Define the API URL for the Render deployment of AI-Intergration-1
const apiUrl = "https://ai-intergration-1.onrender.com";

// Function to fetch and display traffic data for a specific location
async function fetchTrafficData(location) {
    const trafficDiv = document.getElementById("traffic-data");
    if (!trafficDiv) {
        console.error("Element with ID 'traffic-data' not found in the DOM.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/traffic/${location}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const locationData = `
            <h3>${data.location}</h3>
            <p>Days Saved per Year: ${data.days_saved}</p>
            <p>Cost Saved (USD): $${data.cost_saved_usd}</p>
        `;
        trafficDiv.innerHTML += locationData;
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        trafficDiv.innerHTML += `<p class="error">Error fetching data for ${location}: ${error.message}</p>`;
    }
}

// Function to fetch and display summary data for all locations
async function fetchTrafficSummary() {
    const summaryDiv = document.getElementById("traffic-summary");
    if (!summaryDiv) {
        console.error("Element with ID 'traffic-summary' not found in the DOM.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/traffic/summary`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const summaryData = `
            <h3>Traffic Summary</h3>
            <p>Total Locations: ${data.total_locations}</p>
            <p>Locations: ${data.locations.join(", ")}</p>
            <p>Total Days Saved: ${data.total_days_saved}</p>
            <p>Total Cost Saved (USD): $${data.total_cost_saved_usd}</p>
        `;
        summaryDiv.innerHTML = summaryData;
    } catch (error) {
        console.error("Error fetching traffic summary:", error);
        summaryDiv.innerHTML = `<p class="error">Error fetching summary: ${error.message}</p>`;
    }
}

// Function to initialize the page by fetching data for predefined locations and the summary
function initializeTrafficData() {
    const trafficDiv = document.getElementById("traffic-data");
    const summaryDiv = document.getElementById("traffic-summary");

    if (!trafficDiv || !summaryDiv) {
        console.error("Required DOM elements not found. Ensure 'traffic-data' and 'traffic-summary' divs exist.");
        return;
    }

    trafficDiv.innerHTML = "";
    summaryDiv.innerHTML = "";

    const locations = ["main_st_bailey", "walden_bailey"];
    locations.forEach(location => fetchTrafficData(location));

    fetchTrafficSummary();
}

document.addEventListener("DOMContentLoaded", initializeTrafficData);