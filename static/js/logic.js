


// // Function to create a map with demolition permits data
// function createMap(demolitionLayer, heatLayer, markerCluster, legends) {
//   // Create the tile layer that will be the background of our map.
//   let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });

//   // Create a baseMaps object to hold the streetmap layer.
//   let baseMaps = {
//     "Street Map": streetmap
//   };

//   // Create an overlayMaps object to hold the demolitionLayer, heatLayer, and markerCluster.
//   let overlayMaps = {
//     "Demolition Permits": demolitionLayer,
//     "Heatmap": heatLayer,
//     "Marker Cluster": markerCluster
//   };

//   // Create the map object with options.
//   let map = L.map("map-id", {
//     center: [41.8781, -87.6298], // Chicago's coordinates
//     zoom: 12,
//     layers: [streetmap, demolitionLayer, heatLayer, markerCluster]
//   });

//   // Add layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);

//   // Create a legend control
//   let legend = createLegendControl(legends);
//   legend.addTo(map);
// }

// // Function to create a legend control
// function createLegendControl(legends) {
//   let legend = L.control({
//     position: 'bottomright'
//   });

//   legend.onAdd = function(map) {
//     let div = L.DomUtil.create('div', 'info legend');
//     div.style.backgroundColor = 'rgba(255, 255, 255, .7)';
//     div.style.padding = '10px';
//     div.style.borderRadius = '5px';
//     div.style.maxHeight = '200px'; // Adjust as needed
//     div.style.overflowY = 'auto'; // Enable vertical scrolling if content exceeds the height

//     div.innerHTML = `<div style="font-size: 14px; margin-bottom: 5px;"><strong>Contractor Names</strong></div>`;
    
//     // Sort legends alphabetically by contractor name
//     const sortedLegends = Object.entries(legends).sort((a, b) => a[0].localeCompare(b[0]));
    
//     // Append legend items dynamically
//     sortedLegends.forEach(([contractor, { color, count }]) => {
//       div.innerHTML += `<div><span style="color:${color}">&bull;</span> ${contractor} (${count})</div>`;
//     });

//     return div;
//   };

//   return legend;
// }





// // Function to create a legend control
// function createLegendControl(legends) {
//   let legend = L.control({
//     position: 'bottomright'
//   });

//   legend.onAdd = function(map) {
//     let div = L.DomUtil.create('div', 'info legend');
//     div.style.backgroundColor = 'rgba(255, 255, 255, .7)';
//     div.style.padding = '10px';
//     div.style.borderRadius = '5px';
//     div.style.maxHeight = '200px'; // Adjust as needed
//     div.style.overflowY = 'auto'; // Enable vertical scrolling if content exceeds the height

//     div.innerHTML = `<div style="font-size: 14px; margin-bottom: 5px;"><strong>Contractor Names</strong></div>`;
    
//     // Sort legends alphabetically by contractor name
//     const sortedLegends = Object.entries(legends).sort((a, b) => a[0].localeCompare(b[0]));
    
//     // Append legend items dynamically
//     sortedLegends.forEach(([contractor, { color, count }]) => {
//       div.innerHTML += `<div><span style="color:${color}">&bull;</span> ${contractor} (${count})</div>`;
//     });

//     return div;
//   };

//   return legend;
// }




// // Function to create markers for demolition permits
// function createMarkers(response) {
//   // Initialize arrays to hold demolition markers and coordinates for the heatmap.
//   let demolitionMarkers = [];
//   let heatArray = [];
//   let legends = {};

//   // Initialize a MarkerClusterGroup to hold demolition markers.
//   let markerCluster = L.markerClusterGroup();

//   // Loop through the response array.
//   response.forEach(demolition => {
//     let latitude = parseFloat(demolition.latitude);
//     let longitude = parseFloat(demolition.longitude);
//     let contractorName = demolition.contact_1_name;
//     let contractorName2 = demolition.contact_2_name;

