// Define the API URL for the Render deployment of AI-Intergration-1
const apiUrl = "https://ai-intergration-1.onrender.com";

// Function to fetch and display traffic data for a specific location
async function fetchTrafficData(location, card) {
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

        // Update card content
        card.innerHTML = `
            <div class="card-title">${data.location}</div>
            <div class="card-text">Days Saved per Year: ${data.days_saved.toLocaleString()}</div>
            <div class="card-text">Cost Saved (USD): $${data.cost_saved_usd.toLocaleString()}</div>
            <div class="card-text">Last Refreshed: ${new Date().toLocaleString()}</div>
            <button class="refresh-btn" onclick="refreshData('${location}', this.parentElement)">Refresh</button>
        `;
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        card.innerHTML = `<p class="error">Error fetching data for ${location}: ${error.message}</p>`;
    }
}

// Function to refresh data for a specific intersection
function refreshData(location, card) {
    fetchTrafficData(location, card);
    card.querySelector(".refresh-btn").disabled = true; // Disable button during refresh
    setTimeout(() => card.querySelector(".refresh-btn").disabled = false, 2000); // Re-enable after 2 seconds
}

// Function to initialize the page by fetching data for predefined locations
function initializeTrafficData() {
    const trafficDiv = document.getElementById("traffic-data");
    if (!trafficDiv) {
        console.error("Required DOM element 'traffic-data' not found.");
        return;
    }

    trafficDiv.innerHTML = "<p>Loading traffic data...</p>";

    const locations = [
        "main_st_bailey", "walden_bailey", "hertel_main", "clinton_bailey",
        "transit_sheridan", "ferry_mass_richmond", "porter_jersey_normal",
        "niagara_east_robinson", "elmwood_forest", "grant_ferry"
    ];

    // Create a card for each location
    trafficDiv.innerHTML = ""; // Clear loading message
    locations.forEach(location => {
        const card = document.createElement("div");
        card.className = "intersection-card";
        trafficDiv.appendChild(card);
        fetchTrafficData(location, card); // Initial fetch
    });
}

document.addEventListener("DOMContentLoaded", initializeTrafficData);