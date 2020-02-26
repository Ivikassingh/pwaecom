const initialState = {
    cart: []
  };
  

  
  function rootReducer(state = initialState, action) {
    switch(action.type){
        case "ADD_CART": state.cart=action.payload; console.log(state); return state; break; 
    }
    return state
  };
  
  export default rootReducer;