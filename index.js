var slice = require('lodash._slice')

createReducer.compose = compose

module.exports = createReducer

function createReducer (handlers, getInitialState) {
  if (typeof getInitialState !== 'function') {
    throw new Error('Must provide getInitialState function to be called when state is undefined.')
  }
  return function () {
    var args = slice(arguments)
    if (typeof args[0] === 'undefined') {
      args[0] = getInitialState.apply(handlers, args)
    }
    var toCall = args[1] && args[1].type && typeof handlers[args[1].type] === 'function' 
    return toCall ? handlers[args[1].type].apply(handlers, args) : args[0]
  }
}

function compose (fns) {
  if (!Array.isArray(fns)) fns = slice(arguments)
  return function () {
    var args = slice(arguments)
    var state = args.shift()
    var self = this
    return fns.reduce(function (last, cur) {
      return cur.apply(self, [last].concat(args))
    }, state)
  }
}

