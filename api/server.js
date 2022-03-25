const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const dbConfig = require("./config/db.config.js");
const app = express();


app.use(cors({ origin: "http://localhost:8080" }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const gameRouter = require("./routes/game.routes");
app.use('/games', gameRouter);

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server is running on port:', port);
});