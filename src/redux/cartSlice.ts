import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
  type: string;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const generateSKU = (product: any) => {
  //generate SKU
  const {type, id} = product;
  const timestamp = Date.now();
  return `SKU-${type.toUpperCase()}-${id}-${timestamp}`;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.sku = generateSKU(action?.payload);
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          sku: generateSKU(action?.payload),
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => {
        console.log(item, action.payload);
        return item.id !== action.payload;
      });
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) => {
      const {id, quantity} = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
