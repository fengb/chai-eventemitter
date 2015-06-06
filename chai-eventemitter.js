var format = require('util').format

module.exports = function(chai, utils){
  function formatInspect(string){
    var formatArgs = [string]
    for(var i = 1; i < arguments.length; i++){
      formatArgs.push(utils.inspect(arguments[i]))
    }
    return format.apply(null, formatArgs)
  }

  chai.Assertion.addMethod('cause', function(eventable){
    this._eventable = eventable
  })

  chai.Assertion.addMethod('emit', function(eventName){
    if(arguments.length > 1){
      var expectedArgs = Array.prototype.slice.call(arguments, 1)
    }

    var trigger = this._obj
    var eventable = this._eventable

    var calledArgs
    eventable.once(eventName, function(){
      calledArgs = Array.prototype.slice.call(arguments)
    })

    trigger()

    if(expectedArgs){
      this.assert(
        utils.eql(calledArgs, expectedArgs)
      , formatInspect('expected #{this} to cause %s to emit %s but got %s',
                      eventable, [eventName].concat(expectedArgs), [eventName].concat(calledArgs))
      , formatInspect('expected #{this} to not cause %s to emit %s',
                      eventable, [eventName].concat(expectedArgs))
      )
    } else {
      this.assert(
        calledArgs != undefined
      , formatInspect('expected #{this} to cause %s to emit %s',
                      eventable, [eventName])
      , formatInspect('expected #{this} to not cause %s to emit %s',
                      eventable, [eventName])
      )
    }
  })
}
