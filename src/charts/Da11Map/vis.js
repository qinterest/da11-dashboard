import * as d3 from "d3";

import OSM from "ol/source/OSM";
import { Map, View } from "ol";
import { Vector as VectorLayer } from 'ol/layer';
import { Tile, VectorImage } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill } from "ol/style";


const draw = (props) => {
  d3.select(".map > *").remove();
  let map = new Map({
    target: "map",
    layers: [
      new Tile({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([107.25, 21]),
      zoom: 10,
    }),
  });

  const strokeStyle = new Stroke({
    color: [30, 30, 31, 1],
    width: 1.2,
    lineCap: "square",
    lineJoin: "bevel",
    lineDash: [1, 1],
  });

  const QuangNinh = new VectorLayer({
    source: new VectorSource({
      url: "./QuangNinhMap.json",
      format: new GeoJSON(),
    }),
    visible: true,
    title: "QuangNinh",
    style: new Style({
      stroke: strokeStyle,
    }),
  });

  map.addLayer(QuangNinh);
};

export default draw;
