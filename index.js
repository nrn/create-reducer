var slice = require('lodash._slice')

createReducer.compose = compose

module.exports = createReducer

function createReducer (handlers, getInitialState) {
  if (typeof getInitialState !== 'function') {
    throw new Error('Must provide getInitialState function to be called when state is undefined.')
  }
  return function (state, action) {
    if (typeof state === 'undefined') {
      return getInitialState.apply(handlers, arguments)
    }
    return (
      handlers[action.type] || handlers['default'] || identity
    ).apply(handlers, arguments)
  }
}

function identity (state, action) {
  return state
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

