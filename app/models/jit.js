var mongoose = require('mongoose');

// define the schema for our user model
var workoutSchema = mongoose.Schema({
    exercise: String
});

var mealSchema = mongoose.Schema({
    food: String
});

// // methods ======================
// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// create the model for users and expose it to our app
module.exports = mongoose.model('Workout', workoutSchema);
module.exports = mongoose.model('Food', foodSchema);
