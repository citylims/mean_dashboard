var debug = require('debug')('passport-mongo');
var app = require('./app/app');
var port = 3000;

app.set('port', process.env.PORT || port);

console.log("Magic happens on port: " + port)

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
