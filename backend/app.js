const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


const cors = require('cors');
const express = require('express');
var app = express();
app.use(cors()); // returns a fuction that is a middleware
app.use(express.json()); // recognize the incoming Request Object as a JSON Object
var jokedatabase  = [
  {
     joke: 'joke1',
     answer: 'answer1',
     likes: 300
 },
  {
     joke: 'joke2',
     answer: 'answer2',
     likes: 300
 },
  {
     joke: 'joke3',
     answer: 'answer3',
     likes: 300
 },
 {
     joke: 'joke4',
     answer: 'answer4',
     likes: 300
 },
 {
     joke: 'joke5',
     answer: 'answer5',
     likes: 500
 },
]


app.post('/form', function (req, res, next) {
  console.log('ehueh')
  console.log(req.body)
  //const {joke, answer} = req.query;
  jokedatabase.push( req.body)
  console.log(jokedatabase)
  return res.json(req.body) // recommend using res.json
})


app.get('/jokes', function (req, res, next) {
  jokedatabase.sort((a, b) => b.joke - a.joke);
  console.log(jokedatabase)
  var jokeid = req.query.jokeid
  console.log('appjoke:' + jokeid)
  if(jokeid == jokedatabase.length){
    console.log('end')
    return res.status(404).send('End of jokes, come back next time..')
  }else{
    return res.json(jokedatabase[jokeid]) // recommend using res.json
  }
})

app.put('/like', function(req,res,next) {
  var jokeid = req.query.jokeid
  console.log('id:' + jokeid)
  //var like = req.body.addlike
  jokedatabase[jokeid].likes += 1
  console.log(jokedatabase[jokeid].likes)
  return res.sendStatus(200)
})

app.get('/scoreboard', function (req, res, next) {
  //jokedatabase.sort((a, b) => b.likes - a.likes);
var sortedJokes = jokedatabase.slice().sort((a, b) => b.likes - a.likes)
  // use Array.map()
  // console.log(jokedatabase)
  console.log(sortedJokes)
  return res.json(sortedJokes)

})

app.listen(8000, function () {
  console.log('listening on port 8000')
})


// pass in an object will covert it to json