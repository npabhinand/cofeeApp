import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderTypeState } from '../../constants/types/commonTypes';

const initialState: OrderTypeState = {
    orderType: 'Delivery',
};

const orderTypeSlice = createSlice({
    name: 'orderType',
    initialState,
    reducers: {
        addOrderType: (state, action: PayloadAction<string>) => {
            state.orderType = action.payload;
        },
    },
});

export const selectedOrderType = (state: { orderType: OrderTypeState }) => state.orderType.orderType;
export const { addOrderType } = orderTypeSlice.actions;

export default orderTypeSlice.reducer;
