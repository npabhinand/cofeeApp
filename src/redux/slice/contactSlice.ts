import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ContactItem {
    id: number;
    name: string;
    phone: number;
    address: string;
    selected: boolean;
}

interface contactState {
    contacts: ContactItem[]
}

const initialState: contactState = {
    contacts: [],
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<ContactItem>) => {
            const item = action.payload;
            const itemExits = state.contacts.some((contacts) => contacts.id === item.id);
            if (!itemExits) {
                state.contacts.push(item);
            }

        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        },
        updateContact: (state, action: PayloadAction<ContactItem>) => {
            const updateItem = action.payload;
            const item = state.contacts.find((contact) => contact.id === updateItem.id);
            if (item) {
                item.name = updateItem.name;
                item.phone = updateItem.phone;
                item.address = updateItem.address;
                item.selected = updateItem.selected;
            }
        },
        updateSelectionContact: (state, action: PayloadAction<{ id: number; selected: boolean }>) => {
            state.contacts = state.contacts.map((contact) =>
                contact.id === action.payload.id
                    ? { ...contact, selected: action.payload.selected }
                    : { ...contact, selected: false }
            );
        },
    },
});

export const addedContacts = (state: { contact: contactState }) => state.contact.contacts;
export const { addContact, deleteContact, updateContact, updateSelectionContact } = contactSlice.actions;

export default contactSlice.reducer;
