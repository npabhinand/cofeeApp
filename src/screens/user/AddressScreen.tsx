/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, SafeAreaView, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { useNavigation } from '@react-navigation/native';
import { backIcon } from '../../assets/icons';
import { colors } from '../../constants/colors';
import AddressRenderItem from '../../components/AddressRenderItem';
import AddAddressComponent from '../../components/AddAddressComponent';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../../redux/slice/userDataSlice';
// import { useSelector } from 'react-redux';
// import { addedContacts } from '../redux/slice/contactSlice';


const AddressScreen = () => {

    // const addressList = useSelector(addedContacts);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [addressList, setAddressList] = useState();
    const [update, setUpdate] = useState<boolean>(false);
    const userData = useSelector(selectedUserData);
    const userEmail = userData[0].email;
    // console.log(section)
    useEffect(() => {
        fetchData();
    }, [update]);
    const fetchData = async () => {
        const addresses = [];
        const addressRef = await firestore().collection('address').where('userId', '==', userEmail).get();
        addressRef.forEach((doc) => {
            addresses.push({ ...doc.data(), id: doc.id });
        });
        setAddressList(addresses);
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.3 }}>Add Adress</Text>
            </View>
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
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Add Adress</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default AddressScreen;
