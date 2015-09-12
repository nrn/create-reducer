# create-store

Create a redux store from an object of action handling functions, keyed
by the actions they handle. Has `createStore.compose(fns)` helper function
to combine multiple action handlers into a single action.
Big thanks to dlmanning, our conversations lead me here.

```javascript
var createStore = require('create-store')

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
```
