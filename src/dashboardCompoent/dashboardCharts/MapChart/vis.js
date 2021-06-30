import * as d3 from "d3";

import { XYZ } from "ol/source";
import { Map, View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Tile } from "ol/layer";
import { TileArcGISRest } from "ol/source";

import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill } from "ol/style";

import LayerSwitcher from "ol-layerswitcher";
import "./ol-layerswitcher.css";

const unclearmap = new Tile({
  source: new TileArcGISRest({
    url: "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer/export",
    params: {
      bbox: "-2.0037507067161843E7,-3.0240971958386146E7,2.0037507067161843E7,3.024097195838615E7",
      // "bbSR":" 102100",
      // "layers":"show:89,100",
      dpi: "600",
    },
  }),
  title: "UN clear map",
});

const satellite = new Tile({
  source: new XYZ({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom: 23,
  }),
  visible: false,
  title: "Satellite",
});

const draw = (props) => {
  d3.select(".map > *").remove();
  let map = new Map({
    target: "map",
    layers: [unclearmap],
    view: new View({
      center: fromLonLat([107.25, 21]),
      zoom: 6,
    }),
  });

  map.addLayer(satellite);

  if (props.geodata) {
    let gd = props.geodata;
    gd.forEach((d) => {
      let dStyle = new Style();
      if (d.fillcolor) {
        dStyle.fill_ = new Fill({ color: d.fillcolor });
      }
      if (d.strokecolor) {
        let strokeStyle = new Stroke({
          color: d.strokecolor,
          width: 1.2,
          lineCap: "square",
          lineJoin: "bevel",
          lineDash: [1, 1],
        });
        dStyle.stroke_ = strokeStyle;
      }

      let gSource = new VectorSource({
        url: d.geourl,
        format: new GeoJSON(),
      });
      map.addLayer(
        new VectorLayer({
          source: gSource,
          visible: true,
          title: d.title,
          style: dStyle,
        })
      );
    });
  }

  if (props.geofile) {
    props.geofile.forEach((gf) => {
      let gurl = gf.url;
      let gtitle = gf.name;
      let gSource = new VectorSource({
        url: gurl,
        format: new GeoJSON(),
      });
      map.addLayer(
        new VectorLayer({
          source: gSource,
          visible: true,
          title: gtitle,
        })
      );
    });
  }

  // if (props.geofile){
  //   props.geofile.forEach(
  //     gf => {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(gf)
  //       console.log(gf)
  //     }
  //   )
  //   // props.geofile.forEach(gf => {
  //   // let reader = new FileReader();
  //   // reader.readAsDataURL(gf.originFileObj);
  //   // reader.onload = () => {
  //   //   let title = gf.name;
  //   //   let gfurl = reader.result
  //   //   let gSource = new VectorSource({
  //   //         url: gfurl,
  //   //         format: new GeoJSON(),
  //   //         });
  //   //         map.addLayer(
  //   //           new VectorLayer({
  //   //             source: gSource,
  //   //             visible: true,
  //   //             title: title,
  //   //           })
  //   //         );
  //   // };
  //   // });
  // }

  let layerSwitcher = new LayerSwitcher();
  map.addControl(layerSwitcher);
};

export default draw;
