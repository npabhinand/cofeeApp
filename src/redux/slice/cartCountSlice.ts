import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartState {
    cartCount: number;
}

const initialState: CartState = {
    cartCount: 0,
};

const cartCountSlice = createSlice({
    name: 'cartCount',
    initialState,
    reducers: {
        addCartCount: (state, action: PayloadAction<number>) => {
            state.cartCount = action.payload;
        },
    },
});

export const selectCartCount = (state: { cartCount: CartState }) => state.cartCount.cartCount;

export const { addCartCount } = cartCountSlice.actions;

export default cartCountSlice.reducer;
