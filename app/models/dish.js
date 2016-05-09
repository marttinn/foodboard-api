var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var DishSchema      = new Schema({
    price_cents: Number,
    name: String,
    place: String,
    photo_url: String,
    points: Number
});

module.exports = mongoose.model('Dish', DishSchema);
