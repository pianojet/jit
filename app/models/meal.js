var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    food: String
});

module.exports = mongoose.model('Meal', mealSchema);
