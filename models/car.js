var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    location: [{
        wsgx: Number,
        wsgy: Number,
        location: String,
        subarea: String,
        saved: Date
    }]
});

carSchema.pre('save', function(next){
    // get the current date
    next();
});


module.exports = mongoose.model('Car', carSchema);