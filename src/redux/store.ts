import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slice/cartSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
    },
});

export default store;
