
// Set up chart parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
// Append an SVG group that will hold our chart
// Shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data and format to numerical values
d3.csv("assets/data/data.csv").then(function(smokerData) {

    smokerData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
      // console.log(data);
    })

    // Create Scales
    const xScale = d3.scaleLinear()
    .domain(d3.extent(smokerData, d => d.age))
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0,d3.max(smokerData, d => d.smokes)])
    .range([height, 0]);

    // Create axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Append axes to chartGroup
    // x axis(bottom)
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    // y axis(left)
    chartGroup.append("g").call(leftAxis);
    

});