if(typeof chai === 'undefined'){
  var chai = require('chai')
  var chaiEventEmitter = require('..')
  chai.use(chaiEventEmitter)

  var EventEmitter = require('events').EventEmitter
}

function noop(){}

describe('expect()', function(){
  it('.to.emitFrom(ee, "event")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){ ee.emit('event') }).to.emitFrom(ee, 'event')
  })

  it('.to.emitFrom(ee, "event") with arg', function(){
    var ee = new EventEmitter()
    chai.expect(function(){ ee.emit('event', 'arg') }).to.emitFrom(ee, 'event')
  })

  it('.to.emitFrom(ee, "event", "arg")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){ ee.emit('event', 'arg') }).to.emitFrom(ee, 'event', 'arg')
  })

  it('.not.to.emitFrom(ee, "event", "arg")', function(){
    var ee = new EventEmitter()
    chai.expect(function(){ ee.emit('event') }).not.to.emitFrom(ee, 'event', 'arg')
  })

  describe('failures', function(){
    it('fails when expect(nonfunction)', function(){
      var ee = new EventEmitter()
      chai.expect(function(){
        chai.expect(1).to.emitFrom(ee, 'event')
      }).to.throw(chai.assertionerror, /to be an instance of Function/)
    })

    it('fails when .to.emitFrom(nonemitter)', function(){
      chai.expect(function(){
        chai.expect(noop).to.emitFrom(1, 'event')
      }).to.throw(chai.assertionerror, /respond to.*once/)
    })
  })
})
