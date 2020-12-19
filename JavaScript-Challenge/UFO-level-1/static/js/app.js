// Create variable for dataset
var sightings = data;

// Select the button and the table
var button = d3.select("#filter-btn");
var tbody = d3.select("tbody");
var form = d3.select("#form");

// display the data in console
// console.log(sightings);

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
button.on("click", runEnter);
form.on("submit", runEnter);

function runEnter() {

    // remove current table
    tbody.html("");

    // prevent page from refreshing
    d3.event.preventDefault();

    // select input element and get the value property
    var inputValue = d3.select("#datetime").property("value");
    console.log(inputValue);
    //console.log(sightings);

    // filter the data
    var filteredData = sightings.filter(details => details.datetime === inputValue);
    console.log(filteredData);

    // display the filtered data to the DOM
    filteredData.forEach((details) => {
        var row = tbody.append("tr");

        Object.entries(details).forEach(([key, value]) => {
            //console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        });
    });
};