

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceState } from '../../constants/types/commonTypes';

const initialState: PriceState = {
    totalPrice: 0,
};

const priceTotalSlice = createSlice({
    name: 'totalPrice',
    initialState,
    reducers: {

        addTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload;
        },
        updateAddTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice += action.payload;
        },
        updateSubTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice -= action.payload;
        },

    },
});


export const selectedPrice = (state: { totalPrice: PriceState }) => state.totalPrice.totalPrice;

export const { addTotalPrice, updateAddTotalPrice, updateSubTotalPrice } = priceTotalSlice.actions;

export default priceTotalSlice.reducer;
