import { configureStore } from '@reduxjs/toolkit';

import favoriteSlice from './slice/favoriteSlice';
import contactSlice from './slice/contactSlice';
import cartCountSlice from './slice/cartCountSlice';
import userSlice from './slice/userDataSlice';
import priceTotalSlice from './slice/priceTotalSlice';

const store = configureStore({
    reducer: {
        favorite: favoriteSlice,
        contact: contactSlice,
        cartCount: cartCountSlice,
        user: userSlice,
        totalPrice: priceTotalSlice,
        // counts: countSlice,
    },
});

export default store;
