var format = require('util').format

module.exports = function(chai, utils){
  var toArray = Function.call.bind(Array.prototype.slice)

  function messaging(eventable, eventName, expectedArgs, calledArgs){
    var expectedEmit = utils.inspect([eventName].concat(expectedArgs || []))

    if(calledArgs){
      var butGot = ' but got ' + utils.inspect([eventName].concat(calledArgs))
    }

    return {
      positive: format('expected #{this} to cause %s to emit %s' + butGot,
                        eventable, expectedEmit),
      negative: format('expected #{this} to not cause %s to emit %s',
                        eventable, expectedEmit),
    }
  }

  function calledCheck(calledArgs, expectedArgs){
    if(expectedArgs){
      return utils.eql(calledArgs, expectedArgs)
    } else {
      return calledArgs != undefined
    }
  }

  chai.Assertion.addMethod('cause', function(eventable){
    utils.flag(this, 'eventable', eventable)
  })

  chai.Assertion.addMethod('emit', function(eventName){
    if(arguments.length > 1){
      var expectedArgs = toArray(arguments, 1)
    }

    var trigger = this._obj
    var eventable = utils.flag(this, 'eventable')

    var calledArgs
    eventable.once(eventName, function(){
      calledArgs = toArray(arguments)
    })

    trigger()

    var message = messaging(eventable, eventName, expectedArgs, calledArgs)
    this.assert(
      calledCheck(calledArgs, expectedArgs)
    , message.positive
    , message.positive
    )
  })
}
