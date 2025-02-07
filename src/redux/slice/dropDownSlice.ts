import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dropDownState } from '../../constants/types/commonTypes';




const initialState: dropDownState = {
    isVisible: false,
};

const dropDownSlice = createSlice({
    name: 'isVisible',
    initialState,
    reducers: {
        addModalVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    },
});

export const selectVisibleModal = (state: { isVisible: dropDownState }) => state.isVisible.isVisible;

export const { addModalVisible } = dropDownSlice.actions;

export default dropDownSlice.reducer;
