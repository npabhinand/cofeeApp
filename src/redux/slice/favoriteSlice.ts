import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteItem } from '../../constants/types/commonTypes';


interface favoriteState {
    favorites: FavoriteItem[];
}

const initialState: favoriteState = {
    favorites: [],
};
const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            const item = action.payload;
            const itemExits = state.favorites.some((favoriteItem) => favoriteItem.id === item.id);
            if (!itemExits) {
                state.favorites.push(item);
            }
        },
        deleteFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter((favoriteItem) => favoriteItem.id !== action.payload);
        },
    },
});

export const selectedFavorites = (state: { favorite: favoriteState }) => state.favorite.favorites;


export const { addFavorite, deleteFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
