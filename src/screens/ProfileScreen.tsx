/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, SectionList, Alert } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { heartIcon, emailIcon, logout, phoneIcon, profileIcon, rightArrowIcon, notificationIcon, nameIcon, documentIcon, beansIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { selectedUserData } from '../redux/slice/userDataSlice';
import ProfileHeaderComponent from '../components/ProfileHeaderComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../routes/AppNavigator';

const ProfileScreen = () => {
    const userData = useSelector(selectedUserData);
    const { email, name, phone, userType } = userData[0];
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const DATA = [
        {
            title: 'User Details', data: [
                { id: 1, title: name, icon: nameIcon },
                { id: 2, title: userType, icon: profileIcon },
                { id: 3, title: email, icon: emailIcon },
                { id: 4, title: phone, icon: phoneIcon },
            ],
        },
        userType === 'admin' ?
            {
                title: 'Settings',
                data: [
                    { id: 5, title: 'Products', icon: beansIcon, onClick: () => navigation.navigate('ProductListScreen') },
                    { id: 6, title: 'Stocks', icon: documentIcon, onClick: () => navigation.navigate('StockListScreen') },
                    { id: 7, title: 'Logout', icon: logout, onClick: () => handleLogoutAlert() },
                ],
            } : {
                title: 'Settings',
                data: [
                    { id: 8, title: 'Favourite', icon: heartIcon, onClick: () => navigation.navigate('FavoriteScreen') },
                    {id:10, title:'My Orders', icon:documentIcon, onClick:()=>navigation.navigate('UserOrderListScreen')},
                    { id: 11, title: 'Logout', icon: logout, onClick: () => handleLogoutAlert() },
                ],
            }];

    const handleLogoutAlert = () =>
        Alert.alert('Are You want to Logout', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('closed'),
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

    return (
        <View >
            <ProfileHeaderComponent title={'Profile'} buttonText={'Edit Profile'} icon={notificationIcon} imageSize={HEIGHT * 0.15} />
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProfileItem item={item} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: '600', paddingHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01 }}>{title}</Text>
                )}
            />
        </View>
    );
};

export default ProfileScreen;


const ProfileItem: React.FC<any> = (props) => {
    const { item } = props;
    // console.log(item.onClick)
    return (
        <Pressable style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: WIDTH * 0.05, paddingVertical: HEIGHT * 0.015, gap: 10 }} onPress={item.onClick}>
            <Image source={item.icon} tintColor={colors.commonBlack} style={{ height: 20, width: 21 }} />
            <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.title}</Text>
            <Pressable style={{ position: 'absolute', right: WIDTH * 0.05 }}>
                <Image source={rightArrowIcon} />
            </Pressable>

        </Pressable>
    );
};

