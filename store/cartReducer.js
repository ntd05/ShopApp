import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const addCartFirebase = createAsyncThunk('cart/addCartFirebase',
  async ({ product }, { rejectWithValue }) => {

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
    addCart: (state, action) => {
      const { product } = action.payload
      state.cartItems.push(product);
    },
    addToCart(state, action) {
      
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      //console.log(existingIndex);

        
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }
      //console.log(state.cartItems);
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
    // addToCart(state, action) {
    //     // console.log(action.payload);
    //   //uid is the unique id of the item
    //   const { product } = action.payload;

    //   const find = state.cartItems.find((item) => item.id === product.id);
    //   if (find) {
    //     return state.cartItems.map((item) =>
    //       item.id === product.id
    //         ? {
    //             ...item,
    //             quantity: item.quantity + 1,
    //           }
    //         : item
    //     );
    //   } else {
    //     state.cartItems.push({
    //       ...product,
    //       quantity: 1,
    //     });
    //   }
    //},

  },
  extraReducers: {
    [addCartFirebase.pending]: (state, action) => {

    },
    [addCartFirebase.fulfilled]: (state, action) => {

    },
    [addCartFirebase.rejected]: (state, action) => {

    },
  },
});

export const { addCart, addToCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;