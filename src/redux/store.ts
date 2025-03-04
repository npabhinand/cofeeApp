import { configureStore } from '@reduxjs/toolkit';

import favoriteSlice from './slice/favoriteSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';
import userSlice from './slice/userDataSlice';
import priceTotalSlice from './slice/priceTotalSlice';
import orderTypeSlice from './slice/orderTypeSlice';
import bookingTableSlice from './slice/bookingTableSlice';
import cartSlice from './slice/cartSlice';
import adminCountSlice from './slice/adminCountSlice'
const store = configureStore({
    reducer: {
        favorite: favoriteSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
        user: userSlice,
        totalPrice: priceTotalSlice,
        orderType: orderTypeSlice,
        bookingTable:bookingTableSlice,
        cart: cartSlice,
        adminCount:adminCountSlice,
    },
});

export default store;
