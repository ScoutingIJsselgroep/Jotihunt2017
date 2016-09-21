var mongoose = require('mongoose');

var hintSchema = new mongoose.Schema({
  subarea: String,
  description: String,
  type: {type: String, default: "hint"},
  wsgx: Number,
  wsgy: Number,
  rdx: Number,
  rdy: Number,
  location: String,
  created_at: Date,
  updated_at: Date
});

hintSchema.pre('save', function(next){
  // get the current date
  var currentDate = new Date();

  this.updated_at = currentDate;
  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});


module.exports = mongoose.model('Hint', hintSchema);