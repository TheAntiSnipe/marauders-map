let stringOfCoordinates = '';
// Has a string formatted in a way that you can copy-paste it directly from console to coordinates.js
// so that new variables can be added flexibly. Dev feature, pretty useless to end user though.
import { teleporterLocations,statueOfSevenLocations } from './coordinates.js'

const displaySprite = (iconData,coordinateList) => {
  for (let i of coordinateList) {
    addMarker(iconData,...i);
  }
} 

const addMarker = (iconData,x,y) => {
    if(iconData=='') {
      const coordinates = `[${x},${y}],`
      stringOfCoordinates+=coordinates;
      console.log(stringOfCoordinates);
      L.marker([x,y]).addTo(map);
    }
    else {
      L.marker([x,y],{icon:iconData}).addTo(map);
    }
}

const positionHandler = (MouseEvent) => {
  const x = MouseEvent.latlng.lat;
  const y = MouseEvent.latlng.lng;
  const markerSet = confirm("Add this marker?");
  if(markerSet) {
    addMarker('',x,y);
  } else {
    return;
  }
}

const map = L.map('mapid', {
  minZoom: 1,
  maxZoom: 4,
  center: [0, 0],
  zoom: 1,
  crs: L.CRS.Simple,
});

// dimensions of the image
const width = 5120;
const height = 5120;
const url = '../python-scripts/final-merged-map.jpg';

// calculate the edges of the image, in coordinate space
const southWest = map.unproject([0, height], map.getMaxZoom() - 1);
const northEast = map.unproject([width, 0], map.getMaxZoom() - 1);
// console.log(southWest,northEast)
const bounds = new L.LatLngBounds(southWest, northEast);

// add the image overlay, 
// so that it covers the entire map
L.imageOverlay(url, bounds).addTo(map);

// tell leaflet that the map is exactly as big as the image
map.setMaxBounds(bounds);
const customIcon = L.Icon.extend({
  options: {
    iconSize:[30,30],
    iconAnchor:[0,0],
    popupAnchor:[0,0]
  }
});

const teleporterIcon = new customIcon({iconUrl: '../marker-asset-files/marker-teleport.png'})
const SoSIcon = new customIcon({iconUrl: '../marker-asset-files/marker-SoS.png'})
displaySprite(teleporterIcon,teleporterLocations);
displaySprite(SoSIcon,statueOfSevenLocations);

map.on('click',positionHandler)
