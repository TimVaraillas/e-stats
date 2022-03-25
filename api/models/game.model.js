const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
  name: {
    type: String
  },
},{
    collection: 'games'
});

module.exports = mongoose.model('Game', Game);