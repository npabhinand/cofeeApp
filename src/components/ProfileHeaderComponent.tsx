/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { backIcon, } from '../assets/icons';
import { profileImage } from '../assets/images';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../redux/slice/userDataSlice';

const ProfileHeaderComponent = (props) => {
    const userData = useSelector(selectedUserData);
    const { image } = userData[0];

    const { title, buttonText, icon, imageSize } = props;
    const navigation = useNavigation();
    return (
        <View style={{ height: HEIGHT * 0.35, backgroundColor: colors.commonWhite }}>
            <View style={{ flexDirection: 'row', paddingVertical: HEIGHT * 0.06, height: HEIGHT * 0.22, backgroundColor: colors.brownColor, justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} style={{ tintColor: colors.commonWhite }} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 16, color: colors.commonWhite }}>{title}</Text>
                <Pressable>
                    <Image source={icon} style={{ tintColor: colors.commonWhite, width: 20, height: 24 }} />
                </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
                {image === undefined ? <Image source={profileImage} style={{ marginTop: -80, alignSelf: 'center', height: imageSize, width: imageSize }} /> :
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: HEIGHT * 0.16, height: HEIGHT * 0.16, backgroundColor: colors.commonWhite, marginTop: -80, borderRadius: '50%' }}>
                        <Image source={{ uri: image }} style={{ alignSelf: 'center', height: imageSize, width: imageSize, borderRadius: '50%' }} />
                    </View>}

                {buttonText === 'Change Picture' ?
                    <Pressable onPress={() => navigation.navigate('EditProfileScreen')}>
                        <Text style={{}}>{buttonText}</Text>
                    </Pressable> :
                    <Pressable onPress={() => navigation.navigate('EditProfileScreen')} style={{ backgroundColor: colors.commonBlack, height: 30, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: HEIGHT * 0.01 }}>
                        <Text style={{ color: colors.commonWhite }}>{buttonText}</Text>
                    </Pressable>}

            </View>
        </View>
    );
};

export default ProfileHeaderComponent;
