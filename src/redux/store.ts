import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slice/cartSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';
import userSlice from './slice/userDataSlice';
import priceTotalSlice from './slice/priceTotalSlice';
// import dropDownSlice from './slice/dropDownSlice';
// import countSlice from './slice/CountSlice';
const store = configureStore({
    reducer: {
        cart: cartSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
        user: userSlice,
        totalPrice: priceTotalSlice,
        // counts: countSlice,
        // isVisible: dropDownSlice,
    },
});

export default store;
