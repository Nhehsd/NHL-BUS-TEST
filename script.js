document.addEventListener("DOMContentLoaded", function() {
    getArrivalTimes();
});

function getArrivalTimes() {
    const kentGardensStation = "Kent Gardens";
    const resultsDiv = document.getElementById("results");

    // Use the TFL API to get bus arrival times for Kent Gardens station
    const apiUrl = `https://api.tfl.gov.uk/StopPoint/Search?query=${kentGardensStation}&modes=bus`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract the Naptan ID (National Public Transport Access Node ID) for Kent Gardens station
            const kentGardensNaptanId = data.matches[0].id;

            // Use the Naptan ID to get bus arrival times for Kent Gardens station
            const arrivalsApiUrl = `https://api.tfl.gov.uk/StopPoint/${kentGardensNaptanId}/Arrivals`;

            return fetch(arrivalsApiUrl);
        })
        .then(response => response.json())
        .then(data => {
            // Process the data and display it in the resultsDiv
            resultsDiv.innerHTML = "<h2>Arrival Times at Kent Gardens</h2>";

            data.forEach(bus => {
                resultsDiv.innerHTML += `<p>${bus.lineName} - Destination: ${bus.destinationName} - ${bus.timeToStation} seconds</p>`;
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultsDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });
}
