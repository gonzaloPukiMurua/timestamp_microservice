// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const port = 3000;
app.set('port', process.env.PORT || port);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:dateString?', (req, res) => {
  let date;
  const {dateString} = req.params;
  if(!dateString){
    date = new Date();
  }else{
    if(!isNaN(dateString)){
      date = new Date(parseInt(dateString));
    }else{
      date = new Date(dateString);
    }
  }
  const unixCode = date.getTime();  
  const utcTime = date.toUTCString();
  const query = {
    'unix': unixCode,
    'utc':utcTime
  };
  if(date.toString() === 'Invalid Date'){
    res.json({ error: date.toString()});
  }else{
    console.log(query);
    res.json(query);
  }  
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
const listener = app.listen(app.get('port'), ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
