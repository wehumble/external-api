const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', function() {
  const stateInput = document.getElementById('state-input');
  const fetchButton = document.getElementById('fetch-button');
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');
  
  fetchButton.addEventListener('click', async function() {
    const state = stateInput.value.trim().toUpperCase();
    stateInput.value = '';
    
    if (!state) {
      showError('Please enter a state code');
      return;
    }
    
    clearError();
    
    try {
      const response = await fetch(weatherApi + state);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      displayAlerts(data);
      
    } catch (error) {
      showError(`Network failure: ${error.message}`);
    }
  });
  
  function displayAlerts(data) {
    alertsDisplay.innerHTML = '';
    
    if (!data.features || data.features.length === 0) {
      alertsDisplay.textContent = 'No active alerts for this state';
      return;
    }
    
    const header = document.createElement('h3');
    header.textContent = `Weather Alerts: ${data.features.length}`;
    alertsDisplay.appendChild(header);
    
    data.features.forEach(feature => {
      const alertText = feature.properties?.headline || 'No headline available';
      const alertPara = document.createElement('p');
      alertPara.textContent = alertText;
      alertsDisplay.appendChild(alertPara);
    });
  }
  
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }
  
  function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }
});
