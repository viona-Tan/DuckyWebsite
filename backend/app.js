const cors = require('cors');
const express = require('express');
var app = express();
const db = require('./query')
app.use(cors()); // returns a fuction that is a middleware
app.use(express.json()); // recognize the incoming Request Object as a JSON Object

app.post('/form', db.submit)
app.get('/jokes', db.getAllJokes)
app.put('/like', db.like)
app.put('/likeTop', db.likeTop)
app.get('/scoreboard', db.getTopJokes)

const port = process.env.PORT
app.listen(port, function () {
  console.log('listening on port 8000')
})


