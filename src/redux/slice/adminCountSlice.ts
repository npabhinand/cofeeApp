import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countItem } from '../../constants/types/commonTypes';

interface countState {
    countItems: countItem;
}

const initialState= {
    countItems: {
        productCount: 0,
        userCount: 0,
        orderCount: 0,
        stockCount: 0,
        totalProfit: 0,
        shopCount: 0
    },
};

const adminCountSlice = createSlice({
    name: 'adminCount',
    initialState,
    reducers: {
        addAdminCount: (state, action: PayloadAction<countItem>) => {
            state.countItems = action.payload;
        },
        updateProductCount: (state, action: PayloadAction<number>) => {
            state.countItems.productCount = action.payload;
        },
        updateUserCount: (state, action: PayloadAction<number>) => {
            state.countItems.userCount = action.payload;
        },
        updateOrderCount: (state, action: PayloadAction<number>) => {
            state.countItems.orderCount = action.payload;
        },
        updateStockCount: (state, action: PayloadAction<number>) => {
            state.countItems.stockCount = action.payload;
        },
        updateTotalProfit: (state, action: PayloadAction<number>) => {
            state.countItems.totalProfit = action.payload;
        },
        updateShopCount: (state, action: PayloadAction<number>) => {
            state.countItems.shopCount = action.payload;
        },

    },
});

export const selectAdminCount = (state: { adminCount: countState }) => state.adminCount.countItems;

export const { addAdminCount, updateProductCount, updateUserCount, updateOrderCount,updateStockCount, updateTotalProfit, updateShopCount } = adminCountSlice.actions;

export default adminCountSlice.reducer;
// export const selectAdminCount = (state:initialState) => state.adminCount.countItems;
// export const { updateProductCount, updateUserCount, updateOrderCount, updateStockCount } = adminCountSlice.actions;
// export default adminCountSlice.reducer;
