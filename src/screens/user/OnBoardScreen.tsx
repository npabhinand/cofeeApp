/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import { onBoardScreenData } from '../../constants/data/dataArray';
import { colors } from '../../constants/colors';
import { background1 } from '../../assets/images';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { addUserData } from '../../redux/slice/userDataSlice';
import { addCartCount } from '../../redux/slice/cartCountSlice';
import { addCart } from '../../redux/slice/cartSlice';
import { RootStackParamList } from '../../routes/AppNavigator';
// import { addCartCount } from '../../redux/slice/cartCountSlice';

const OnBoardScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loginUser, setLoginUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleUser();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (loginUser) {
            fetchCartItems();
        }
    }, [loginUser]);

    const handleUser = async () => {
        try {
            const fetchLoginDetails = await AsyncStorage.getItem('userD');
            if (fetchLoginDetails != null) {
                const loginDetails = JSON.parse(fetchLoginDetails);
                dispatch(addUserData(loginDetails));
                setLoginUser(loginDetails);
            }
                else {
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.log('error occurred while fetching user data from async storage');
        }
    };

    const fetchCartItems = async () => {
        try {
            const cartItemRef = firestore().collection('cartItem').where('userId', '==', loginUser.id);
            const snapshot = await cartItemRef.get();
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.itemId) {
                    console.log('Adding item to cart:', data);
                    dispatch(addCart(data));
                } else {
                    console.log('Missing itemId in document:', doc.id);
                }
            });

            dispatch(addCartCount(snapshot.size));
            // console.log('dispatch', snapshot.size);
            if (loginUser.userType === 'admin') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AdminHomeScreen' }],
                });
            } else if (loginUser.userType === 'user') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeTabs' }],
                });
            }
        } 
        catch (error) {
            console.log('error while counting cart documents');
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.commonBlack }}>
            <Image source={background1} style={{ width: WIDTH * 1.00, position: 'absolute', height: HEIGHT * 0.6 }} />

            <View style={{ marginTop: HEIGHT * 0.56, backgroundColor: `${colors.commonBlack}70`, alignItems: 'center', gap: HEIGHT * 0.02 }}>

                <Text style={{ color: colors.commonWhite, fontSize: HEIGHT * 0.04, fontWeight: 'bold' }}>Fall in Love With</Text>
                <Text style={{ color: colors.commonWhite, fontSize: HEIGHT * 0.04, fontWeight: 'bold' }}>Coffee in Blissfull</Text>
                <Text style={{ color: colors.commonWhite, fontSize: HEIGHT * 0.04, textAlign: 'center', fontWeight: 'bold' }}>Delight!</Text>
                <Text style={{ marginTop: HEIGHT * 0.02, color: colors.grayColor, textAlign: 'center', fontSize: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.08 }}>{onBoardScreenData.description}</Text>
                {/* </Image> */}
            </View>

            <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.06, alignSelf: 'center', width: WIDTH * 0.9, backgroundColor: colors.brownColor, height: HEIGHT * 0.07, alignItems: 'center', justifyContent: 'center', borderRadius: 10, zIndex: 1 }}>
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold' }}>Get Started</Text>
            </Pressable>
        </View>
    );
};

export default OnBoardScreen;
