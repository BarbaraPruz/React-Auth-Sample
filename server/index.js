// main starting point of the application

//  node version doesn't support import so using require
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// db setup
mongoose.connect('mongodb://localhost/auth');

// app setup (getting express setup)
//   --- pass incoming requests through middleware morgan and bodyParser
app.use(morgan('combined'));  // morgan - logging framework (incoming requests, etc.)
app.use(cors());  // cors default config - accepts any request
app.use(bodyParser.json({ type: '*/*' }));  // bodyParser - parse incoming requests
router(app);

// server setup (getting app/express to talk to the outside world)
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port',port);

