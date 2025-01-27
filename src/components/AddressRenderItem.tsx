/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { deleteIcon, editIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import AddAddressComponent from './AddAddressComponent';
import { useDispatch } from 'react-redux';
import { deleteContact, updateSelectionContact } from '../redux/slice/contactSlice';
import { useNavigation } from '@react-navigation/native';

interface contactProp {
    item: {
        id: number;
        name: string;
        phone: number;
        address: string;
        selected: boolean;
    };
}
const AddressRenderItem: React.FC<contactProp> = (props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation();
    const { item, } = props;
    const dispatch = useDispatch();

    const handleDeleteAlert = () =>
        Alert.alert('Are You sure want to delete Address', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteContact(item.id)) },
        ]);
    const handleSelected = () => {

        dispatch(updateSelectionContact({
            id: item.id,
            selected: true,
        }));
        Alert.alert('Address selected successfully');
        navigation.goBack();
    };

    return (
        <Pressable style={{ backgroundColor: item.selected ? `${colors.brownColor}50` : `${colors.grayColor}10`, width: WIDTH * 0.9, height: HEIGHT * 0.2, alignSelf: 'center', padding: HEIGHT * 0.03, borderRadius: 20, marginTop: HEIGHT * 0.02 }}
            onPress={() => handleSelected()}
        >
            <View style={{ flexDirection: 'row', gap: WIDTH * 0.04 }}>
                <View style={{ width: WIDTH * 0.5 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: HEIGHT * 0.01 }}>{item.name}</Text>
                    <Text style={{ color: colors.grayColor }}>{item.phone}</Text>
                </View>
                <Pressable style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }} onPress={() => setModalVisible(true)}>
                    <Image source={editIcon} />
                </Pressable>
                <Pressable style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }} onPress={handleDeleteAlert}>
                    <Image source={deleteIcon} style={{ tintColor: colors.grayColor, width: WIDTH * 0.04, height: WIDTH * 0.04 }} />
                </Pressable>
            </View>
            <Text style={{ marginTop: HEIGHT * 0.03 }}>{item.address}</Text>
            <Modal visible={modalVisible} animationType="slide">
                <AddAddressComponent setModalVisible={setModalVisible} id={item.id} address={item.address} name={item.name} phone={item.phone} selected={item.selected} />
            </Modal>
        </Pressable>
    );
};

export default AddressRenderItem;
