const express = require('express');
const app = express();
const https = require('https');
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser'); //must for getting body
const { default: axios } = require('axios');
app.use(bodyParser.json()); //must for getting body
app.use(cookieParser());
let factsByCookie = {};

// set a cookie
app.use((req, res, next) => {
  // check if client sent cookie
  let cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }
  next();
});


app.get('/my-facts', (req, res) => {
  if (!factsByCookie[req.cookies.cookieName]) return res.send([]);
  let cookieKey = req.cookies.cookieName
  res.status(200).json(factsByCookie[cookieKey].facts);
});

app.get('/all-facts', (req, res) => {
  let facts;
  let countFacts = req.query.count;
  return getDogFacts(countFacts).then(result => {
    facts = result.data.facts;
    if (factsByCookie[req.cookies.cookieName] != undefined) {
      facts = addSavedFacts(facts, req.cookies.cookieName)
    }
    res.status(200).json(facts);
  });
});

app.post('/save-form', (req, res) => {
  let cookieKey = req.cookies.cookieName
  saveForm(cookieKey, req.body);
  res.send({ "success": "true" })
})


function addSavedFacts(result, cookieKey) {
  return result.concat(factsByCookie[cookieKey].facts);
}

function saveForm(cookieKey, fact) {
  if (!factsByCookie[cookieKey]) {
    factsByCookie[cookieKey] = {
      facts: [fact.text]
    }
  }
  else {
    factsByCookie[cookieKey].facts.push(fact.text)
  }
}


function getDogFacts(factsNum) {
    return axios.get(`https://dog-api.kinduff.com/api/facts?number=${factsNum}`).catch(e => {
      console.error(e);
    })
} 


app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});