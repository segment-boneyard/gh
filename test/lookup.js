
var assert = require('assert');
var Client = require('..');

describe('gh.lookup(repo, version, fn)', function(){
  it('should respond with a release', function(done){
    var gh = new Client;

    gh.lookup('visionmedia/co', '1.x', function(err, release){
      assert(!err);
      assert(release);
      assert(release.name);
      assert(release.commit);
      done();
    });
  })
})