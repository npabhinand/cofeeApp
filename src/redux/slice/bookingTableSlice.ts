import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingItem } from '../../constants/types/commonTypes';



interface bookingTableState {
    bookingTables: BookingItem[]
}

const initialState: bookingTableState = {
    bookingTables: [],
};

const bookingTableSlice = createSlice({
    name: 'bookingTable',
    initialState,
    reducers: {
        addbookingTable: (state, action: PayloadAction<BookingItem>) => {
            state.bookingTables=[];
            state.bookingTables.push(action.payload);

        },
        updatebookingTable: (state, action: PayloadAction<BookingItem>) => {
            const updateItem = action.payload;
            const item = state.bookingTables.find((bookingTable) => bookingTable.shopId === updateItem.shopId);
            if (item) {
                item.name = updateItem.name;
                item.shopId = updateItem.shopId;
                item.tables = updateItem.tables;
            }
        },        

    deleteTable: (state, action: PayloadAction<{shopId: number; tableId: string;}>) => {
        const item = state.bookingTables.find((bookingTable) => bookingTable.shopId === action.payload.shopId);
        if (item) {
            item.tables = item.tables.filter(table => table !== action.payload.tableId);
        }
    }
    
},        
});

export const addedbookingTables = (state: { bookingTable: bookingTableState }) => state.bookingTable.bookingTables;
export const { addbookingTable, updatebookingTable,deleteTable } = bookingTableSlice.actions;

export default bookingTableSlice.reducer;
