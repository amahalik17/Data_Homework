// Define query URL with given API endpoint
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryURL, function(data) {
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

// Create function for map tiles and layers
function createMap(earthquakes) {

    // Define map layers
    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
    "Street Map": streetMap,
    "Dark Map": darkMap,
    "Satellit Map": satelliteMap
};

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
    Earthquakes: earthquakes
};

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetMap, earthquakes]
});

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);

    // Create a legend to display information about our map
    var info = L.control({
    position: "bottomright"
});

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {

    var div = L.DomUtil.create("div", "legend"),

    labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    
    // iterate through labels list to define colors for markers
    for (var i = 0; i < labels.length; i++) {
        div.innerHTML += '<i style="background:' 
        + circleColor(i) 
        + '"></i> ' 
        + labels[i] 
        + '<br>';
    };

    return div;
};

    // Add the info legend to the map
    info.addTo(map);

};

// Create function to set the color for different magnitude
function circleColor(magnitude) {

    // Conditionals for magnitude
    if (magnitude >= 5) {
        return "red";
    }
    else if (magnitude >= 4) {
        return "peru";
    }
    else if (magnitude >= 3) {
        return "darkorange";
    }
    else if (magnitude >= 2) {
        return "yellow";
    }
    else if (magnitude >= 1) {
        return "yellowgreen";
    }
    else {
        return "green";
    }
};

// Define circleSize function
function circleSize(magnitude) {
    return magnitude ** 2;
};


