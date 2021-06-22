import * as d3 from "d3";
import { message } from "antd";

import { OSM, XYZ } from "ol/source";
import { Map, View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Tile, Image } from "ol/layer";
import { TileWMS, TileArcGISRest, ImageArcGISRest } from "ol/source";

import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill, Icon } from "ol/style";

import LayerSwitcher from "ol-layerswitcher";
import "./ol-layerswitcher.css";

//#FIXME:ADD seagrass

// const unclearmap = new Tile({
//   extent: [-13884991, 2870341, -7455066, 6338219],
//   source: new TileWMS({
//     url: 'https://ahocevar.com/geoserver/wms',
//     params: {
//       'LAYERS': 'topp:states',
//       'TILED': true
//     },
//     serverType: 'geoserver',
//     // Countries have transparency, so do not fade tiles:
//     transition: 0,
//   })
// })

const unclearmap = new Tile({
  source: new TileArcGISRest({
    url:
      "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer/export",
    params: {
      bbox:
        "-2.0037507067161843E7,-3.0240971958386146E7,2.0037507067161843E7,3.024097195838615E7",
      // "bbSR":" 102100",
      // "layers":"show:89,100",
      dpi: "600",
    },
  }),
  title:"UN clear map"
});

const satellite = new Tile({
  source: new XYZ({
    // attributions: ['Powered by Esri',
    //                'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
    // attributionsCollapsible: true,
    url:
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom: 23,
  }),
  visible: false,
  title:"Satellite"
});

const draw = (props) => {
  d3.select(".map > *").remove();
  let map = new Map({
    target: "map",
    layers: [
      unclearmap
    ],
    view: new View({
      center: fromLonLat([107.25, 21]),
      zoom: 6,
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
  map.addLayer(satellite);
  map.addLayer(QuangNinh);
  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        url: "./geodata/mangroves-2015.geojson",
        format: new GeoJSON(),
      }),
      visible: true,
      title: "mangrovesSHP",
      style: new Style({
        fill: new Fill({
          color: "#ffffbf",
        }),
      }),
    })
  );


  // if (props.dataVis.data) {
  //   const viewVar = props.dataVis.viewVar.toString(),
  //     data = props.dataVis.data;
  //   const viewObj = data.filter((d) => d.key.toString() === viewVar)[0];

  //   if (viewObj.geodata) {
  //     viewObj.geodata.forEach((d) => {
  //       if (d.image) {
  //         const icon = new Icon(d.image);
  //         map.addLayer(
  //           new VectorLayer({
  //             source: new VectorSource({
  //               url: d.geourl,
  //               format: new GeoJSON(),
  //             }),
  //             visible: true,
  //             title: d.title,
  //             style: new Style({
  //               fill: new Fill({
  //                 color: d.color,
  //                 image: icon,
  //               }),
  //             }),
  //           })
  //         );
  //       } else {
  //         map.addLayer(
  //           new VectorLayer({
  //             source: new VectorSource({
  //               url: d.geourl,
  //               format: new GeoJSON(),
  //             }),
  //             visible: true,
  //             title: d.title,
  //             style: new Style({
  //               fill: new Fill({
  //                 color: d.color,
  //               }),
  //             }),
  //           })
  //         );
  //       }
  //     });
  //   } else {
  //     message.info(`No geo-spatial data for ${viewObj.name}.`);
  //   }
  // }

  var layerSwitcher = new LayerSwitcher();
  map.addControl(layerSwitcher);
};

export default draw;
