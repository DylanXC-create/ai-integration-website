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

        const table = trafficDiv.querySelector("table") || createTable(trafficDiv);
        const row = table.insertRow();
        row.insertCell(0).textContent = data.location;
        row.insertCell(1).textContent = data.days_saved.toLocaleString();
        row.insertCell(2).textContent = `$${data.cost_saved_usd.toLocaleString()}`;
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        trafficDiv.innerHTML += `<p class="error">Error fetching data for ${location}: ${error.message}</p>`;
    }
}

// Function to create a table for traffic data
function createTable(container) {
    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Days Saved per Year</th>
                        <th>Cost Saved (USD)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;
    return container.querySelector("table");
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

        summaryDiv.innerHTML = `
            <h3>Traffic Summary</h3>
            <p><strong>Total Locations:</strong> ${data.total_locations}</p>
            <p><strong>Locations:</strong> ${data.locations.join(", ")}</p>
            <p><strong>Total Days Saved:</strong> ${data.total_days_saved.toLocaleString()}</p>
            <p><strong>Total Cost Saved (USD):</strong> $${data.total_cost_saved_usd.toLocaleString()}</p>
        `;
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

    trafficDiv.innerHTML = "<p>Loading traffic data...</p>";
    summaryDiv.innerHTML = "<p>Loading summary...</p>";

    const locations = [
        "main_st_bailey", "walden_bailey", "hertel_main", "clinton_bailey",
        "transit_sheridan", "ferry_mass_richmond", "porter_jersey_normal",
        "niagara_east_robinson", "elmwood_forest", "grant_ferry"
    ];
    locations.forEach(location => fetchTrafficData(location));

    fetchTrafficSummary();
}

document.addEventListener("DOMContentLoaded", initializeTrafficData);