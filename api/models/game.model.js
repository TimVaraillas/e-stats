const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gameModel = new Schema({
  place: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  localeTeam: {
    name: {
      type: String,
      required: true
    },
    color: String,
  },
  awayTeam: {
    name: {
      type: String,
      required: true
    },
    color: String,
  },
}, { versionKey: false });

gameModel.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   
    delete ret._id; 
  }
});

module.exports = mongoose.model('game', gameModel);