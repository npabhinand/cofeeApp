/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../constants/colors';
import { backIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../redux/slice/contactSlice';


interface addresProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    name: string;
    phone: number;
    address: string;
    selected: boolean;
}
const AddAddressComponent: React.FC<addresProps> = (props) => {
    const { id, name, address, phone, selected } = props;

    const { setModalVisible } = props;
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState<string>(name || '');
    const [inputPhone, setInputPhone] = useState<number>(phone || null);
    const [inputAddress, setInputAddress] = useState<string>(address || '');
    const AddOrUpdateAddress = () => {
        if (id) {
            dispatch(updateContact({
                id: id,
                name: inputName,
                phone: inputPhone,
                address: inputAddress,
                selected: selected,
            }));
        } else {
            // Add new contact
            dispatch(addContact({
                id: Date.now(),
                name: inputName,
                phone: inputPhone,
                address: inputAddress,
                selected: false,
            }));
        }
        Alert.alert('Successfully address Added');
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteColor, paddingHorizontal: WIDTH * 0.05 }}>
            <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.1 }}>
                <Pressable onPress={() => setModalVisible(false)}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.2 }}>Add New Address</Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.04, gap: HEIGHT * 0.01 }}>
                <Text style={{ fontWeight: '600', marginTop: HEIGHT * 0.01 }}>Name</Text>
                <TextInput placeholder="Type Here" style={{ width: WIDTH * 0.9, borderWidth: 1, height: HEIGHT * 0.055, paddingLeft: WIDTH * 0.05, borderRadius: 5 }} onChangeText={setInputName} value={inputName} />
                <Text style={{ fontWeight: '600', marginTop: HEIGHT * 0.01 }}>Phone</Text>
                <TextInput placeholder="Type Here" style={{ width: WIDTH * 0.9, borderWidth: 1, height: HEIGHT * 0.055, paddingLeft: WIDTH * 0.05, borderRadius: 5 }} onChangeText={setInputPhone} value={inputPhone} />
                <Text style={{ fontWeight: '600', marginTop: HEIGHT * 0.01 }}>Address</Text>
                <TextInput placeholder="Type Here" style={{ width: WIDTH * 0.9, borderWidth: 1, height: HEIGHT * 0.15, paddingLeft: WIDTH * 0.05, borderRadius: 5 }} multiline={true} onChangeText={setInputAddress} value={inputAddress} />
            </View>
            <Pressable style={{ position: 'absolute', width: WIDTH * 0.9, height: HEIGHT * 0.06, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}
                onPress={AddOrUpdateAddress}>
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{id ? 'update Address' : 'Add New Adress'}</Text>
            </Pressable>
        </View>
    );
};

export default AddAddressComponent;
