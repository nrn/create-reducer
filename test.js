var createReducer = require('./index')
var test = require('tape')

// setup handlers, object keys for action types
var handlers =
  { add: add
  , multiply: multiply
  , createSubtract: createSubtract
  // compose handler functions together for compound actions.
  , addThenMultiply: createReducer.compose(add, multiply)
  }

// create a reducer from the handlers, this is normaly what would be exported.
var reducer = createReducer(handlers, function () { return {num: 0}})

// actual action handling functions, down out of the way.
function add (state, action) {
  state.num += action.num
  return state
}

function multiply (state, action) {
  state.num *= action.num
  return state
}

function createSubtract (state) {
  this.subtract = function (state, action) {
    state.num -= action.num
    return state
  }
  return state
}

// enough example, lets run some tests.
test('use reducer', function (t) {
  var state = reducer()
  t.equal(state.num, 0, 'get initial state')
  state = reducer(state, {type: 'add', num: 1})
  t.equal(state.num, 1, 'add')
  state = reducer(state, {type: 'multiply', num: 2})
  t.equal(state.num, 2, 'multiply')
  state = reducer(state, {type: 'addThenMultiply', num: 3})
  t.equal(state.num, 15, 'addThenMultiply')
  state = reducer(state, {type: 'subtract', num: 4})
  t.equal(state.num, 15, 'Non-extant')
  state = reducer(state, {type: 'createSubtract', num: 4})
  state = reducer(state, {type: 'subtract', num: 4})
  t.equal(state.num, 11, 'created and used subtract')
  t.end()
})

