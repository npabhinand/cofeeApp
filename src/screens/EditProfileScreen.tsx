/* eslint-disable react-native/no-inline-styles */
import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import ProfileHeaderComponent from '../components/ProfileHeaderComponent';
import { shareIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../redux/slice/userDataSlice';


const EditProfileScreen = () => {
    const userData = useSelector(selectedUserData);
    const { name, email, phone } = userData[0];
    const [formData, setFormData] = useState<{}>({ name: name || '', email: email || '', phone: phone || '', password: '' });


    return (
        <View style={{ flex: 1, backgroundColor: colors.commonWhite }}>
            <ProfileHeaderComponent title={'Edit Profile'} buttonText={'Change Picture'} icon={shareIcon} imageSize={HEIGHT * 0.17} />

            <View style={{ marginTop: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.1, justifyContent: 'center' }}>
                {Object.keys(formData).map((key) => (
                    <View key={key}>
                        <Text style={{ fontWeight: '600', marginBottom: HEIGHT * 0.01, textTransform: 'capitalize' }}>{key}</Text>
                        <TextInput value={formData[key]} style={{ width: WIDTH * 0.8, borderWidth: 0.5, height: 45, marginBottom: HEIGHT * 0.02, borderRadius: 10, paddingLeft: 10 }} />
                    </View>
                ))}
                <Pressable style={{ width: WIDTH * 0.8, height: HEIGHT * 0.056, backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10, marginTop: HEIGHT * 0.05 }}>
                    <Text style={{ textAlign: 'center', color: colors.commonWhite, fontWeight: '600' }}>Update</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default EditProfileScreen;

