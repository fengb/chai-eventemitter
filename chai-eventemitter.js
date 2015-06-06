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

    var expectedEmit = [eventName].concat(expectedArgs || [])
    var pMsg
    if(calledArgs){
      var actualEmit = [eventName].concat(calledArgs)
      pMsg = formatInspect('expected #{this} to cause %s to emit %s but got %s',
                           eventable, expectedEmit, actualEmit)
    } else {
      pMsg = formatInspect('expected #{this} to cause %s to emit %s',
                           eventable, expectedEmit)
    }

    var nMsg = formatInspect('expected #{this} to not cause %s to emit %s',
                             eventable, expectedEmit)

    if(expectedArgs){
      this.assert(
        utils.eql(calledArgs, expectedArgs)
      , pMsg
      , nMsg
      )
    } else {
      this.assert(
        calledArgs != undefined
      , pMsg
      , nMsg
      )
    }
  })
}
