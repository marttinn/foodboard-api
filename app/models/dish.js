var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var DishSchema      = new Schema({
    price_cents: Number,
    likes: Number,
    name: String,
    place: String,
    photo_url: String
});

module.exports = mongoose.model('Dish', DishSchema);
