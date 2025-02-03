/* eslint-disable react-native/no-inline-styles */
import { View, Pressable, Alert, Image, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { back, bottomArrowIcon, logout, profile, profileIcon } from '../assets/icons';
import { dropDownProps } from '../constants/types/commonTypes';

const DropDown: React.FC<dropDownProps> = (props) => {
    const { color } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleModal = () => setIsModalVisible(!isModalVisible);
    const handleDeleteAlert = () =>
        Alert.alert('Are You want to Logout', '', [
            {
                text: 'Cancel',
                onPress: () => handleModal(),
                style: 'cancel',
            },
            {
                text: 'Sign Out',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: () => handleSignOut(),

            },
        ]);
    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('userD');
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        } catch (error) {
            console.log('error occured');
        }

    };
    const profileArray = [
        { id: 1, name: 'Profile', icon: profile, handleClick: () => { console.log('profile button pressed'); } },
        { id: 2, name: 'Sign Out', icon: logout, handleClick: handleDeleteAlert },
        { id: 3, name: 'Cancel', icon: back, handleClick: handleModal },
    ];

    return (
        <>
            <Pressable onPress={handleModal} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={profileIcon} style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, tintColor: color }} />
                <Image source={bottomArrowIcon} style={{ marginTop: HEIGHT * 0.01, tintColor: color }} />
            </Pressable>
            {/* <View style={{ position: 'absolute', right: WIDTH * 0.05, top: HEIGHT * 0.02 }}> */}
            <Modal visible={isModalVisible} onRequestClose={handleModal} transparent={true} animationType="fade">
                <TouchableWithoutFeedback style={{ flex: 1, width: WIDTH * 1.0, zIndex: 1, height: HEIGHT * 1.0 }} onPress={handleModal}>
                    <View style={{ width: WIDTH * 0.3, height: 100, alignSelf: 'flex-end', marginTop: HEIGHT * 0.13, marginRight: WIDTH * 0.02, backgroundColor: colors.commonWhite, borderRadius: 10 }}>
                        {profileArray.map((item, index) => (
                            <Pressable key={index} style={{ flexDirection: 'row', marginTop: HEIGHT * 0.01, alignItems: 'center', borderBottomWidth: 0.3, borderColor: colors.brownColor, marginHorizontal: WIDTH * 0.02 }} onPress={item.handleClick}>
                                <Image source={item.icon} style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, marginRight: WIDTH * 0.01 }} />
                                <Text style={{ color: colors.brownColor }}>{item.name}</Text>
                            </Pressable>
                        ))}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default DropDown;
