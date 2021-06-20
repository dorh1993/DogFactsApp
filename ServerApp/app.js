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
  let cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    randomCookie = make5Id();
    res.cookie('cookieName', randomCookie, { maxAge: 900000, httpOnly: true });
  } 
  next();
});

//create a 5 long id for cookie
function make5Id() {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

// this get path return the facts that are saved for the relevant cookie
app.get('/my-facts', (req, res) => {
  if (!factsByCookie[req.cookies.cookieName]) return res.send([]);
  let cookieKey = req.cookies.cookieName
  res.status(200).json(factsByCookie[cookieKey].facts);
});

//this get path taked the count fact from the client and request from the given API the facts and then concats the saved facts from the relevant cookie
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

//this post path saves the new fact from the client in an object with cookie as a key (factsByCookie)
app.post('/save-form', (req, res) => {
  let cookieKey = req.cookies.cookieName
  saveForm(cookieKey, req.body);
  res.send({ "success": "true" })
})

//function that cab add the saved facts to any array
function addSavedFacts(result, cookieKey) {
  return result.concat(factsByCookie[cookieKey].facts);
}

//function that handles the saved facted -> In case factsByCookie object doesn't include the cookie - it will create one, else it will only push the fact
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