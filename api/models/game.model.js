const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gameModel = new Schema({
  name: String
}, { versionKey: false });

gameModel.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   
    delete ret._id; 
  }
});

module.exports = mongoose.model('game', gameModel);