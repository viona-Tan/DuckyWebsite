const {Pool} = require('pg');
const pool = new Pool({
  connectionString: 'postgres://blebldtblljdzo:0e1cb1c9e4513d05da93d35f36714348aeb5768e23c90b44556e1a950c173996@ec2-54-196-65-186.compute-1.amazonaws.com:5432/d1c485agg1f262',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query(`SELECT * FROM Jokes;`, (error, results) => {
  if (error) {
      console.log("Error - Failed to select all from jokes");
      console.log(err);
  }
  else{
      console.log(results.rows);
  }
});



const getAllJokes = (request, response) => {
    const jokeid = request.query.jokeid
    console.log('all joke id')
    console.log(jokeid)
    pool.query('SELECT * FROM Jokes WHERE id = $1', 
    [jokeid],
    (error, results) => {      
      if (error) {
          console.log(error)
        throw error
      }else if(results.rows.length === 0){
        response.status(200).json(results.rows)
        }else{
            response.status(200).json(results.rows)
        }
    })
  }
  
  const getTopJokes = (request, response) => { 
    pool.query('SELECT * FROM Jokes ORDER BY likes desc LIMIT 5;', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)
      response.status(200).json(results.rows)
    })
  }
  
  const submit = (request, response) => {
    const {joke, answer} = request.body;
    pool.query('INSERT INTO Jokes (Joke, Answer, likes) VALUES ($1, $2, 0)', [joke, answer], (error, result) => {
      if (error) {
          console.log(error)
        throw error
      }
      response.status(201).send(`added joke: ${result.rows}`)
    })
  }
  
const like = (request, response) => {
const jokeid = request.query.jokeid
  
    pool.query(
      `UPDATE Jokes SET likes = likes + 1 WHERE id = $1`,
      [jokeid + 1],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log('herere')
        response.status(200).send(`likes updated for jokeID: ${jokeid}`)
      }
    )
  }

const likeTop = (request, response) => {
const jokeid = request.query.jokeid
  
    pool.query(
      `UPDATE Jokes SET likes = likes + 1 WHERE id = $1`,
      [jokeid],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log('top')
        response.status(200).send(`likes updated for jokeID: ${jokeid}`)
      }
    )
  }
  
  
  module.exports = {
    getAllJokes,
    getTopJokes,
    submit,
    like,
    likeTop,
  }