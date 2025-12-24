const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', function() {
  const stateInput = document.getElementById('state-input');
  const fetchButton = document.getElementById('fetch-button');
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');
  
  fetchButton.addEventListener('click', async function() {
    // Get the state value FIRST
    const state = stateInput.value.trim().toUpperCase();
    
    // Clear the input field (required by tests)
    stateInput.value = '';
    
    // Validate state - if empty, show error and return
    if (!state) {
      errorMessage.textContent = 'Please enter a state code';
      errorMessage.classList.remove('hidden');
      alertsDisplay.innerHTML = '';
      return;
    }
    
    // Clear any previous error since we have a valid state
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
    
    try {
      const response = await fetch(weatherApi + state);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch alerts`);
      }
      
      const data = await response.json();
      alertsDisplay.innerHTML = '';
      
      if (data.features && data.features.length > 0) {
        const count = data.features.length;
        const header = document.createElement('h3');
        header.textContent = `Weather Alerts: ${count}`;
        alertsDisplay.appendChild(header);
        
        data.features.forEach(feature => {
          const text = feature.properties?.headline || 'No headline available';
          const p = document.createElement('p');
          p.textContent = text;
          alertsDisplay.appendChild(p);
        });
      } else {
        alertsDisplay.textContent = 'No active alerts for this state';
      }
      
    } catch (error) {
      errorMessage.textContent = `Network failure: ${error.message}`;
      errorMessage.classList.remove('hidden');
    }
  });
});
