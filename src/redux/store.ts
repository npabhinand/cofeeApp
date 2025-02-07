import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slice/cartSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';
import userSlice from './slice/userDataSlice';
import priceTotalSlice from './slice/priceTotalSlice';
import dropDownSlice from './slice/dropDownSlice';
const store = configureStore({
    reducer: {
        cart: cartSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
        user: userSlice,
        totalPrice: priceTotalSlice,
        isVisible: dropDownSlice,
    },
});

export default store;
