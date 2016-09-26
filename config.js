module.exports = {
  database: process.env.MONGO_URI || 'localhost',
  apiKey: 'AIzaSyAkawcLmt0FpyP2VIv3MkxHO5z0iJlPCI4',
  auth: {
    language: 'en',
    url: 'tristandb.eu.auth0.com',
    clientid: 'PvEyr2STO6J1rcvy8NqwwLHDasXc3N01',
    logo: '/img/logo_64.png',
    title: "Jotihunt.js Inloggen",
    secret: "HdpRjdTKKMrGH0s8MGHLLypHFwcSMI6KPhwrafotx134TSBLjolfPXFkeKENpN36",
    audience: 'PvEyr2STO6J1rcvy8NqwwLHDasXc3N01'
  },
  circle: {
    forGroup: 'Karel',
    radius: 500
  },
  map : {
    center : {
      lat:52.0426606750,
      lng: 5.8736160278,
      zoom: 9
    },
    fillOpacity: 0.05
  },
  kml: '2015.kml',
  subareas: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"],
  polling : {
    pollTime: 5*1000,
    hooks: ["vossen", "opdracht", "nieuws", "hint"],
    url: "http://jotihunt.net/api/1.0/"
  },
  emoticons: {
    status: {
      "rood": "\ud83c\ude34",
      "oranje": "\ud83c\ude36",
      "groen": "\ud83c\ude2f"
    }
  },
  telegramchats: {
    "Alpha": -153752986,
    "Bravo": -157632620,
    "Charlie": -172605996,
    "Delta": -169765091,
    "Echo": -155957029,
    "Foxtrot": -154182675,
    "opdracht": -172862895,
    "nieuws": -171983874
  }
};