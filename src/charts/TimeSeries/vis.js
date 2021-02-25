import * as d3 from "d3";
import "./style.css";

const draw = (props) => {
  d3.select(".vis-down > *").remove();
  if (props.dataVis.data.length) {
    let margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
      .scaleTime()
      .domain(d3.extent(cols).map((d) => Number(d)))
      .range([margin.left, width - margin.right]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


    for(let i=0;i<visData.length;i++){
      let ds = visData[i]
      let min = d3.min(ds.values, function(d) { return +d.value; });
      let max = d3.max(ds.values, function(d) { return +d.value; });
      let y = d3.scaleLinear().domain([min, max]).range([ height, 0 ]);
      console.log(min,max,ds);
      svg
      .append("path")
      .datum(ds.values)
      .attr("class",ds.name)
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
    }
    



    // visData.forEach(function (d) {
      // let min = d3.min(d, function (ds) {
      //   return ds.value;
      // });
      // let max = d3.max(d, function (ds) {
      //   return ds.value;
      // });
    //   let y = d3
    //     .scaleLinear()
    //     .domain([min, max])
    //     .range([height - margin.bottom, margin.top]);

      
    // });

    // data.forEach(
    //   function(d){
    //     let visData=[]
    //     for(let i = 0; i < data.length; i++){

    //     }

    //     svg.append("path")
    //     .datum(d)
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("d", d3.line()
    //       .x(function(d) { return x(d.cols) })
    //       .y(function(d) { return y(d.value) })
    //       )
    //   });

    // let min = d3.min(data, function (d) {
    //   return d.value;
    // });
    // let max = d3.max(data, function (d) {
    //   return d.value;
    // });
    // let absMax = Math.max(Math.abs(min), Math.abs(max));

    // let x = d3
    //   .scaleBand()
    //   .domain(cols)
    //   .range([margin.left, width - margin.right])
    //   .padding(0.1);

    // let y = d3
    //   .scaleBand()
    //   .domain(nameList)
    //   .rangeRound([margin.top, height - margin.bottom])
    //   .padding(0.1);

    // svg
    //   .append("g")
    //   .selectAll("rect")
    //   .data(data)
    //   .join("rect")
    //   .attr("x", function (d) {
    //     return x(Math.min(0, d.value));
    //   })
    //   .attr("y", (d) => y(d.name))
    //   .attr("width", (d) => Math.abs(x(d.value) - x(0)))
    //   .attr("height", y.bandwidth())
    //   .style("fill", (d) => (d.value > 0 ? "#92C5DE" : "#F4A582"));

    // svg
    //   .append("g")
    //   .selectAll("text")
    //   .data(data)
    //   .join("text")
    //   .attr("class", "variableName")
    //   .attr("x", 0 - margin.left)
    //   .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
    //   .text((d) => String(d.name));

    // let xAxis = (g) =>
    //   g
    //     .attr("transform", `translate(0,${margin.top / 10})`)
    //     .call(
    //       d3
    //         .axisTop(x)
    //         .ticks(width / 80)
    //         .tickSizeOuter(0)
    //     )
    //     .call((g) => g.select(".domain").remove());

    // svg.append("g").call(xAxis);
  }
};

export default draw;
