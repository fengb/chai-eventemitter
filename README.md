# chai-eventemitter [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This is a plugin for [chai](http://chaijs.com) to simplify the testing of
EventEmitter.

EventEmitters can be testing using spies, but they are rather heavyweight for
most usecases:

```javascript
var spy = sinon.spy()                     //- boilerplate

emitter.on('test', spy)                   //- boilerplate
emitter.emit('test')                      //+ useful
expect(spy).to.have.been.called()         //+ verbose

spy.reset()                               //- boilerplate
emitter.emit('test', args)                //+ useful
expect(spy).to.have.been.calledWith(args) //+ so verbose
```

`chai-eventemitter` replaces this with something much more digestable:

```javascript
expect(function(){ emitter.emit('test') }).to.cause(emitter).to.emit('test')
expect(function(){ emitter.emit('test', arg) }).to.cause(emitter).to.emit('test', arg)
```

## Setup

### node.js / io.js

```javascript
var chai = require('chai')
chai.use(require('chai-eventemitter'))
```

### Browser

```html
<script src="chai.js"></script>
<script src="chai-eventemitter.js"></script>
```

# License

`chai-eventemitter` is released under the [MIT License](https://github.com/fengb/chai-eventemitter/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/chai-eventemitter.svg?style=flat
[npm-url]: https://npmjs.org/package/chai-eventemitter
[travis-image]: https://img.shields.io/travis/fengb/chai-eventemitter.svg?style=flat
[travis-url]: https://travis-ci.org/fengb/chai-eventemitter
