
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

    // Create circles for scatter plot
    chartGroup.selectAll("circle")
    .data(smokerData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.smokes))
    .attr("r", "10")
    .attr("stroke-width", "1")
    .attr("fill", "blue")
    .attr("opacity", 0.80);

    // Add labels and titles
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text("Average Age");

    chartGroup.append("text")
    .attr("y", 0 - (margin.left))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90)")
    .text("Smokers (%)");

    // Add text to each circle for state abbr
    chartGroup.append("g")
    .selectAll('text')
    .data(smokerData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.age))
    .attr("y", d => yScale(d.smokes))
    .classed(".stateText", true)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "12px")
    .style("font-weight", "bold");
}).catch(function(error) {
    console.log(error);
});
  