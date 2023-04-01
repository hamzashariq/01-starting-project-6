import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalPrice = state.totalPrice + (action.item.price * action.item.amount);

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    };
  }
  else if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];

    if (existingItem) {
      const updatedTotalPrice = state.totalPrice - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== existingItem.id);
      }
      else {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex].amount -= 1;
      }

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice
      };
    }
  }
  else if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return state;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  }

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
};

export default CartProvider;