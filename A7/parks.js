var map = L.map('map').setView([38, -97], 4);

// Adding Voyager Basemap from CARTO
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 10
}).addTo(map);

var client = new carto.Client({
  apiKey: 'K5afbQLutjvTFbbQylRfZg',
  username: 'vivngo'
});

// Define National Park Boundaries
const npsBoundariesDataset = new carto.source.SQL(`
  SELECT *
	FROM nps_boundary
	WHERE unit_type = 'National Park'
	OR unit_type = 'National Seashore'
`);
const npsBoundariesStyle = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #3E8D53;
    polygon-opacity: 0.6;
    ::outline {
      line-width: 0;
      line-color: #FFFFFF;
      line-opacity: 0.5;
    }
  }
`);
const npsBoundaries = new carto.layer.Layer(npsBoundariesDataset, npsBoundariesStyle, {
  featureOverColumns: ['unit_name']
});

// Define Nonattainment Areas
const nonattainmentDataset = new carto.source.Dataset(`
  ozone_8hr_2008std_naa
`);
const nonattainmentStyle = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #162945;
    polygon-opacity: 0.6;
    ::outline {
      line-width: 0;
      line-color: #FFFFFF;
      line-opacity: 0.5;
    }
  }
`);
const nonattainment = new carto.layer.Layer(nonattainmentDataset, nonattainmentStyle);

// Define National Park centroids
const npsCentroidsDataset = new carto.source.SQL(`
  SELECT *
  FROM nps_centroids_with_exceedence_days_2017
  WHERE ozone_exceed_days_2017 IS NOT null
`);
// 	OR unit_type = 'National Seashore'
// `);
const npsCentroidsStyle = new carto.style.CartoCSS(`
  #layer {
    marker-width: 7;
    marker-fill: #FF583E;
    marker-fill-opacity: 1;
    marker-line-width: 0.5;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
    marker-type: ellipse;
    marker-allow-overlap: false;
  }
  #layer [ozone_exceed_days_2017 <= 80] {   // 40-80
    marker-width: 40;
    marker-fill: #6B3E31;
  }
  #layer [ozone_exceed_days_2017 <= 40] {   // 21-40
    marker-width: 35;
    marker-fill: #C2573B;
  }
  #layer [ozone_exceed_days_2017 <= 20] {   // 11-20
    marker-width: 30;
    marker-fill: #DD814E;
  }
  #layer [ozone_exceed_days_2017 <= 10] {   // 5-10
    marker-width: 25;
    marker-fill: #EBB266;
  }
  #layer [ozone_exceed_days_2017 <= 4] {   // 1-4
    marker-width: 18;
    marker-fill: #FBE581;
  }
  #layer::labels {
    text-name: [ozone_exceed_days_2017];
    text-face-name: 'DejaVu Sans Book';
    text-size: 10;
    text-label-position-tolerance: 10;
    text-fill: #000;
    text-dy: 0;
    text-allow-overlap: true;
    text-placement: interior;
    text-placement-type: simple;
  }
  #layer [ozone_exceed_days_2017 > 40] ::labels {
    text-fill: #FFFFFF;
  }
`);
const npsCentroids = new carto.layer.Layer(npsCentroidsDataset, npsCentroidsStyle, {
  featureOverColumns: ['unit_name']
});

// Add layers to map
client.addLayers([npsBoundaries, nonattainment, npsCentroids]);
// client.addLayers([npsBoundaries, nonattainment]);
client.getLeafletLayer().addTo(map);

// Create popup when hovering over centroids
const popup = L.popup({ closeButton: false });
npsCentroids.on(carto.layer.events.FEATURE_OVER, featureEvent => {
  popup.setLatLng(featureEvent.latLng);
  if (!popup.isOpen()) {
    popup.setContent(featureEvent.data['unit_name']);
    popup.openOn(map);
  }
});
npsCentroids.on(carto.layer.events.FEATURE_OUT, featureEvent => {
  popup.removeFrom(map);
});
// Create a popup when hovering inside park boundaries
const popup2 = L.popup({ closeButton: false });
npsBoundaries.on(carto.layer.events.FEATURE_OVER, featureEvent => {
  popup2.setLatLng(featureEvent.latLng);
  if (!popup.isOpen()) {
    popup2.setContent(featureEvent.data['unit_name']);
    popup2.openOn(map);
  }
});
npsBoundaries.on(carto.layer.events.FEATURE_OUT, featureEvent => {
  popup2.removeFrom(map);
});

console.log('Finished');
