import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    name: string;
    coffeeType: string;
    description: string;
    type: { size: string; price: number; }[],
    rating: number;
    img: number;
    quantity: number;
}
interface CartState {
    carts: CartItem[];
}

const initialState: CartState = {
    carts: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const itemExits = state.carts.some((cartItem) => cartItem.id === item.id);
            if (!itemExits) {
                state.carts.push(item);
            }
        },
        deleteCart: (state, action: PayloadAction<number>) => {
            state.carts = state.carts.filter((cartItem) => cartItem.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.carts.find((cartItem) => cartItem.id === id)
            if (item) {
                item.quantity = quantity;
            }
        }
    }
})

export const selectedCarts = (state: { cart: CartState }) => state.cart.carts;


export const { addCart, deleteCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;