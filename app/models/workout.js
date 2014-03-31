var mongoose = require('mongoose');

var workoutSchema = mongoose.Schema({
    exercise: String
});

module.exports = mongoose.model('Workout', workoutSchema);