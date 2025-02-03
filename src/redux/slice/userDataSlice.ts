/* eslint-disable quotes */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userDataItem } from "../../constants/types/commonTypes";



interface userState {
    userData: userDataItem[]
}
const initialState: userState = {
    userData: [],
};

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        addUserData: (state, action: PayloadAction<userDataItem>) => {
            const item = action.payload;
            const itemExits = state.userData.some((user) => user.email === item.email);
            if (!itemExits) {
                state.userData.push(item);
            }
        },
    },
});


export const selectedUserData = (state: { user: userState }) => state.user.userData;
export default userSlice.reducer;

export const { addUserData } = userSlice.actions;





