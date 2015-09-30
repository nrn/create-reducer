# create-reducer

Create a redux reducer from an object of action handling functions, keyed
by the actions they handle. Has `createReducer.compose(fns)` helper function
to combine multiple action handlers into a single action.
Big thanks to dlmanning, our conversations lead me here.

```javascript
var createReducer = require('create-reducer')

// setup handlers, object keys for action types
var handlers =
  { add: add
  , multiply: multiply
  // compose handler functions together for compound actions.
  , addThenMultiply: createReducer.compose(add, multiply)
  }

// create a reducer from the handlers, this is normaly what would be exported.
var reducer = createReducer(handlers)

// actual action handling functions, down out of the way.
function add (state, action) {
  state.num += action.num
  return state
}

function multiply (state, action) {
  state.num *= action.num
  return state
}
```
