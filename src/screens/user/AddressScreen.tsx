/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, SafeAreaView, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import AddressRenderItem from '../../components/AddressRenderItem';
import AddAddressComponent from '../../components/AddAddressComponent';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import HeaderComponent from '../../components/HeaderComponent';


const AddressScreen = () => {

    // const addressList = useSelector(addedContacts);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [addressList, setAddressList] = useState();
    const [update, setUpdate] = useState<boolean>(false);
    const userData = useSelector(selectedUserData);
    const { id } = userData[0];
    // console.log(section)
    useEffect(() => {
        fetchData();
    }, [update]);

    const fetchData = async () => {
        const addresses: any = [];
        const addressRef = await firestore().collection('address').where('userId', '==', id).get();
        addressRef.forEach((doc) => {
            addresses.push({ ...doc.data(), id: doc.id });
        });
        setAddressList(addresses);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            <HeaderComponent header={'Add Address'} />
            {/*  */}
            <FlatList
                data={addressList}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <AddressRenderItem item={item.item} setUpdate={setUpdate} update={update} />
                )}
            />
            {/*  */}
            <Modal visible={modalVisible} animationType="slide">
                <AddAddressComponent setModalVisible={setModalVisible} setUpdate={setUpdate} update={update} />
            </Modal>
            {/*  */}
            <Pressable style={{ position: 'absolute', width: WIDTH * 0.9, height: HEIGHT * 0.06, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}
                onPress={() => setModalVisible(true)}>
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Add Address</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default AddressScreen;

