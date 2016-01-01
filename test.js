var createReducer = require('./index')
var test = require('tape')

// setup handlers, object keys for action types
var handlers = {
  add: add,
  multiply: multiply,
  createSubtract: createSubtract,
  // compose handler functions together for compound actions.
  addThenMultiply: createReducer.compose([add, multiply])
}

// create a reducer from the handlers, this is normaly what would be exported.
var reducer = createReducer(handlers, function () {
  return {
    num: 0
  }
})

// actual action handling functions, down out of the way.
function add (state, action) {
  return {
    num: state.num + action.payload
  }
}

function multiply (state, action) {
  return {
    num: state.num * action.payload
  }
}

function createSubtract (state) {
  this.subtract = function (state, action) {
    return {
      num: state.num - action.payload
    }
  }
  return state
}

// enough example, lets run some tests.
test('use reducer', function (t) {
  var state = reducer(undefined, { type: 'n/a' })
  t.equal(state.num, 0, 'get initial state')
  state = reducer(state, {type: 'add', payload: 1})
  t.equal(state.num, 1, 'add')
  state = reducer(state, {type: 'multiply', payload: 2})
  t.equal(state.num, 2, 'multiply')
  state = reducer(state, {type: 'addThenMultiply', payload: 3})
  t.equal(state.num, 15, 'addThenMultiply')
  state = reducer(state, {type: 'subtract', payload: 4})
  t.equal(state.num, 15, 'Non-extant')
  state = reducer(state, {type: 'createSubtract', payload: 4})
  state = reducer(state, {type: 'subtract', payload: 4})
  t.equal(state.num, 11, 'created and used subtract')
  t.end()
})

test('without initial state', function (t) {
  var reducer = createReducer({
    set: function (state, action) {
      return action.payload
    },
    add: function (state, action) {
      return state + action.payload
    }
  })

  var state = undefined
  state = reducer(state, {type: 'set', payload: 200})
  t.equal(state, 200, 'set')
  state = reducer(state, {type: 'add', payload: 60})
  t.equal(state, 260, 'set')
  t.end()
})
