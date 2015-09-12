var createStore = require('./index')
var test = require('tape')

// setup handlers, object keys for action types
var handlers =
  { add: add
  , multiply: multiply
  // compose handler functions together for compound actions.
  , addThenMultiply: createStore.compose(add, multiply)
  }

// create a store from the handlers, this is normaly what would be exported.
var store = createStore(handlers)

// actual action handling functions, down out of the way.
function add (store, action) {
  store.num += action.num
  return store
}

function multiply (store, action) {
  store.num *= action.num
  return store
}

// enough example, lets run some tests.
test('use store', function (t) {
  var state = {num: 0}
  state = store(state, {type: 'add', num: 1})
  t.equal(state.num, 1, 'add')
  state = store(state, {type: 'multiply', num: 2})
  t.equal(state.num, 2, 'multiply')
  state = store(state, {type: 'addThenMultiply', num: 3})
  t.equal(state.num, 15, 'addThenMultiply')
  t.end()
})

