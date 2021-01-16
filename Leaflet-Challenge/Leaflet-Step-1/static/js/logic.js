// Define query URL with given API endpoint
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data);
    /* Once we get a response, send the data.features 
    object to the createFeatures function */
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    function onEachFeature(feature, layer) {
        // Give each feature a popup describing the place and time of the earthquake
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +
        "</h3><h3>Location: " + feature.properties.place + "</h3><hr><p>"
        + new Date(feature.properties.time) + "</p>");
    };
    // Define new function to create circle markers on map later
    function onEachLayer(feature) {
        // Create a circle marker for lat and long
        return new L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            // Define markers, don't forget to create circle prop function later
          radius: circleProperties(feature.properties.mag),
          fillOpacity: 0.8,
          // Don't forget to make circle color function
          color: circleColor(feature.properties.mag),
          fillColor: circleColor(feature.properties.mag)
        });
    };
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: onEachLayer
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
};

function createMap(earthquakes) {
    // Define map layers
    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
    });

    



};
