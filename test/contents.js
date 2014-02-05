
var Client = require('..');
var assert = require('assert');

describe.only('gh.contents(repo, path, ref, fn)', function(){
  it('should respond with file contents', function(done){
    var gh = new Client({
      token: process.env.TOKEN
    });

    gh.contents('component/tip', '1.0.0', 'component.json', function(err, file){
      if (err) return done(err);
      assert(file.name == 'component.json');
      done();
    });
  })
})