import * as d3 from "d3";
import "./style.css";

const draw = (props) => {
  d3.select(".vis-down > *").remove();
  if (props.dataVis.data.length) {
    let margin = { top: 20, right: 20, bottom: 30, left: 100 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    const viewVar = props.dataVis.viewVar.toString(),
      data = props.dataVis.data,
      cols = props.dataVis.cols;

    let visData = data.map(function (ds) {
      return {
        name: ds.Indicator,
        values: cols.map(function (d) {
          return {
            yr: d,
            value: +ds[d],
          };
        }),
      };
    });

    const viewObj = data.filter((d) => d.key.toString() === viewVar)[0];

    let nameList = data.map((d) => d.Indicator);
    nameList = nameList.filter((item) => item !== viewObj.Indicator);
    nameList.unshift(viewObj.Indicator);

    let svg = d3
      .select(".vis-down")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scalePoint()
      .domain(cols)
      .range([0, width-10]);


    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    for (let i = 0; i < visData.length; i++) {
      let ds = visData[i];
      let min = d3.min(ds.values, function (d) {
        return +d.value;
      });
      let max = d3.max(ds.values, function (d) {
        return +d.value;
      });
      let y = d3.scaleLinear().domain([min, max]).range([height, 0]);

      svg
        .append("path")
        .datum(ds.values)
        .attr("class", ds.name)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.yr);
            })
            .y(function (d) {
              return y(d.value);
            })
        );

      svg
        .selectAll("myCircles")
        .data(ds.values)
        .enter()
        .append("circle")
        .attr("fill", "blue")
        .attr("stroke", "blue")
        .attr("cx", function (d) {
          return x(d.yr);
        })
        .attr("cy", function (d) {
          return y(d.value);
        })
        .attr("r", 5);
    }
  }
};

export default draw;
