import { teleporterLocations, statueOfSevenLocations } from "./coordinates.js";
//This imports all the coordinate data from the specifically made file coordinates.js. 
//Since there's a lot of coordinates, I decided to use this approach to make the code look cleaner.


// Renders a marker with a certain image icon to the image.
// If that payload is empty (dev functionality), it simply
// logs the position of the click using console.log.
// This is used when we are looking to add coordinates to
// coordinates.js.
const addMarker = (x, y, iconData = "") => {
  if (iconData == "") {
    console.log(x, y);
    const coordinates = `[${x},${y}],`;
    stringOfCoordinates += coordinates;
    console.log(stringOfCoordinates);
    L.marker([x, y]).addTo(map);
  } else {
    L.marker([x, y], { icon: iconData }).addTo(map);
  }
};

//Gets a mouse event and runs addMarker with default parameters over it.
const positionHandler = (MouseEvent) => {
  window.stringOfCoordinates = "";
  const x = MouseEvent.latlng.lat;
  const y = MouseEvent.latlng.lng;
  const markerSet = confirm("Add this marker?");
  if (markerSet) {
    addMarker(x, y);
  } else {
    return;
  }
};

//Creates a custom icon object using the iconUrl and sends it to addMarker
const renderCustomIcon = (iconUrl, locationData) => {
  const customIcon = L.Icon.extend({
    options: {
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, 0],
    },
  });
  const iconToBeRendered = new customIcon({ iconUrl });
  locationData.forEach((element) => addMarker(...element, iconToBeRendered));
};

// Generates a map object, assigns it to window so that it's globally accessible, 
// then defines all of its properties. Called by buildEnvironment.
const initializeMap = () => {
  window.map = L.map("mapid", {
    minZoom: 2,
    maxZoom: 4,
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
  });
  // dimensions of the image
  const width = 5120;
  const height = 5120;
  const url = "../python-scripts/final-merged-map.jpg";
  // calculate the edges of the image, in coordinate space
  const southWest = map.unproject([0, height], map.getMaxZoom() - 1);
  const northEast = map.unproject([width, 0], map.getMaxZoom() - 1);
  const bounds = new L.LatLngBounds(southWest, northEast);
  // add the image overlay,
  // so that it covers the entire map
  L.imageOverlay(url, bounds).addTo(map);
  // tell leaflet that the map is exactly as big as the image
  map.setMaxBounds(bounds);
};

//First calls initializeMap, then runs the renderCustomIcon function 
// for each icon to be rendered. Also adds a click listener with 
// positionHandler as a callback.
const buildEnvironment = () => {
  initializeMap();
  renderCustomIcon("../marker-asset-files/teleport.png", teleporterLocations);
  renderCustomIcon("../marker-asset-files/sos.png", statueOfSevenLocations);
  map.on("click", positionHandler);
};


buildEnvironment();