//     // Check if latitude and longitude are valid numbers.
//     if (!isNaN(latitude) && !isNaN(longitude)) {
//       // Create a marker for each demolition permit using valid coordinates.
//       let demolitionMarker = L.marker([latitude, longitude])
//         .bindPopup(`
//           <h3>Location: ${demolition.street_number} ${demolition.street_direction} ${demolition.street_name}</h3>
//           <p>Permit Type: ${demolition.permit_type}</p>
//           <p>Contractor 1: ${contractorName}</p>
//           <p>Contractor 2: ${contractorName2}</p>
//         `);

//       // Add the marker to the demolitionMarkers array.
//       demolitionMarkers.push(demolitionMarker);

//       // Add coordinates to heatArray for heatmap (optional if needed).
//       heatArray.push([latitude, longitude]);

//       // Add the marker to the markerCluster.
//       markerCluster.addLayer(demolitionMarker);

//       // Update legend data by contact_1_name (contractor)
//       if (!legends[contractorName]) {
//         let color = '#000000'; // Assign a color (optional)
//         legends[contractorName] = {
//           color: color,
//           count: 1
//         };
//       } else {
//         legends[contractorName].count++;
//       }
//     }
//   });

//   // Create a layer group from demolitionMarkers array.
//   let demolitionLayer = L.layerGroup(demolitionMarkers);

//   // Create a heatmap layer from heatArray (optional).
//   let heatLayer = L.heatLayer(heatArray, { radius: 50, blur: 50 });

//   // Create a map with demolitionLayer, heatLayer, and markerCluster.
//   createMap(demolitionLayer, heatLayer, markerCluster, legends);
// }

// // Perform an API call to get the demolition permit information and create markers.
// d3.json("https://data.cityofchicago.org/resource/e4xk-pud8.json")
//   .then(createMarkers);


















// Function to create a map with demolition permits data
function createMap(demolitionLayer, heatLayer, markerCluster, legends, contact2Counts) {
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

  // Add legend control to the map
  let legend = createLegendControl(legends);
  legend.addTo(map);

  // Add contact2Counts control to the bottom left
  let contact2Control = createContact2Control(contact2Counts);
  contact2Control.addTo(map);
}

// Function to create a legend control
function createLegendControl(legends) {
  let legend = L.control({
    position: 'bottomleft'
  });

  legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, .7)';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.maxHeight = '200px'; // Adjust as needed
    div.style.overflowY = 'auto'; // Enable vertical scrolling if content exceeds the height

    div.innerHTML = `<div style="font-size: 14px; margin-bottom: 5px;"><strong> First Contractor</strong></div>`;
    
    // Sort legends alphabetically by contractor name
    const sortedLegends = Object.entries(legends).sort((a, b) => a[0].localeCompare(b[0]));
    
    // Append legend items dynamically
    sortedLegends.forEach(([contractor, { color, count }]) => {
      div.innerHTML += `<div><span style="color:${color}">&bull;</span> ${contractor} (${count})</div>`;
    });

    return div;
  };

  return legend;
}

// Function to create contact2 control
function createContact2Control(contact2Counts) {
  let contact2Control = L.control({
    position: 'bottomright'
  });

  contact2Control.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info contact2');
    div.style.backgroundColor = 'rgba(255, 255, 255, .7)';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.maxHeight = '200px'; // Adjust as needed
    div.style.overflowY = 'auto'; // Enable vertical scrolling if content exceeds the height

    div.innerHTML = `<div style="font-size: 14px; margin-bottom: 5px;"><strong>Second Contractor</strong></div>`;
    
    // Sort contact2Counts alphabetically by name
    const sortedContact2Counts = Object.entries(contact2Counts).sort((a, b) => a[0].localeCompare(b[0]));
    
    // Append contact2 items dynamically
    sortedContact2Counts.forEach(([contact2Name, count]) => {
      div.innerHTML += `<div>${contact2Name} (${count})</div>`;
    });

    return div;
  };

  return contact2Control;
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
          <p>Contractor 1: ${contractorName}</p>
          <p>Contractor 2: ${contractorName2}</p>
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

  // Create a map with demolitionLayer, heatLayer, markerCluster, and contact2Counts.
  createMap(demolitionLayer, heatLayer, markerCluster, legends, contact2Counts);
}

// Perform an API call to get the demolition permit information and create markers.
d3.json("https://data.cityofchicago.org/resource/e4xk-pud8.json")
  .then(createMarkers);
