import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';


function recipeReducer(state = [], action) {
  switch (action.type) {
    case types.GET_RECIPE_SUCCESS:
      debugger;
      return [...action.data];
    default:
      return state;
  }
}
function productReducer(state = [], action) {
  switch (action.type) {
    case types.GET_PRODUCT_SUCCESS:
      debugger;
      return [...action.data];
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  table: recipeReducer,
  product: productReducer
});

export default rootReducer;
