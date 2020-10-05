import * as d3 from "d3";
import data from "../../data";
import "./style.css";

const draw = (props) => {
  d3.select(".vis-down > *").remove();
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  const base = props.dataVis.comparedYr.toString(),
    current = props.dataVis.currentYr.toString(),
    viewVar = props.dataVis.viewVar.toString(),
    dataRaw = props.dataVis.data;

  const calIncrease = (d) => {
    return (d[current] - d[base]) / d[base];
  };
  let dataV = dataRaw.map(calIncrease);
  
  let d = dataRaw[0];
  if (d) {
    console.log(dataV);
  }

  let svg = d3
    .select(".vis-down")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3
    .scaleLinear()
    .domain([45, d3.max(data, (d) => Math.abs(d.value))])
    .range([margin.left + 200, width - margin.right]);

  let y = d3
    .scaleBand()
    //.domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", function (d) {
      return x(Math.min(45, d.value));
    })
    .attr("y", (d, i) => y(i))
    .attr("width", (d) => Math.abs(x(d.value) - x(45)))
    .attr("height", y.bandwidth())
    .style("fill", (d) => (d.value > 45 ? "green" : "red"));

  svg
    .append("g")
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("class", "variableName")
    .attr("x", margin.left)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .text((d) => String(d.year));
};

export default draw;
