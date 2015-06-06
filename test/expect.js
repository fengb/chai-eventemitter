var chai = require('chai')
var chaiEventEmitter = require('..')
chai.use(chaiEventEmitter)

var EventEmitter = require('eventemitter').EventEmitter

describe('expect()', function(){
  it('.to.cause(obj).to.emit("event")', function(){
    var obj = new EventEmitter()
    chai.expect(function(){
      obj.emit('event')
    }).to.cause(obj).to.emit('event')
  })

  it('.to.cause(obj).to.emit("event") with arg', function(){
    var obj = new EventEmitter()
    chai.expect(function(){
      obj.emit('event', 'arg')
    }).to.cause(obj).to.emit('event')
  })

  it('.to.cause(obj).to.emit("event", "arg")', function(){
    var obj = new EventEmitter()
    chai.expect(function(){
      obj.emit('event', 'arg')
    }).to.cause(obj).to.emit('event', 'arg')
  })

  it('.not.to.cause(obj).to.emit("event", "arg")', function(){
    var obj = new EventEmitter()
    chai.expect(function(){
      obj.emit('event')
    }).not.to.cause(obj).to.emit('event', 'arg')
  })
})
