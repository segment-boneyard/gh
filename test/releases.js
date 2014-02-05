
var Client = require('..');

describe('gh.releases(opts, fn)', function(){
  it('should respond with private releases via .token', function(done){
    var gh = new Client({
      token: process.env.TOKEN
    });

    gh.releases('segmentio/accounts', function(err, releases){
      if (err) return done(err);
      releases.should.not.be.empty;
      releases[0].should.have.property('name');
      releases[0].should.have.property('commit');
      done();
    });
  })

  it('should respond with private releases via .user / .pass', function(done){
    var gh = new Client({
      user: process.env.USER,
      pass: process.env.PASS
    });

    gh.releases('segmentio/accounts', function(err, releases){
      if (err) return done(err);
      releases.should.not.be.empty;
      releases[0].should.have.property('name');
      releases[0].should.have.property('commit');
      done();
    });
  })

  it('should respond with public releases', function(done){
    var gh = new Client;

    gh.releases('visionmedia/debug', function(err, releases){
      if (err) return done(err);
      releases.should.not.be.empty;
      releases[0].should.have.property('name');
      releases[0].should.have.property('commit');
      done();
    });
  })
})