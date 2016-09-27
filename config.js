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
        audience: 'PvEyr2STO6J1rcvy8NqwwLHDasXc3N01',
        apitoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJpbVBnM044VDRHNHNuZ0Q3Um9DY0I0MXAwQ2ZJNm1xSCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NzQ5MjI4MTYsImp0aSI6ImVmMjgyYWIzNzMyZThiNzNhMDJhMWYxOWQ3Y2I1N2JlIn0.zA6BHsdZFqABnayFu2SvOq1foTa1HCFLTa2XzETrsP4'
    },
    circle: {
        forGroup: 'Karel',
        radius: 500
    },
    passwords: [{
            username: 'scoutingijsselgroep@gmail.com',
            url: 'http://gmail.com',
            password: 'lordbaden2016',
            name: 'GMail IJsselgroep'
        },
        {
            username: 'scoutingijsselgroep@gmail.com',
            url: 'http://youtube.com',
            password: 'lordbaden2016',
            name: 'Youtube IJsselgroep'
        },
        {
            username: 'scoutingdewittewieven@gmail.com',
            url: 'http://gmail.com',
            password: 'scouting50',
            name: 'GMail Witte Wieven'
        },
        {
            username: 'jotihunt@scouting-ijsselgroep.nl',
            url: 'http://jotihunt.net',
            password: 'scouting70',
            name: 'Jotihunt'
        }
    ],
    map: {
        center: {
            lat: 52.0426606750,
            lng: 5.8736160278,
            zoom: 9
        },
        fillOpacity: 0.05
    },
    kml: '2015.kml',
    subareas: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"],
    polling: {
        pollTime: 5 * 1000,
        hooks: ["vossen"],
        url: "http://localhost:3003/"
    },
    form: "https://docs.google.com/forms/d/e/1FAIpQLScwDHxjAMMpU_FxLkU5zEyD-Nw49L9ALLpLpdwmAyl6QG5soQ/viewform",
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