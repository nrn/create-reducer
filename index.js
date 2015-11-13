createReducer.compose = compose

module.exports = createReducer

function createReducer (handlers, getInitialState) {
  if (typeof getInitialState !== 'function') {
    throw new Error('Must provide getInitialState function to be called when state is undefined.')
  }
  return function (state, action) {
    var handler = handlers[action.type]
    if (typeof state === 'undefined') {
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

