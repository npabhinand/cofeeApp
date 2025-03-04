/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { backIcon, shareIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, selectedUserData } from '../redux/slice/userDataSlice';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { profileImage } from '../assets/images';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = () => {
    const userData = useSelector(selectedUserData);
    const navigation = useNavigation();
    const { name, email, phone, userType } = userData[0];
    const [formData, setFormData] = useState({ name: name || '', email: email || '', phone: phone || '', password: '' });
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState<string>(userData[0].image || '');
    const [loading, setLoading] = useState<boolean>(false);

    const auth = getAuth();
    const dispatch = useDispatch();
    const reauthenticate = (password:string) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        return reauthenticateWithCredential(user, credential);
    };

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.3, includeBase64: true }, (response) => {
            if (response.assets && response.assets[0]) {
                const base64String = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                setImage(base64String);
            } else {
                console.log('Image selection cancelled or no assets found');
            }
        });
    };


    const updateUserDetails = async () => {
        const UserDetails = {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            userType: userType,
            image,
        };

        await AsyncStorage.setItem('userD', JSON.stringify(UserDetails));
        dispatch(addUserData(UserDetails));
        setLoading(false);
        Alert.alert('Profile updated successfully');
        console.log('User details updated successfully!');
    }

    const onPressUpdate = async () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await reauthenticate(formData.password);
            await updateEmail(auth.currentUser, formData.email);

            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                image,
            };
            await firestore().collection('user').doc(auth.currentUser.uid).update(updateData);
            await updateUserDetails();
        } catch (error) {
            setLoading(false);
            if (error.message === '[auth/wrong-password] The password is invalid or the user does not have a password.') {
                Alert.alert('Incorrect password');
            }
            console.log('Error occurred while updating:', error);
        }
    };


    const onChangeText = (key, value) => {
        if (key === 'phone') {
            value = value.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };



    return (
        <View style={{ flex: 1, backgroundColor: colors.commonWhite }}>
            <View style={{ height: HEIGHT * 0.35, backgroundColor: colors.commonWhite }}>
                <View style={{ flexDirection: 'row', paddingVertical: HEIGHT * 0.06, height: HEIGHT * 0.22, backgroundColor: colors.brownColor, justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image source={backIcon} style={{ tintColor: colors.commonWhite }} />
                    </Pressable>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: colors.commonWhite }}>Edit Profile</Text>
                    <Pressable>
                        <Image source={shareIcon} style={{ tintColor: colors.commonWhite, width: 20, height: 24 }} />
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {image === '' ? (
                        <Pressable onPress={handleImagePick}>
                            <Image source={profileImage} style={{ marginTop: -60, alignSelf: 'center' }} />
                        </Pressable>
                    ) : (
                        <Pressable style={{ alignItems: 'center', justifyContent: 'center', width: WIDTH * 0.32, height: WIDTH * 0.32, backgroundColor: colors.commonWhite, marginTop: -60, borderRadius: '50%' }} onPress={handleImagePick}>
                            <Image source={{ uri: image }} style={{ alignSelf: 'center', width: WIDTH * 0.30, height: WIDTH * 0.3, borderRadius: '50%' }} />
                        </Pressable>
                    )}
                    <Text style={{ fontSize: 16 }}>Change Image</Text>
                </View>
            </View>

            <View style={{ marginTop: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.1, justifyContent: 'center' }}>
                {Object.keys(formData).map((key) => (
                    <View key={key}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', marginBottom: HEIGHT * 0.01, textTransform: 'capitalize' }}>{key}</Text>
                            <Text style={{ color: colors.redColor }}>{errors[key]}</Text>
                        </View>
                        <TextInput
                            value={formData[key]}
                            secureTextEntry={key === 'password'}
                            style={{
                                width: WIDTH * 0.8,
                                borderWidth: 0.5,
                                height: 45,
                                marginBottom: HEIGHT * 0.02,
                                borderRadius: 10,
                                paddingLeft: 10,
                                borderColor: errors[key] ? colors.redColor : colors.commonBlack,
                            }}
                            onChangeText={(text) => onChangeText(key, text)}
                        />
                    </View>
                ))}
                <Pressable
                    style={{
                        width: WIDTH * 0.7,
                        height: HEIGHT * 0.056,
                        backgroundColor: colors.brownColor,
                        justifyContent: 'center',
                        borderRadius: 10,
                        marginTop: HEIGHT * 0.05,
                        alignSelf: 'center',
                    }}
                    onPress={onPressUpdate}
                >{loading ? <ActivityIndicator size={'small'} color={colors.commonWhite} /> :
                    <Text style={{ textAlign: 'center', color: colors.commonWhite, fontWeight: '600' }}>Update</Text>}

                </Pressable>
            </View>
        </View>
    );
};

export default EditProfileScreen;
