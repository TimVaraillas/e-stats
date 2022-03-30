const mongoose = require('mongoose');

const gameModel = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ['m', 'f'],
    required: true,
  },
  localeTeam: {
    name: {
      type: String,
      required: true,
    },
    color: String,
  },
  awayTeam: {
    name: {
      type: String,
      required: true,
    },
    color: String,
  },
}, { versionKey: false });

gameModel.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('game', gameModel);
