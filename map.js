mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl472gan5004z14qtaf6czvgd',
    maxZoom: 9,
    minZoom: 3.7,
    center: [-94, 38.7],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

map.on("load", function () {
    map.addLayer(
        {
          id: "state_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/statefinal.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 1.5,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );
  map.addLayer(
    {
      id: "counties_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countytype2.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Farming",
          "#9AB988",
          "Nonspecialized",
          "#BDC2A9",
          "Manufacturing",
          "#E8A97E",
          "Recreation",
          "#ECD099",
          "Federal\/State Government",
          "#EA8379",
          "Mining",
          "#A17F96",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
        "fill-opacity": [
          "match",
          ["get", "sum"],
          0, 0.14,
          1, 0.28,
          2, 0.42,
          3, 0.56,
          4, 0.7,
          5, 0.84,
          6, 0.98,
          0.1
        ]
      },
    },
    "state_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

map.on("click", "state_fill", function (e) {
  var stateName = e.features[0].properties.STATE_NAME; 
  var economictype = e.features[0].properties.Economic_Type_Label;
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
      stateName + 
        "</h4>" +
        "<h2>" +
        economictype +
        "</h2>" +
        "<p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "state_fill", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "state_fill", function () {
  map.getCanvas().style.cursor = "";
});

map.on("click", "counties_fill", function (e) {
  var stateName1 = e.features[0].properties.State; 
  var countyName = e.features[0].properties.County_name;
  var economictype1 = e.features[0].properties.Economic_Type_Label;
  var EconomicType = e.features[0].properties.Economic_Type_Label;
  var Sum = e.features[0].properties.sum;
  var Ed = e.features[0].properties['Low Education'];
  var Em = e.features[0].properties['Low Employment'];
  var Pop = e.features[0].properties['Population Loss'];
  var Ret = e.features[0].properties['Retirement Destination'];
  var Pp = e.features[0].properties['Persistent Poverty'];
  var Pcp = e.features[0].properties['Persistent Child Poverty'];
  stateName1 = stateName1.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
      countyName + ", " + stateName1 +
        "</h4>" +
        "<h2>" +
        economictype1 +
        "</h2>"
        +'<p>' + Ed + '</p>'
        +'<p>' + Em + '</p>'
        +'<p>' + Pop + '</p>'
        +'<p>' + Ret + '</p>'
        +'<p>' + Pp + '</p>'
        +'<p>' + Pcp + '</p>'
    )
    .addTo(map);
});
map.on("mouseenter", "counties_fill", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "counties_fill", function () {
  map.getCanvas().style.cursor = "";
});

