const Game = require("../models/game.model.js");

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
    .then(data => {
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

