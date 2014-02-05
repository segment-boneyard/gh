
var concat = require('concat-stream');
var assert = require('assert');
var Client = require('..');

describe('gh.stream(repo, path, ref, fn)', function(){
  it('should respond with file stream', function(done){
    var gh = new Client({
      token: process.env.TOKEN
    });

    var stream = gh.stream('component/tip', '1.0.0', 'component.json');
    concat(stream, function(err, buf){
      if (err) return done(err);
      var str = buf.toString();
      str.should.include('"name": "tip"');
      done();
    });
  })
})
