
# gh

  Little github client.

## Installation

```
$ npm install segmentio/gh
```

## Example

```js
var Github = require('gh');

var gh = new Github({
  token: 'github-auth-token'
});

gh.lookup('visionmedia/co', '1.x', function(err, release){

});
```

## API

### Client(opts:Object)

  Fetch releases with `opts`:

  - `token` optional github token
  - `user` optional github user
  - `pass` optional github pass
  - `ua` user-agent string [gh]

### Client.releases(repo:String, fn:Function)

  Respond with releases for `repo`.

```js
gh.releases('component/tip', fn);
```

### Client.lookup(repo:String, version:String, fn:Function)

  Lookup semver release of `repo` at the given `version`.

```js
gh.lookup('component/tip', '1.x', fn);
```

# License

  MIT