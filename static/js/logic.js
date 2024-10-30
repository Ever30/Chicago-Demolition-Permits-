// Function to create a map with demolition permits data
function createMap(demolitionLayer, heatLayer, markerCluster) {
  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the demolitionLayer, heatLayer, and markerCluster.
  let overlayMaps = {
    "Demolition Permits": demolitionLayer,
    "Heatmap": heatLayer,
    "Marker Cluster": markerCluster
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [41.8781, -87.6298], // Chicago's coordinates
    zoom: 12,
    layers: [streetmap, demolitionLayer, heatLayer, markerCluster]
  });

  // Add layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

// Function to create markers for demolition permits
function createMarkers(response) {
  // Initialize arrays to hold demolition markers and coordinates for the heatmap.
  let demolitionMarkers = [];
  let heatArray = [];
  let legends = {};
  let contact2Counts = {};

  // Initialize a MarkerClusterGroup to hold demolition markers.
  let markerCluster = L.markerClusterGroup();

  // Loop through the response array.
  response.forEach(demolition => {
    let latitude = parseFloat(demolition.latitude);
    let longitude = parseFloat(demolition.longitude);
    let contractorName = demolition.contact_1_name;
    let contractorName2 = demolition.contact_2_name;

    // Check if latitude and longitude are valid numbers.
    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Create a marker for each demolition permit using valid coordinates.
      let demolitionMarker = L.marker([latitude, longitude])
        .bindPopup(`
          <h3>Location: ${demolition.street_number} ${demolition.street_direction} ${demolition.street_name}</h3>
          <p>Permit Type: ${demolition.permit_type}</p>
          <p>Permit Type: ${demolition.work_description}</p>
          <p>Contractor 1: ${contractorName}</p>
        `);

      // Add the marker to the demolitionMarkers array.
      demolitionMarkers.push(demolitionMarker);

      // Add coordinates to heatArray for heatmap (optional if needed).
      heatArray.push([latitude, longitude]);

      // Add the marker to the markerCluster.
      markerCluster.addLayer(demolitionMarker);

      // Update legend data by contact_1_name (contractor)
      if (!legends[contractorName]) {
        let color = '#000000'; // Assign a color (optional)
        legends[contractorName] = {
          color: color,
          count: 1
        };
      } else {
        legends[contractorName].count++;
      }

      // Update contact2Counts by contact_2_name
      if (contractorName2) {
        if (!contact2Counts[contractorName2]) {
          contact2Counts[contractorName2] = 1;
        } else {
          contact2Counts[contractorName2]++;
        }
      }
    }
  });

  // Create a layer group from demolitionMarkers array.
  let demolitionLayer = L.layerGroup(demolitionMarkers);

  // Create a heatmap layer from heatArray (optional).
  let heatLayer = L.heatLayer(heatArray, { radius: 50, blur: 50 });

  // Create a map with demolitionLayer, heatLayer, and markerCluster.
  createMap(demolitionLayer, heatLayer, markerCluster);
}

// Perform an API call to get the demolition permit information and create markers.
d3.json("https://data.cityofchicago.org/resource/e4xk-pud8.json")
  .then(createMarkers);







