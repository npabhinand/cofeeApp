/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, SectionList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { heartIcon, emailIcon, logout, phoneIcon, profileIcon, rightArrowIcon, notificationIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { selectedUserData } from '../redux/slice/userDataSlice';
import ProfileHeaderComponent from '../components/ProfileHeaderComponent';

const ProfileScreen = () => {
    const userData = useSelector(selectedUserData);
    console.log(userData);
    const { email, name, phone } = userData[0];

    const DATA = [
        {
            title: 'User',
            data: [{ title: name, icon: profileIcon }, { title: email, icon: emailIcon }, { title: phone, icon: phoneIcon }],
        },
        {
            title: 'Settings',
            data: [{ title: 'Favourite', icon: heartIcon }, { title: 'logout', icon: logout }],
        },
    ];

    return (
        <View >
            <ProfileHeaderComponent title={'Profile'} buttonText={'Edit Profile'} icon={notificationIcon} imageSize={HEIGHT * 0.15} />
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: WIDTH * 0.05, paddingVertical: HEIGHT * 0.015, gap: 10 }}>
                        <Image source={item.icon} tintColor={colors.commonBlack} style={{ height: 20, width: 21 }} />
                        <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                        <Pressable style={{ position: 'absolute', right: WIDTH * 0.05 }}>
                            <Image source={rightArrowIcon} />
                        </Pressable>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: '600', paddingHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01 }}>{title}</Text>
                )}
            />
        </View>
    );
};

export default ProfileScreen;
