module.exports = {
  database: process.env.MONGO_URI || 'localhost',
  apiKey: 'AIzaSyAkawcLmt0FpyP2VIv3MkxHO5z0iJlPCI4',
  circle: {
    forGroup: 'Karel',
    radius: 500
  },
  map : {
    center : {
      lat:52.0426606750,
      lng: 5.8736160278,
      zoom: 10
    },
    fillOpacity: 0.35
  },
  kml: '2015.kml',
  subareas: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"]
};