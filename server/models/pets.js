var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var petSchema= new Schema({
  name: String,
  animal: String,
  age: Number,
  image: String
});

var pet= mongoose.model('pet', petSchema);

module.exports= pet;
