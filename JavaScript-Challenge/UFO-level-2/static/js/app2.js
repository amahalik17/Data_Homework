// Create variable for dataset
var sightings = data;

// Select the table, form, and button element
var button = d3.select("#filter-btn");
var tbody = d3.select("tbody");
var form = d3.select("#form");

// loop through the dataset and console log the objects
sightings.forEach((details) => {

    console.log(details);
    var row = tbody.append("tr");

    Object.entries(details).forEach(([key, value]) => {
        console.log(key, value);

        var cell = row.append("td");
        cell.text(value);
    });
});

// Create event handlers
// if they click the button
button.on("click", runEnter);
// if they press enter
form.on("submit", runEnter);

// Create function
function runEnter() {

    // remove current table
    tbody.html("");
    // prevent page from refreshing
    d3.event.preventDefault();

    // Select all input elements, added to html doc
    var date = d3.select("#datetime").property("value");
    var city = d3.select("#city").property("value").toLowerCase();
    var state = d3.select("#state").property("value").toLowerCase();
    var country = d3.select("#country").property("value").toLowerCase();
    var shape = d3.select("#shape").property("value").toLowerCase();

    var filteredData = sightings;

    // create if statements that filter the data
    // for matching search results
    if (date) {
        filteredData = filteredData.filter(details => details.datetime === date);
    };
    if (city) {
        filteredData = filteredData.filter(details => details.city === city);
    };
    if (state) {
        filteredData = filteredData.filter(details => details.state === state);
    };
    if (country) {
        filteredData = filteredData.filter(details => details.country === country);
    };
    if (shape) {
        filteredData = filteredData.filter(details => details.shape === shape);
    };

    // Display filtered data to DOM
    filteredData.forEach((details) => {
        var row = tbody.append("tr");

        Object.entries(details).forEach(([key, value]) => {
            //console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        });
    });
};