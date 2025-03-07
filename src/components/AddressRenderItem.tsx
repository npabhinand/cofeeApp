/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import { deleteIcon, editIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import AddAddressComponent from './AddAddressComponent';
import { contactProps } from '../constants/types/commonTypes';
import { selectedUserData } from '../redux/slice/userDataSlice';


const AddressRenderItem: React.FC<contactProps> = (props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { item, setUpdate, update } = props;
    // const dispatch = useDispatch();
    const userData = useSelector(selectedUserData);
    const { id } = userData[0];
    console.log(id);
    const onDeleteItem = () => {
        firestore()
            .collection('address')
            .doc(item.id)
            .delete()
            .then(() => {
                console.log('address deleted!');
            });
        setUpdate(!update);
    };
    const handleDeleteAlert = () =>
        Alert.alert('Are You sure want to delete Address', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: onDeleteItem,

            },
        ]);
    // const handleSelected = () => {

    //     dispatch(updateSelectionContact({
    //         id: item.id,
    //         selected: true,
    //     }));
    //     Alert.alert('Address selected successfully');
    //     navigation.goBack();
    // };

    const handleSelected = async () => {
        try {

            await firestore().collection('address')
                .where('userId', '==', id)
                .where('selected', '==', true)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {


                        firestore().collection('address').doc(doc.id).update({
                            'selected': false,
                        })
                            .then(() => {
                                console.log('Document successfully updated!');
                            })
                            .catch((error) => {
                                console.error('Error updating document: ', error);
                            });
                    });
                })
                .catch((error) => {
                    console.error('Error getting documents: ', error);
                });

            await firestore().collection('address').doc(item.id).update({
                'selected': true,
            });
        }
        catch (err) {
            console.log('error while selecting in firestore');
        }
        Alert.alert('Address selected successfully');
        setUpdate(!update);
    };

    return (
        <Pressable style={{ backgroundColor: item.selected ? `${colors.brownColor}50` : `${colors.grayColor}10`, width: WIDTH * 0.9, height: HEIGHT * 0.2, alignSelf: 'center', padding: HEIGHT * 0.03, borderRadius: 20, marginTop: HEIGHT * 0.02 }}
            onLongPress={() => handleSelected()}
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
                <AddAddressComponent setModalVisible={setModalVisible} addressId={item.id} address={item.address} name={item.name} phone={item.phone} selected={item.selected} setUpdate={setUpdate} update={update} />
            </Modal>
        </Pressable>
    );
};

export default AddressRenderItem;
