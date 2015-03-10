var bcrypt     = require('bcryptjs');
var bodyParser = require('body-parser');
var cors       = require('cors');
var express    = require('express');
var jwt        = require('jwt-simple');
var moment     = require('moment');
var mongoose   = require('mongoose');
var path       = require('path');
var request    = require('request');
var compress   = require('compression');
var favicon    = require('serve-favicon');
var config     = require('./config');

// Models
var User        = require('./models/User');
var Legislation = require('./models/Legislation');
var Vote        = require('./models/Vote');
var Senator     = require('./models/Senator');

mongoose.connect(config.db);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 2628000000 }));

// Middleware



// Routes
var users = require('./routes/users');
var legislations = require('./routes/legislations');
var senators = require('./routes/senators');
var votes = require('./routes/votes');

app.use('/auth', users);
app.use('/api/legislations', legislations);
app.use('/api/senators', senators);
app.use('/api/votes', votes);

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
 function isAuthenticated(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
    }

    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, config.tokenSecret);
    var now = moment().unix();

    if (now > payload.exp) {
        return res.status(401).send({ message: 'Token has expired.' });
    }

    User.findById(payload.sub, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User no longer exists.' });
        }

        req.user = user;
        next();
    })
}

/*
|--------------------------------------------------------------------------
| Listen on previously specified Port
|--------------------------------------------------------------------------
*/
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
