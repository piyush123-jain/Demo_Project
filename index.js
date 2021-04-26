// server init config
var express= require('express');
var app  = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

// middleware config
const cors = require('cors');
var db = require('./db.config');

// db config

// parse application/x-www-form-urlencoded
app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = 'http://localhost:4200';
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});

io.on("connection", socket => {
  io.emit("documents", 'this working properly');
});


// set router
const authRoutes  = require('./routes/authRouter');
app.use(authRoutes);
// parse application/json
var port = process.env.PORT || 3000;


app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});



