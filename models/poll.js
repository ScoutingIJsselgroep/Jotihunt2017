var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    pollhash: String,
    created_at: Date,
    polldatahash: String,
    polldata: String,
    pollhook: String
});

pollSchema.pre('save', function(next){
    // get the current date
    next();
});


module.exports = mongoose.model('Poll', pollSchema);