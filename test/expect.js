if(typeof chai === 'undefined'){
  var chai = require('chai')
  var chaiEventEmitter = require('..')
  chai.use(chaiEventEmitter)

  var EventEmitter = require('events').EventEmitter
}

var noop = function(){}

describe('expect()', function(){
  it('.to.cause(ee).to.emit("event")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){
      ee.emit('event')
    }).to.cause(ee).to.emit('event')
  })

  it('.to.cause(ee).to.emit("event") with arg', function(){
    var ee = new EventEmitter()
    chai.expect(function(){
      ee.emit('event', 'arg')
    }).to.cause(ee).to.emit('event')
  })

  it('.to.cause(ee).to.emit("event", "arg")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){
      ee.emit('event', 'arg')
    }).to.cause(ee).to.emit('event', 'arg')
  })

  it('.not.to.cause(ee).to.emit("event", "arg")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){
      ee.emit('event')
    }).not.to.cause(ee).to.emit('event', 'arg')
  })

  describe('failures', function(){
    it('fails when expect(nonfunction)', function(){
      var ee = new EventEmitter()
      chai.expect(function(){
        chai.expect(1).to.cause(ee).to.emit('event')
      }).to.throw(chai.assertionerror, /to be an instance of Function/)
    })

    it('fails when .to.cause(nonemitter)', function(){
      chai.expect(function(){
        chai.expect(noop).to.cause(1).to.emit('event')
      }).to.throw(chai.assertionerror, /respond to.*once/)
    })
  })
})
