/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { backIcon, bottomArrowIcon, discountIcon, plusIcon, rightArrowIcon, walletIcon } from '../../assets/icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { orderType, editAdressArray } from '../../constants/data/dataArray';
import { colors } from '../../constants/colors';
// import { selectedCarts } from '../redux/slice/cartSlice';
// import { useSelector } from 'react-redux';
import OrderComponent from '../../components/OrderComponent';
// import { addedContacts } from '../redux/slice/contactSlice';
import firebase from '@react-native-firebase/firestore';

const OrderScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isSelected, setIsSelected] = useState<number>(1);
    const [selectedContact, setSelectedContact] = useState<[]>([]);
    const [cartItems, setCartItems] = useState<[]>([]);
    // const [update, setUpdate] = useState<boolean>(false);
    // const selectedCart = useSelector(selectedCarts);
    useEffect(() => {
        const onFetchData = async () => {
            try {
                const address: [] = [];
                await firebase()
                    .collection('address')
                    .where('selected', '==', true)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            address.push(doc.data());
                        });
                    });
                setSelectedContact(address);
                // cart item
            } catch (error) {
                console.log('Error occurred:', error);
            }
        };
        onFetchData();
    }, [isFocused]);


    useEffect(() => {
        const onFetchCartItem = async () => {
            try {
                const carts: [] = [];
                await firebase()
                    .collection('cartItem')
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            carts.push({ ...doc.data(), id: doc.id });
                        });
                    });
                setCartItems(carts);
            } catch (error) {
                console.log('Error occurred while fetching cart data', error);
            }
        };
        onFetchCartItem();
    }, [cartItems]);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            <ScrollView style={{ marginBottom: HEIGHT * 0.27 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image source={backIcon} />
                    </Pressable>
                    <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.3 }}>Order</Text>
                </View>
                <View style={{ width: WIDTH * 0.85, backgroundColor: `${colors.grayColor}10`, height: HEIGHT * 0.05, alignSelf: 'center', marginTop: HEIGHT * 0.04, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {orderType.map((type, index) => (
                        <Pressable
                            key={index}
                            style={[
                                {
                                    width: WIDTH * 0.41,
                                    height: HEIGHT * 0.04,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                },
                                isSelected === type.id && { backgroundColor: colors.brownColor },
                            ]}
                            onPress={() => setIsSelected(type.id)}
                        >
                            <Text style={[{ fontSize: HEIGHT * 0.02 }, isSelected === type.id && { color: colors.commonWhite, fontWeight: '500' }]}>{type.name}</Text>
                        </Pressable>
                    ))}
                </View>
                <View style={{ marginTop: HEIGHT * 0.04, paddingHorizontal: WIDTH * 0.07 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}> Delivery Address</Text>

                    {selectedContact.map((item, index) => (
                        <View key={index}>
                            <Text style={{ marginTop: HEIGHT * 0.03, fontWeight: '600', fontSize: HEIGHT * 0.018 }}>{item.name}</Text>
                            <Text style={{ color: colors.grayColor, marginTop: WIDTH * 0.02 }}>{item.address}</Text>
                            <View style={{ flexDirection: 'row', gap: WIDTH * 0.03, marginTop: HEIGHT * 0.02 }}>
                                {editAdressArray.map((item, index) => (
                                    <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite }} onPress={() => navigation.navigate('AddressScreen')}><Image source={item.icon} /><Text>{item.name}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    ))}
                    {selectedContact.length === 0 ?

                        <Pressable style={{ marginTop: HEIGHT * 0.03, flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite, width: WIDTH * 0.4 }} onPress={() => navigation.navigate('AddressScreen')}>
                            <Image source={plusIcon} style={{ tintColor: colors.commonBlack }} />
                            <Text>Add Address</Text>
                        </Pressable> : <></>
                    }

                    <View
                        style={{
                            borderBottomColor: `${colors.grayColor}50`,
                            borderBottomWidth: 0.5,
                            marginVertical: HEIGHT * 0.02,
                            marginHorizontal: WIDTH * 0.05,
                        }}
                    />

                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={(item) => (
                            <OrderComponent item={item} />
                        )}
                    />


                    <View style={{ flexDirection: 'row', alignItems: 'center', height: HEIGHT * 0.07, width: WIDTH * 0.88, borderWidth: 1, borderRadius: WIDTH * 0.04, gap: WIDTH * 0.05, paddingHorizontal: WIDTH * 0.05, borderColor: '#F9F2ED', backgroundColor: colors.commonWhite }}>
                        <Image source={discountIcon} />
                        <Text>1 Discount is Applies</Text>
                        <Image source={rightArrowIcon} style={{ position: 'absolute', right: WIDTH * 0.05 }} />
                    </View>

                    <Text style={{ marginVertical: HEIGHT * 0.02, fontWeight: '600', fontSize: HEIGHT * 0.02 }}>Payment Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ gap: HEIGHT * 0.01 }}>
                            <Text>Price</Text>
                            <Text>Delivery Fee</Text>
                        </View>
                        <View style={{ gap: HEIGHT * 0.01 }}>
                            <Text style={{ fontWeight: '600', textAlign: 'right' }}>$4.53</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ textDecorationLine: 'line-through' }}>$2.0 </Text>
                                <Text style={{ fontWeight: '600' }}>$1.0</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: HEIGHT * 0.1, height: HEIGHT * 0.2, backgroundColor: '#ffffff', width: WIDTH * 1.0, paddingHorizontal: WIDTH * 0.05 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.02 }}>
                    <Image source={walletIcon} />
                    <View style={{ marginLeft: WIDTH * 0.05, marginRight: WIDTH * 0.5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01 }}>Cash/Wallet</Text>
                        <Text style={{ color: colors.brownColor }}>$5.53</Text>
                    </View>
                    <Image source={bottomArrowIcon} />
                </View>
                <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.07, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C67C4D', alignSelf: 'center', borderRadius: WIDTH * 0.05 }}
                    onPress={() => navigation.navigate('DeliveryScreen')}>
                    <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', color: '#fff' }}>Order</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default OrderScreen;
