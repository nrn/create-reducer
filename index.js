createReducer.compose = compose

module.exports = createReducer

function createReducer (handlers, getInitialState) {
  return function (state, action) {
    var handler = handlers[action.type]
    if (typeof state === 'undefined' && typeof getInitialState === 'function') {
      state = getInitialState(action)
    }
    return (
      typeof handler === 'function' ?
      handler.call(handlers, state, action) :
      state
    )
  }
}

function compose (fns) {
  return function (state, action) {
    return fns.reduce(function (last, fn) {
      return fn(last, action)
    }, state)
  }
}

