# marauders-map

 A custom, non-geographical map for Genshin Impact.

 This is mainly a project to test my proficiency with JavaScript. The goal is to create a map that has only the most important information, instead of all the information. If you want cor lapis, it won't show you all the places that have it; It'll show you the best places that have it, places with high ore concentrations located close to teleporters. Enjoy!

# Files and folders:

`marauder.js` contains the code used to render the webpage. Leaflet.js is the open-source library I used in order to render and manipulate the map, you can download it [here](https://leafletjs.com/download.html) or use npm (`npm install leaflet`).

`map.html` is the webpage skeleton. 

`marker-asset-files` is unused for now, but will eventually contain all the marker assets used on the webpage.

`python-scripts` contains the scripts I used to get the map itself:

-   `tile-collection.py` is the first file to be run. You'll need to install wget with `pip install wget` in order to run this file. It downloads each individual file. I scraped files from [this website's assets](https://genshin-impact-map.appsample.com/#/), special thanks to them.
-   `map-merge.py` contains the code used in order to render the tiles into one single cohesive map. Requires two libraries: Pillow (`pip install Pillow`) and numpy (`pip install numpy`).
-   `leaflet-compliant-coordinates.py` is another experimental feature. I initially wanted to use tileLayer functionality, but could not get the zoom functionality to work. If you want to take a crack at it, this code helps convert the tile coordinates from Cartesian to the inverted-y-axis Cartesian that Leaflet uses.
