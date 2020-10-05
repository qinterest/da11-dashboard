import * as d3 from "d3";
import "./style.css";

const draw = (props) => {
  d3.select(".vis-down > *").remove();
  if (props.dataVis.data.length) {
    let margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    const base = props.dataVis.comparedYr.toString(),
      current = props.dataVis.currentYr.toString(),
      viewVar = props.dataVis.viewVar.toString(),
      data = props.dataVis.data;

    data.forEach(function (d) {
      d.value = (d[current] - d[base]) / d[base];
      d.signs = d.value > 0 ? "pos" : "neg";
    });

    const viewObj = data.filter((d) => d.key.toString() === viewVar)[0];

    let nameList = data.map((d) => d.name);
    nameList = nameList.filter((item) => item !== viewObj.name);
    nameList.unshift(viewObj.name);

    if (nameList) {
      console.log(nameList);
    }

    let svg = d3
      .select(".vis-down")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let min = d3.min(data, function (d) {
      return d.value;
    });
    let max = d3.max(data, function (d) {
      return d.value;
    });
    let absMax = Math.max(Math.abs(min), Math.abs(max));

    let x = d3
      .scaleLinear()
      .domain([-absMax, absMax])
      .range([margin.left, width - margin.right]);

    let y = d3
      .scaleBand()
      .domain(nameList)
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", function (d) {
        return x(Math.min(0, d.value));
      })
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth())
      .style("fill", (d) => (d.value > 0 ? "#92C5DE" : "#F4A582"));

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "variableName")
      .attr("x", 0 - margin.left)
      .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
      .text((d) => String(d.name));

    let xAxis = (g) =>
      g
        .attr("transform", `translate(0,${margin.top/10})`)
        .call(
          d3
            .axisTop(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        )
        .call((g) => g.select(".domain").remove());

    svg.append("g").call(xAxis);
  }
};

export default draw;
