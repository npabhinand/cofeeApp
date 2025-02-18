/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, Image, Pressable, ScrollView, FlatList, ActivityIndicator, Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { bottomArrowIcon, filterIcon, logout, orderIcon, profile, profileIcon, searchIcon } from '../../assets/icons';
import PromoComponent from '../../components/PromoComponent';
import { filterArray } from '../../constants/data/dataArray';
import FilterButton from '../../components/FilterButton';
import CoffeeCard from '../../components/CoffeeCard';
import { colors } from '../../constants/colors';
import { selectedUserData } from '../../redux/slice/userDataSlice';


const HomeScreen = () => {
    const [isSelected, setIsSelected] = useState<number>();
    const [coffeeArray, setCoffeeArray] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const userData = useSelector(selectedUserData);
    const { email } = userData[0];
    const navigation = useNavigation();


    useEffect(() => {
        fetchCoffee();
    }, []);

    const fetchCoffee = async () => {
        const coffees: any = [];
        try {
            setLoading(true);
            const coffeeRef = await firestore().collection('coffeeItem').where('stock', '>', 0).get();
            coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
            setCoffeeArray(coffees);
            setLoading(false);
        } catch {
            console.log('error while fetching coffee items');
        }
    };
    const handleLogoutAlert = () =>
        Alert.alert('Are You want to Logout', '', [
            {
                text: 'Cancel',
                // onPress: () => onPressClose(),
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
    // handleDeleteAlert
    const profileArray = [
        { id: 1, name: 'Profile', icon: profile, handleClick: () => { navigation.navigate('ProfileScreen'); setIsVisible(!isVisible); } },
        { id: 2, name: 'Sign Out', icon: logout, handleClick: () => { handleLogoutAlert(); setIsVisible(!isVisible); } },
        // { id: 3, name: 'Cancel', icon: back, handleClick: () => setIsVisible(!isVisible) },
        { id: 3, name: 'Orders', icon: orderIcon, handleClick: () => { navigation.navigate('UserOrderListScreen'); setIsVisible(!isVisible); } },
    ];
    return (
        <View style={{ flex: 1 }}>
            {loading ? <>
                <ActivityIndicator size={'large'} color={colors.brownColor} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            </> :
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{}}>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.matteBlack, colors.commonBlack]}
                        style={{ width: WIDTH * 1, height: HEIGHT * 0.35 }} >

                        <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ color: colors.grayColor, marginTop: HEIGHT * 0.08 }}>Location</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: colors.commonWhite }}>Bilzen, Tanjungbalai </Text>
                                <Image source={bottomArrowIcon} style={{ tintColor: colors.commonWhite, marginRight: WIDTH * 0.3 }} />
                                <Pressable onPress={() => setIsVisible(!isVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={profileIcon} style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, tintColor: colors.commonWhite }} />
                                    <Image source={bottomArrowIcon} style={{ marginTop: HEIGHT * 0.01, tintColor: colors.commonWhite }} />
                                </Pressable>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03, justifyContent: 'space-between' }}>
                                <View style={{
                                    backgroundColor: colors.matteBlack, height: HEIGHT * 0.06, justifyContent: 'center', borderRadius: HEIGHT * 0.01, width: WIDTH * 0.75, paddingLeft: WIDTH * 0.05,
                                }}>
                                    <Image source={searchIcon} tintColor={colors.commonWhite} style={{ position: 'absolute', left: WIDTH * 0.02 }} />
                                    <TextInput
                                        placeholder="Search Coffee" placeholderTextColor={colors.grayColor} style={{ color: colors.commonWhite, paddingLeft: WIDTH * 0.05 }} />
                                </View>
                                <Pressable style={{ backgroundColor: colors.brownColor, alignItems: 'center', justifyContent: 'center', width: HEIGHT * 0.06, borderRadius: HEIGHT * 0.015 }}>
                                    <Image source={filterIcon} style={{ tintColor: colors.commonWhite }} />

                                </Pressable>

                            </View>
                        </View>

                    </LinearGradient>

                    <Modal visible={isVisible} animationType="fade" transparent={true} onRequestClose={() => setIsVisible(!isVisible)}>
                        <Pressable style={{ width: WIDTH * 1.0, height: HEIGHT * 1.0 }} onPress={() => setIsVisible(!isVisible)}>
                            <View style={{ width: WIDTH * 0.3, height: 100, alignSelf: 'flex-end', marginTop: HEIGHT * 0.14, marginRight: WIDTH * 0.02, backgroundColor: colors.commonWhite, borderRadius: 10 }}>
                                {profileArray.map((item, index) => (
                                    <Pressable key={index} style={{ flexDirection: 'row', marginTop: HEIGHT * 0.01, alignItems: 'center', borderBottomWidth: 0.3, borderColor: colors.brownColor, marginHorizontal: WIDTH * 0.02 }} onPress={item.handleClick}>
                                        <Image source={item.icon} style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, marginRight: WIDTH * 0.01, tintColor: colors.brownColor }} />
                                        <Text style={{ color: colors.brownColor }}>{item.name}</Text>
                                    </Pressable>
                                ))}

                            </View>
                        </Pressable>
                    </Modal>
                    {/*  */}

                    <ScrollView horizontal style={{ position: 'absolute', top: HEIGHT * 0.27, width: WIDTH * 1 }} showsHorizontalScrollIndicator={false}>
                        <PromoComponent />
                        <PromoComponent />
                    </ScrollView>
                    {/* </View> */}

                    <ScrollView horizontal style={{ marginTop: HEIGHT * 0.11, paddingHorizontal: WIDTH * 0.05 }} showsHorizontalScrollIndicator={false}>
                        {filterArray.map((filter) => (
                            <FilterButton
                                key={filter.id}
                                buttonName={filter.name}
                                selected={isSelected === filter.id}
                                onPress={() => setIsSelected(filter.id)}
                            />
                        ))}
                    </ScrollView>
                    <FlatList
                        data={coffeeArray}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        contentContainerStyle={{ marginBottom: HEIGHT * 0.13, paddingHorizontal: WIDTH * 0.05, justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <CoffeeCard item={item} userId={email} setLoading={setLoading} />
                        )} />
                </ScrollView>
            }
        </View >
    );
};

export default HomeScreen;
