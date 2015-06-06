var chai = require('chai')
var chaiEventEmitter = require('..')
chai.use(chaiEventEmitter)

var EventEmitter = require('events').EventEmitter

describe('expect()', function(){
  it('.to.cause(obj).to.emit("event")', function(){
    var obj = new EventEmitter()
    chai.expect(function(){
      obj.emit('event')
    }).to.cause(obj).to.emit('event')
  })
})
