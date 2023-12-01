/** 
icons are taken from the leaflet-color-markers project:
https://github.com/pointhi/leaflet-color-markers
Copyright (c) 2010-2019, Vladimir Agafonkin
Copyright (c) 2010-2011, CloudMade
Copyright (c) 2013-2020, Thomas Pointhuber
All rights reserved. */
/** refactored code to be shorter */

function createIcon(color) {
  return new L.Icon({
    iconUrl: `./leaflet-color-markers/marker-icon-2x-${color}.png`,
    shadowUrl: "./leaflet-color-markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

var blueIcon = createIcon("blue");
var goldIcon = createIcon("gold");
var redIcon = createIcon("red");
var greenIcon = createIcon("green");
var orangeIcon = createIcon("orange");
var yellowIcon = createIcon("yellow");
var violetIcon = createIcon("violet");
var greyIcon = createIcon("grey");
var blackIcon = createIcon("black");
