const apiKey = '08a91a4696a64ad5a932a282fceb99fc'; // Your API key
const apiUrl = 'https://api.football-data.org/v4/matches'; // Endpoint for matches
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy server URL

fetch(proxyUrl + apiUrl, { // Use the proxy URL
    headers: {
        'X-Auth-Token': apiKey // Add your API key to the request headers
    }
})
.then(response => {
    console.log('Response status:', response.status); // Log the response status
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    console.log('API response data:', data); // Log the API response data
    const matches = data.matches; // Extract matches from the response
    const matchesContainer = document.getElementById('matches');

    if (!matches || matches.length === 0) {
        matchesContainer.innerHTML = '<p>No matches found.</p>';
        return;
    }

    // Loop through matches and display them
    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match';
        matchElement.innerHTML = `
            <p><strong>${match.homeTeam.name}</strong> vs <strong>${match.awayTeam.name}</strong></p>
            <p>Status: ${match.status}</p>
            <p>Score: ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</p>
            <hr>
        `;
        matchesContainer.appendChild(matchElement);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
    const matchesContainer = document.getElementById('matches');
    matchesContainer.innerHTML = '<p>Failed to load matches. Please try again later.</p>';
});