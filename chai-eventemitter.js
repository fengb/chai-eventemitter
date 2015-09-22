// Ugh - module dance
!function(context, chaiGenerator){
  if(typeof require === 'function' && typeof exports === 'object' && typeof module === 'object'){
    // node
    module.exports = chaiGenerator
  } else if(typeof define === 'function' && define.amd){
    // AMD
    define(function(){
      return chaiGenerator
    })
  } else {
    // assume browser
    chai.use(chaiGenerator)
  }
}(this, function(chai, utils){
  var toArray = Function.call.bind(Array.prototype.slice)

  function messaging(ee, eventName, expectedArgs, calledArgs){
    var expectedEmit = utils.inspect([eventName].concat(expectedArgs || []))

    var butGot = ''
    if(calledArgs){
      butGot = ' but got ' + utils.inspect([eventName].concat(calledArgs))
    }

    return {
      positive: ('expected #{this} to emit from #{obj} event #{expected}' + butGot)
                    .replace(/#{obj}/, ee)
                    .replace(/#{expected}/, expectedEmit),
      negative: 'expected #{this} not to emit from #{obj} event #{expected}'
                    .replace(/#{obj}/, ee)
                    .replace(/#{expected}/, expectedEmit),
    }
  }

  function calledCheck(calledArgs, expectedArgs){
    if(expectedArgs){
      return utils.eql(calledArgs, expectedArgs)
    } else {
      return calledArgs != undefined
    }
  }

  chai.Assertion.addMethod('emitFrom', function(ee, eventName){
    if(arguments.length > 2){
      var expectedArgs = toArray(arguments, 2)
    }

    var trigger = this._obj

    new chai.Assertion(trigger).to.be.instanceOf(Function)
    new chai.Assertion(ee).to.respondTo('once')

    var calledArgs
    ee.once(eventName, function(){
      calledArgs = toArray(arguments)
    })

    trigger()

    var message = messaging(ee, eventName, expectedArgs, calledArgs)
    this.assert(
      calledCheck(calledArgs, expectedArgs)
    , message.positive
    , message.negative
    )
  })

  function warnDeprecation(value, alternative){
    if(warnDeprecation[value]){
      return
    }
    warnDeprecation[value] = alternative
    console.log('"' + value + '" is deprecated. Please switch to "' + alternative +'" instead.')
  }

  // Deprecated
  chai.Assertion.addChainableMethod('cause', function(ee){
    warnDeprecation('.cause(ee).to.emit(event)', 'emitFrom(ee, event)')
    var trigger = this._obj

    new chai.Assertion(trigger).to.be.instanceOf(Function)
    new chai.Assertion(ee).to.respondTo('once')
    utils.flag(this, 'ee', ee)
  })

  // Deprecated
  chai.Assertion.addMethod('emit', function(eventName){
    warnDeprecation('.cause(ee).to.emit(event)', 'emitFrom(ee, event)')
    if(arguments.length > 1){
      var expectedArgs = toArray(arguments, 1)
    }

    var trigger = this._obj
    var ee = utils.flag(this, 'ee')

    var calledArgs
    ee.once(eventName, function(){
      calledArgs = toArray(arguments)
    })

    trigger()

    var message = messaging(ee, eventName, expectedArgs, calledArgs)
    this.assert(
      calledCheck(calledArgs, expectedArgs)
    , message.positive
    , message.negative
    )
  })
})
