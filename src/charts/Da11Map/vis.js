import * as d3 from "d3";
import { message } from "antd";

import OSM from "ol/source/OSM";
import { Map, View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Tile, VectorImage } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill } from "ol/style";

import LayerSwitcher from "ol-layerswitcher";
import "./ol-layerswitcher.css";

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
      zoom: 12,
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
      url: "./geodata/QuangNinhBoundry.json",
      format: new GeoJSON(),
    }),
    visible: true,
    title: "QuangNinh Boundry",
    style: new Style({
      stroke: strokeStyle,
    }),
  });

  map.addLayer(QuangNinh);
  if (props.dataVis.data.length) {
    const viewVar = props.dataVis.viewVar.toString(),
      data = props.dataVis.data;
    const viewObj = data.filter((d) => d.key.toString() === viewVar)[0];

    if (viewObj.geodata) {
      viewObj.geodata.forEach((d) => {
        map.addLayer(
          new VectorLayer({
            source: new VectorSource({
              url: d.geourl,
              format: new GeoJSON(),
            }),
            visible: true,
            title: d.title,
            style: new Style({
              fill: new Fill({
                color: d.color,
              }),
            }),
          })
        );
      });
    } else {
      message.info(`No geo-spatial data for ${viewObj.name}.`);
    }
  }

  var layerSwitcher = new LayerSwitcher();
  map.addControl(layerSwitcher);
};

export default draw;
