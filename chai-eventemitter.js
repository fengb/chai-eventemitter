module.exports = function(chai, utils){
  chai.Assertion.addMethod('cause', function(eventable){
    this._eventable = eventable
  })

  chai.Assertion.addMethod('emit', function(eventName){
    var trigger = this._obj
    var eventable = this._eventable

    var calledArgs
    eventable.once(eventName, function(){
      calledArgs = arguments
    })

    trigger()

    this.assert(
      calledArgs != undefined
    , 'expected #{this} to cause OBJ to emit EVENT'
    , 'expected #{this} to not cause OBJ to emit EVENT'
    )
  })
}
