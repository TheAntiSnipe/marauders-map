let stringOfCoordinates = '';
import { teleporterLocations } from './coordinates.js'

const displaySprite = (iconData,coordinateList) => {
  for (let i of coordinateList) {
    addMarker(iconData,...i);
  }
} 

const addMarker = (iconData = '',x,y) => {
    if(!iconData) {
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
    addMarker(x,y);
  } else {
    return;
  }
}

var map = L.map('mapid', {
  minZoom: 1,
  maxZoom: 4,
  center: [0, 0],
  zoom: 1,
  crs: L.CRS.Simple,
});

// dimensions of the image
var w = 5120,
  h = 5120,
  url = '../python-scripts/final-merged-map.jpg';

// calculate the edges of the image, in coordinate space
var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
// console.log(southWest,northEast)
var bounds = new L.LatLngBounds(southWest, northEast);

// add the image overlay, 
// so that it covers the entire map
L.imageOverlay(url, bounds).addTo(map);

// tell leaflet that the map is exactly as big as the image
map.setMaxBounds(bounds);
const iconData = L.icon(
  {
    iconUrl: '../marker-asset-files/marker-teleport.png',
    iconSize:[30,30],
    iconAnchor:[0,0],
    popupAnchor:[0,0]
  }
);
displaySprite(iconData,teleporterLocations);

map.on('click',positionHandler)
