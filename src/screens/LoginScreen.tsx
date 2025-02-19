/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, Image, Pressable, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { colors } from '../constants/colors';
import { notVisibleIcon, visibleIcon } from '../assets/icons';
import { background1 } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { addUserData } from '../redux/slice/userDataSlice';

const LoginScreen = () => {
    const [formData, setFormData] = useState<{ email: string; password: string; }>({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        let newErrors: any = {};


        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required `;
            }
        });
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !reg.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        try {
            setLoading(true);
            const userCredential = await auth().signInWithEmailAndPassword(formData.email, formData.password);
            const user = userCredential.user;
            const userQuerySnapshot = await firestore().collection('user').doc(user.uid).get();
            console.log(user.uid);
            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.data();
                console.log('userDoc', userDoc);
                await AsyncStorage.setItem('userD', JSON.stringify(userDoc));
                dispatch(addUserData(userDoc));
                setLoading(false);
                if (userDoc?.userType === 'admin') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AdminHomeScreen' }],
                    });
                } else {
                    console.log('true1', userDoc.userType);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeTabs' }],
                    });
                    console.log('checking');
                }
            } else {
                setLoading(false);
                Alert.alert('User not found', 'Please check your credentials.');

            }
        } catch (error) {
            console.log(error);
            Alert.alert('Invalid email or password');
            setLoading(false);
        }

    };

    // };


    const onChangeText = (text: string, key: string) => {
        setFormData((prev) => ({ ...prev, [key]: text }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };
    const handlePasswordVisibile = () => {
        setShowPassword(!showPassword);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.matteBlack }}>
            {loading ? <>
                <ActivityIndicator size="large" style={{ width: WIDTH * 1, flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: colors.commonWhite }} color={colors.brownColor} />
            </> :
                <View>
                    <Image source={background1} style={{ width: WIDTH * 1.0, height: HEIGHT * 0.4, position: 'absolute' }} />
                    {/* <View style={{ alignItems: 'center', marginTop: HEIGHT * 0.02 }}> */}


                    <View style={{ alignContent: 'center', paddingHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.36, backgroundColor: `${colors.commonBlack}10` }}>
                        {/* <Image source={} */}
                        <Text style={{ color: colors.commonWhite, fontSize: 24, fontWeight: 'bold', marginTop: HEIGHT * 0.07, marginBottom: HEIGHT * 0.02, textAlign: 'center' }}>Login to your account</Text>

                        {Object.keys(formData).map((key) => (
                            <View style={{ marginTop: HEIGHT * 0.01 }} key={key} >
                                <Text style={{ color: colors.redButtonColor, textAlign: 'right' }}>{errors[key]}</Text>

                                <View style={{ width: WIDTH * 0.9, height: HEIGHT * 0.056, backgroundColor: `${colors.grayColor}50`, borderColor: errors[key] ? colors.redColor : colors.commonWhite, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05, borderRadius: 10 }}>
                                    <TextInput
                                        style={{ color: colors.commonWhite, alignSelf: 'center' }}
                                        placeholderTextColor={colors.commonWhite}
                                        placeholder={`Enter ${key}`}
                                        secureTextEntry={key === 'password' ? showPassword : false}
                                        onChangeText={(text) => onChangeText(text, key)}
                                        inlineImageLeft={visibleIcon}
                                    />
                                    {(key === 'password') ?
                                        <Pressable style={{}} onPress={handlePasswordVisibile}>
                                            <Image source={showPassword ? visibleIcon : notVisibleIcon} tintColor={colors.grayColor} />
                                        </Pressable> : null
                                    }
                                </View>
                            </View>
                        ))}

                        <Text style={{ color: colors.commonWhite, textAlign: 'right', marginTop: HEIGHT * 0.01 }}>
                            Forgot Password?
                        </Text>


                        <Pressable style={{ height: HEIGHT * 0.06, width: WIDTH * 0.9, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: HEIGHT * 0.02 }} onPress={() => handleLogin()}>
                            <Text style={{ fontWeight: 'bold', color: colors.commonWhite }}>Login</Text>
                        </Pressable>

                        <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: HEIGHT * 0.05, justifyContent: 'center' }}>
                            <Text style={{ color: colors.commonWhite }}>
                                Don't have an account ?
                            </Text>
                            <Text style={{ color: colors.commonWhite }}> Register</Text>

                        </View>
                    </View>
                    {/* </View> */}
                </View>
            }
        </SafeAreaView >
    );
};

export default LoginScreen;
