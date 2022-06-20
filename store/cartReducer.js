import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, child, push, update, setPriority, remove, set } from "firebase/database";
import { v4 } from 'uuid'

export const addCartFirebase = createAsyncThunk('orders/addCartFirebase',
  async ({ name, phone, address }, { getState }) => {
    try {
      const db = getDatabase();
      const idAdd = v4();

      const { cartItems, cartTotalAmount } = getState().cart

      await set(ref(db, 'orders/' + idAdd),
        {
          id: idAdd,
          cartItems,
          cartTotalAmount,
          // 0: to confirm
          status: 0,
          name,
          phone,
          address
        })
    } catch (error) {
      console.log(error)
    }
  })
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action) {

      const existingIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }

    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex] = {
          ...state.cartItems[itemIndex],
          cartQuantity: state.cartItems[itemIndex].cartQuantity - 1,
        }
      } else {
        if (state.cartItems[itemIndex].cartQuantity === 1) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.product.id !== action.payload.product.id
          )
          state.cartItems = nextCartItems;
        }
      }
    },
    getTotals(state, action) {
      let { total, quantityCart } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { product, cartQuantity } = cartItem;
          const itemTotal = product.price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantityCart += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantityCart: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantityCart;
      state.cartTotalAmount = total;
    },

  },
  extraReducers: {
    [addCartFirebase.fulfilled]: (state, action) => {
      console.log("Add cart to firebase successfully");
      state.cartItems = []
      state.cartTotalQuantity = 0
      state.cartTotalAmount = 0
    },
    [addCartFirebase.rejected]: (state, action) => {
      console.log("Add cart to firebase error");
    },
  },
});

export const { addCart, addToCart, decreaseCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;