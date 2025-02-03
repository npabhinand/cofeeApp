import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slice/cartSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';
import userSlice from './slice/userDataSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
        user: userSlice,
    },
});

export default store;
