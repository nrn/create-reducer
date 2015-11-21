# create-reducer

Create a redux reducer from an object of action handling functions, keyed
by the actions they handle. Has `createReducer.compose(fns)` helper function
to combine multiple action handlers into a single action.
Big thanks to dlmanning, our conversations lead me here.

```javascript
var createReducer = require('create-reducer')

// setup handlers, object keys for action types
var handlers = {
  add: add,
  multiply: multiply,
  // compose handler functions together for compound actions.
  addThenMultiply: createReducer.compose(add, multiply)
}

module.exports = createReducer(handlers, function () {
  return { num: 0 }
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
```
