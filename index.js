// Element Selectors
const stateInput = document.getElementById('state-input');
const fetchBtn = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

// Event Listener for the button
fetchBtn.addEventListener('click', () => {
    const state = stateInput.value.trim().toUpperCase();
    
    // Step 3: Clear UI before new fetch
    clearUI();

    if (state.length !== 2) {
        showError("Please enter a valid 2-letter state abbreviation (e.g., NY).");
        return;
    }

    fetchWeatherAlerts(state);
});

async function fetchWeatherAlerts(state) {
    try {
        // Step 1: Fetch alerts
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch weather data. Please check the state code.");
        }

        const data = await response.json();
        
        // Step 2: Display the alerts
        displayAlerts(data, state);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayAlerts(data, state) {
    const features = data.features;
    
    // Task requirement: Show summary message with count
    const summary = `Weather Alerts: ${features.length}`;
    
    let htmlContent = `<h3>${summary}</h3>`;

    if (features.length > 0) {
        htmlContent += "<ul>";
        // Map through features to get headlines
        features.forEach(alert => {
            htmlContent += `<li>${alert.properties.headline}</li>`;
        });
        htmlContent += "</ul>";
    } else {
        htmlContent += "<p>No active alerts for this state.</p>";
    }

    alertsDisplay.innerHTML = htmlContent;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearUI() {
    // Task requirement: Clear input and previous data
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden');
    stateInput.value = ""; // Clear the input field after clicking
}