// @TODO: YOUR CODE HERE!
const svgwidth = 960;
const svgheight = 500;


// assigns margins for the graph on the page
var margin = {top: 20,
  right: 40,
  bottom: 60,
  left: 100};
// set up the height width and margins 
var width = svgwidth - margin.left - margin.right;
var height = svgheight - margin.top - margin.bottom;

// sets up the chart into the SVG group and 
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgwidth)
  .attr("height", svgheight);

var chartdata = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// imports the data 
d3.csv("assets/data/data.csv").then(function(data) {
  console.log('works');
//   runs through the data and maps the data to the label 
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
// set up the x axis 
    var x = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)])
      .range([0, width]);
//  set up the y axis 
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);
    var bottom = d3.axisBottom(x);
    var left = d3.axisLeft(y);
    // add the axis onto the chart 
    chartdata.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottom);

    chartdata.append("g")
      .call(left);
// add the dots onto the graph 
    var dots = chartdata.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.poverty))
    .attr("cy", d => y(d.healthcare))
    .attr("r", "9");
  });