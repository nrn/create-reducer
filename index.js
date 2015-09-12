var slice = require('lodash._slice')

createStore.compose = compose

module.exports = createStore

function createStore (obj) {
  return function (store, action) {
    var fn = obj[action.type]
    if (typeof fn === 'undefined') {
      fn = obj['default']
      if (typeof fn === 'undefined') fn = identity
    }
    return fn(store, action)
  }
}

function identity (store, action) {
  return store
}

function compose (args) {
  if (!Array.isArray(args)) args = slice(arguments)
  return function (store, action) {
    return args.reduce(function (last, cur) {
      return cur(last, action)
    }, store)
  }
}

