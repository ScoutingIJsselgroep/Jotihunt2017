// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var config = require('./config');
var routes = require('./app/routes');
var Character = require('./models/character');
var Hint = require('./models/hint');
var Car = require('./models/car');
var Poll = require('./models/poll');
var poller = require('./app/helpers/poller');

const jwt = require('express-jwt');
const cors = require('cors');

var { loggedIn } = require('./app/helpers/AuthService');

var app = express();
app.use(cors());
// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
    secret: new Buffer(config.auth.secret, 'base64'),
    audience: config.auth.audience
});


mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

var apiRoutes = express.Router();

/**
 * GET /api/cars
 * Return a list of cars
 */
apiRoutes.get('/cars', authCheck, function(req, res, next) {
    Car.find().sort({'location.created_at': 1}).exec(function (err, cars) {
        if (err) return next(err);
        var carslist = cars.map(function (car){
            return car.location.map(function(location){
                return({
                    wsgx: location.wsgx,
                    wsgy: location.wsgy,
                    type: "car",
                    saved: location.saved,
                    userName: car.userName,
                    userId: car.userId
                });
            });
        });

        res.send([].concat.apply([], carslist));
    });
});

/**
 * GET /api/hints
 * Return a list of hints
 */
apiRoutes.get('/hints', authCheck, function(req, res, next) {
    if(req.user) {
        var value = req.query.value;
        var limit = req.query.limit ? req.query.limit : 2 ^ 31;
        var searchTerm = new RegExp(".*" + value + ".*", 'i');
        if (value) {
            Hint
                .find({$or: [{subarea: searchTerm}, {location: searchTerm}]})
                .sort({created_at: -1})
                .exec(function (err, hint) {
                    if (err) return next(err);

                    res.send(hint);
                });
        } else {
            Hint
                .find()
                .sort({created_at: -1})
                .limit(limit)
                .exec(function (err, hint) {
                    if (err) return next(err);

                    res.send(hint);
                });
        }
    }
});

/**
 * POST /api/car
 */
apiRoutes.post('/car', authCheck, function(req, res, next){
    var wsgx = req.body.wsgx;
    var wsgy = req.body.wsgy;
    var userId = req.body.userId;
    console.log(req.body);

    async.waterfall([
        function (callback) {
            Car.find({userId: userId}, function (err, cars) {
                if(!cars.length) {
                    var car = new Car({
                        userId: userId,
                        userName: "Tristan"
                    });
                    car.save(function (err) {
                        if (err) return next(err);
                        callback();
                    });
                }
                callback();
            });

        },
        function(callback) {
            Car.find({userId: userId}, function (err, cars) {
                console.log(JSON.stringify(cars));
                for (var car in cars) {
                    cars[car].location.push({
                        wsgx: wsgx,
                        wsgy: wsgy,
                        saved: new Date()
                    });
                    cars[car].save(function (err) {
                        if (err) {
                            res.send({error: 'Locatie opslaan niet gelukt'});
                        } else {
                            res.send({message: 'Locatie is met succes toegevoegd.'});
                        }
                    });
                }
                callback();
            });
        }
    ]);
});

apiRoutes.delete('/hints', function(req, res, next){
    Hint.findOne({ _id: req.query.id }, function(err, hint) {
        if (err) return next(err);

        if (!hint) {
            return res.status(404).send({ message: 'Hint not found.' });
        }
        hint.remove();
        return res.send({ message: 'Hint has been deleted.' });
    });
});

/**
 * POST /api/hints
 * Adds new hint to the database.
 */
apiRoutes.post('/hints', function(req, res, next) {

        var rdx = req.body.rdx;
        var wsgx = req.body.wsgx;
        var rdy = req.body.rdy;
        var wsgy = req.body.wsgy;
        var location = req.body.location;
        var subarea = req.body.subarea;

        async.waterfall([
            function () {
                try {
                    var hint = new Hint({
                        subarea: subarea,
                        wsgx: wsgx,
                        wsgy: wsgy,
                        rdx: rdx,
                        rdy: rdy,
                        location: location
                    });

                    hint.save(function (err) {
                        if (err) return next(err);
                        res.send({message: 'Hint is met succes toegevoegd.'});
                    });
                } catch (e) {
                    res.status(404).send({message: 'Er ging iets mis tijdens het toevoegen.'});
                }
            }
        ]);
});

/**
 * GET /api/stats
 * Returns characters statistics.
 */
apiRoutes.get('/stats', function(req, res, next) {
  async.parallel([
      function(callback) {
        Character.count({}, function(err, count) {
          callback(err, count);
        });
      },
      function(callback) {
        Character.count({ race: 'Amarr' }, function(err, amarrCount) {
          callback(err, amarrCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Caldari' }, function(err, caldariCount) {
          callback(err, caldariCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Gallente' }, function(err, gallenteCount) {
          callback(err, gallenteCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Minmatar' }, function(err, minmatarCount) {
          callback(err, minmatarCount);
        });
      },
      function(callback) {
        Character.count({ gender: 'Male' }, function(err, maleCount) {
          callback(err, maleCount);
        });
      },
      function(callback) {
        Character.count({ gender: 'Female' }, function(err, femaleCount) {
          callback(err, femaleCount);
        });
      },
      function(callback) {
        Character.aggregate({ $group: { _id: null, total: { $sum: '$wins' } } }, function(err, totalVotes) {
            var total = totalVotes.length ? totalVotes[0].total : 0;
            callback(err, total);
          }
        );
      },
      function(callback) {
        Character
          .find()
          .sort('-wins')
          .limit(100)
          .select('race')
          .exec(function(err, characters) {
            if (err) return next(err);

            var raceCount = _.countBy(characters, function(character) { return character.race; });
            var max = _.max(raceCount, function(race) { return race });
            var inverted = _.invert(raceCount);
            var topRace = inverted[max];
            var topCount = raceCount[topRace];

            callback(err, { race: topRace, count: topCount });
          });
      },
      function(callback) {
        Character
          .find()
          .sort('-wins')
          .limit(100)
          .select('bloodline')
          .exec(function(err, characters) {
            if (err) return next(err);

            var bloodlineCount = _.countBy(characters, function(character) { return character.bloodline; });
            var max = _.max(bloodlineCount, function(bloodline) { return bloodline });
            var inverted = _.invert(bloodlineCount);
            var topBloodline = inverted[max];
            var topCount = bloodlineCount[topBloodline];

            callback(err, { bloodline: topBloodline, count: topCount });
          });
      }
    ],
    function(err, results) {
      if (err) return next(err);

      res.send({
        totalCount: results[0],
        amarrCount: results[1],
        caldariCount: results[2],
        gallenteCount: results[3],
        minmatarCount: results[4],
        maleCount: results[5],
        femaleCount: results[6],
        totalVotes: results[7],
        leadingRace: results[8],
        leadingBloodline: results[9]
      });
    });
});


/**
 * For api routes.
 */
app.use('/api', apiRoutes);

/**
 * For pages.
 */
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

/**
 * Polling. Do this every now and then :)
 */
poller.schedulePoll();

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
