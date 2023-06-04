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

app.get('/api/:date', (req, res) => {
  const {date} = req.params;
  const timestamp = new Date(parseInt(date));
  const weekday = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const utcTime = weekday[timestamp.getUTCDay()] + ', ' + timestamp.getUTCDate() + ' ' + month[timestamp.getUTCMonth()] + ' ' + timestamp.getUTCFullYear() + ' ' + timestamp.getUTCHours() + ':' + timestamp.getUTCMinutes() + ':' + timestamp.getUTCSeconds() + ' GMT';
  const query = {
    'unix': date,
    'utc':utcTime
  };
  console.log(query);
  res.json(query);
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
const listener = app.listen(app.get('port'), ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
