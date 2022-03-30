const express = require('express');
const router = express.Router();
const gameController = require("../controllers/game.controller.js");

router.get("/", gameController.getAll);
router.get("/:id", gameController.getById);
router.post("/", gameController.post);
router.put("/:id", gameController.updateById);
router.delete("/:id", gameController.deleteById);

module.exports = router;