
# gh

  Little github client.

## Installation

```
$ npm install gh2
```

## Example

```js
var Github = require('gh2');

var gh = new Github({
  token: 'github-auth-token'
});

gh.lookup('visionmedia/co', '1.x', function(err, release){

});
```

## API

  - [Client()](#client)
  - [Client.stream()](#clientstreamrepostringrefstringpathstring)
  - [Client.get()](#clientgetpathstringfnfunction)
  - [Client.releases()](#clientreleasesrepostringfnfunction)
  - [Client.contents()](#clientcontentsrepostringrefstringpathstringfnfunction)
  - [Client.lookup()](#clientlookuprepostringversionstringfnfunction)

## Client(opts:Object)

  Fetch releases with `opts`:

  - `token` optional github token
  - `user` optional github user
  - `pass` optional github pass
  - `ua` user-agent string [gh]

### Client#stream(repo:String, ref:String, path:String)

  Return a stream for `repo`'s `path` at `ref`.

```js
 gh.stream('component/tip', '1.0.0', 'component.json');
```

### Client#get(path:String, fn:Function)

  GET the given `path`.

### Client#releases(repo:String, fn:Function)

  Respond with releases for `repo`.

```js
gh.releases('component/tip', fn);
```

### Client#contents(repo:String, ref:String, path:String, fn:Function)

  Get contents of `path` at `ref.

```js
gh.contents('component/tip' '1.0.0', 'component.json', fn);
```

### Client#lookup(repo:String, version:String, fn:Function)

  Lookup semver release of `repo` at the given `version`.

```js
gh.lookup('component/tip', '1.x', fn);
```

## Running tests

```
$ TOKEN=<token> USER=<user> PASS=<pass> make test
```

# License

  MIT