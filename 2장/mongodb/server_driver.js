var Server = require('mongodb-core').Server
  , ReadPreference = require('mongodb-core').ReadPreference
  , assert = require('assert');
var server = new Server({host: 'localhost', port: 27017});
// Wait for the connection event
server.on('connect', function(server) {
  assert.equal(null, err);
  // Execute the write
  var cursor = _server.cursor('integration_tests.inserts_example4', {
      find: 'integration_tests.example4'
    , query: {a:1}
  }, {
    readPreference: new ReadPreference('secondary')
  });
  // Get the first document
  cursor.next(function(err, doc) {
    assert.equal(null, err);
    server.destroy();
  });
});
// Start connecting
server.connect();