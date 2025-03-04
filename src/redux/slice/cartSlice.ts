import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../constants/types/commonTypes';


interface cartState {
    carts: CartItem[];
}

const initialState: cartState = {
    carts: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const itemExits = state.carts.some((cartItem) => cartItem.itemId === item.itemId && cartItem.orderType===item.orderType);
            if (!itemExits) {
                state.carts.push(item);
            }
        },
        IncreaseCartQuantity: (state, action: PayloadAction<{itemId:string; orderType:string;}>) => {
            const item = state.carts.find((cart) => cart.itemId === action.payload.itemId && cart.orderType===action.payload.orderType);
            if (item) {
                item.quantity +=1;
            }
        },
        DecreaseCartQuantity: (state, action: PayloadAction<{itemId:string; orderType:string;}>) => {
            const item = state.carts.find((cart) => cart.itemId === action.payload.itemId  && cart.orderType===action.payload.orderType);
            if (item) {
                item.quantity -= 1;
            }
        },   
        deleteCart: (state, action: PayloadAction<{itemId:string;orderType:string;}>) => {
            state.carts = state.carts.filter((cartItem) =>!(cartItem.itemId === action.payload.itemId && cartItem.orderType===action.payload.orderType));
        },
    },
});

export const selectedCarts = (state: { cart: cartState }) => state.cart.carts;


export const { addCart, deleteCart, IncreaseCartQuantity,DecreaseCartQuantity  } = cartSlice.actions;

export default cartSlice.reducer;



