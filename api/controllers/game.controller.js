const Game = require("../models/game.model.js");
const _omit = require("lodash/omit");

exports.getAll = (req, res) => {
  Game.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving games."
      });
    });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Game.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found game with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving game with id=" + id });
    });
};

exports.post = (req, res) => {
  const game = new Game(req.body);

  game.save()
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the game."
      });
    });
};

exports.updateById = (req, res) => {
  Game
    .findByIdAndUpdate(req.body.id, { $set: { ..._omit(req.body, ["id"]) } }, { returnDocument: "after" })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the game."
      });
    });
};

exports.deleteById = (req, res) => {
  
  Game.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ deleted: req.params.id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the game."
      });
    });
};

exports.addPlayer = async (req, res) => {
  let game = await Game.findById(req.params.id);
  game[req.params.team].players.push(req.body.player);
  Game
    .findByIdAndUpdate(req.params.id, { $set: { ..._omit(game, ["id"]) } }, { returnDocument: "after" })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the game."
      });
    });
};

exports.removePlayer = async (req, res) => {
  let game = await Game.findById(req.params.id);
  const index = game[req.params.team].players.findIndex((player) => player.number === req.body.number);
  if (index > -1) {
    game[req.params.team].players.splice(index, 1); 
    Game
      .findByIdAndUpdate(req.params.id, { $set: { ..._omit(game, ["id"]) } }, { returnDocument: "after" })
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the game."
        });
      });
  } else {
    res.status(404).send({
      message: "This player number does not exist in the team."
    });
  }
};
