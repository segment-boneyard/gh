/**
 * Module dependencies.
 */

var request = require('request');
var assert = require('assert');
var semver = require('semver');
var ms = require('ms');

/**
 * Expose `Client`.
 */

module.exports = Client;

/**
 * Fetch releases with `opts`:
 *
 * - `token` optional github token
 * - `user` optional github user
 * - `pass` optional github pass
 * - `ua` user-agent string [gh]
 *
 * @param {Object} opts
 * @param {Function} fn
 * @api public
 */

function Client(opts) {
  opts = opts || {};
  this.token = opts.token;
  this.user = opts.user;
  this.pass = opts.pass;
  this.ua = opts.ua || 'gh';
}

/**
 * Respond with releases for `repo`.
 *
 *   gh.releases('component/tip', fn);
 *
 * @param {String} repo
 * @param {Function} fn
 * @api public
 */

Client.prototype.releases = function(repo, fn){
  var url = 'https://api.github.com/repos/' + repo + '/tags';
  var token = this.token;
  var user = this.user;
  var pass = this.pass;

  var opts = {
    url: url,
    headers: { 'User-Agent': this.ua },
    json: true
  };

  if (token) opts.headers.Authorization = 'Bearer ' + token;
  if (user && pass) opts.headers.Authorization = 'Basic ' + basic(user, pass);

  request(opts, function(err, res, body){
    if (err) fn(err);

    var l = ~~res.headers['x-ratelimit-limit'];
    var n = ~~res.headers['x-ratelimit-remaining'];
    var r = ~~res.headers['x-ratelimit-reset'];

    if (0 == n) {
      r = new Date(r * 1000);
      r = ms(r - new Date, { long: true });
      return fn(new Error('ratelimit of ' + l + ' requests exceeded, resets in ' + r));
    }

    fn(null, body);
  });
};

/**
 * Lookup semver release of `repo` at the given `version`.
 *
 *   gh.lookup('component/tip', '1.x', fn);
 *
 * @param {String} repo
 * @param {String} version
 * @param {Function} fn
 * @api public
 */

Client.prototype.lookup = function(repo, version, fn){
  this.releases(repo, function(err, tags){
    if (err) return fn(err);

    try {
      var tag = find(tags, version);
    } catch (err) {
      return fn(err);
    }

    fn(null, tag);
  });
};

/**
 * Return base64 encoded basic auth.
 */

function basic(user, pass) {
  return new Buffer(user + ':' + pass).toString('base64');
}

/**
 * Find a release in `tags` that satisfies `version`.
 */

function find(tags, version) {
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    if (semver.satisfies(tag.name, version)) {
      return tag;
    }
  }
}