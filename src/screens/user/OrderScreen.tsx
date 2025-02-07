/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { backIcon, bottomArrowIcon, deleteIcon, discountIcon, plusIcon, rightArrowIcon, walletIcon } from '../../assets/icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { orderType, editAdressArray } from '../../constants/data/dataArray';
import { colors } from '../../constants/colors';
// import { selectedCarts } from '../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderComponent from '../../components/OrderComponent';
// import { addedContacts } from '../redux/slice/contactSlice';
import firestore from '@react-native-firebase/firestore';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addTotalPrice, selectedPrice } from '../../redux/slice/priceTotalSlice';
import { SwipeListView } from 'react-native-swipe-list-view';

const OrderScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isSelected, setIsSelected] = useState<number>(1);
    const [selectedContact, setSelectedContact] = useState<[]>([]);
    const [cartItems, setCartItems] = useState<[]>([]);
    const userData = useSelector(selectedUserData);
    const userEmail = userData[0].email;
    const totalPrice = useSelector(selectedPrice);
    const dispatch = useDispatch();
    const [prices, setPrices] = useState(totalPrice);
    const [loading, setLoading] = useState<boolean>(false);
    // useEffect(() => {
    //     console.log('rendering')
    // }, [isFocused])

    useEffect(() => {
        const onFetchData = async () => {
            setLoading(true);
            try {
                const address = [];
                await firestore()
                    .collection('address')
                    .where('selected', '==', true)
                    .where('userId', '==', userEmail)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            address.push(doc.data());
                        });
                    });
                setSelectedContact(address);
                setLoading(false);
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
                let total: number = 0;
                await firestore()
                    .collection('cartItem').where('userId', '==', userData[0].email)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            carts.push({ ...doc.data(), id: doc.id });
                            total += parseInt(doc.data().type.price * doc.data().quantity);
                        });
                    });
                setPrices(total);
                setCartItems(carts);
                dispatch(addTotalPrice(total));

            } catch (error) {
                console.log('Error occurred while fetching cart data', error);
            }
        };
        onFetchCartItem();
    }, [userData]);


    const filterCartItem = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        type: item.type,
        userId: item.userId,
        image: item.image,
        name: item.name,
    }));


    // const onDeleteItem = () => {
    //     firestore()
    //         .collection('address')
    //         .doc(item.id)
    //         .delete()
    //         .then(() => {
    //             console.log('address deleted!');
    //         });
    // };
    // const handleDeleteAlert = (id) =>
    //     console.log('id checking', id);
    // Alert.alert('Are You sure want to delete Cart Item', '', [
    //     {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //     },
    //     {
    //         text: 'Delete',
    //         // onPress: () => dispatch(deleteContact(item.id))
    //         onPress: onDeleteItem,

    //     },
    // ]);

    const HandleOrder = async () => {
        setLoading(true);
        if (cartItems.length > 0) {
            const batch = firestore().batch();
            for (const item of cartItems) {
                const itemRef = firestore().collection('coffeeItem').doc(item.productId);
                const doc = await itemRef.get();
                if (doc.exists) {
                    const currentStock = doc.data().stock || 0;
                    const updateStock = currentStock - item.quantity;

                    if (updateStock >= 0) {
                        firestore().collection('coffeeItem').doc(item.productId).update({
                            stock: updateStock,
                        });
                    }
                    else {
                        Alert.alert('Sorry! product is out of stock');
                        setLoading(false);
                        return;
                    }
                }

            }
            try {
                await firestore().collection('orders').add({
                    products: filterCartItem,
                    address: selectedContact,
                    TotalPrice: prices - 1,
                    orderTime: Date.now(),
                });
                Alert.alert('Order placed successfully');
                navigation.navigate('DeliveryScreen');
                setLoading(false);

            } catch (error) {
                console.log('error while adding data');
            }
        }
        else {
            Alert.alert('No items in the cart');
            setLoading(false);
        }
    };

    // cartItems.forEach((item) => {
    //     console.log(item.productId, item.quantity);
    // });


    const onSwipeValueChange = (swipeData) => {
        const { key, value } = swipeData;

        // if (value < -100) {
        //     deleteItem(key);
        // }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            {loading ? <>
                <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            </> : <>
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
                    <View style={{ marginTop: HEIGHT * 0.04, paddingBottom: HEIGHT * 0.03 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.07, }}> Delivery Address</Text>

                        {selectedContact.map((item, index) => (
                            <View key={index} style={{ paddingHorizontal: WIDTH * 0.07 }}>
                                <Text style={{ marginTop: HEIGHT * 0.03, fontWeight: '600', fontSize: HEIGHT * 0.018 }}>{item.name}</Text>
                                <Text style={{ color: colors.grayColor, marginTop: WIDTH * 0.02 }}>{item.address}</Text>
                                <View style={{ flexDirection: 'row', gap: WIDTH * 0.03, marginTop: HEIGHT * 0.02 }}>
                                    {editAdressArray.map((items, key) => (
                                        <Pressable key={key} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite }} onPress={() => navigation.navigate('AddressScreen')}><Image source={items.icon} /><Text>{items.name}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        ))}
                        {selectedContact.length === 0 ?

                            <Pressable style={{ marginHorizontal: WIDTH * 0.07, marginTop: HEIGHT * 0.03, flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite, width: WIDTH * 0.4 }} onPress={() => navigation.navigate('AddressScreen')}>
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

                        <SwipeListView
                            data={cartItems}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <OrderComponent
                                    item={item}
                                />
                            )}
                            renderHiddenItem={(item) => (
                                <View style={{ height: HEIGHT * 0.12, marginTop: -HEIGHT * 0.02 }} >
                                    <Pressable style={{ right: WIDTH * 0.1, position: 'absolute', top: HEIGHT * 0.05 }} onPress={() => handleDeleteAlert(item.id)}>
                                        <Image source={deleteIcon} />
                                    </Pressable>
                                </View>
                            )}
                            onSwipeValueChange={onSwipeValueChange}
                            // leftOpenValue={75}
                            rightOpenValue={-100}
                        />



                        <View style={{ paddingHorizontal: WIDTH * 0.07 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: HEIGHT * 0.07, width: WIDTH * 0.88, borderWidth: 1, borderRadius: WIDTH * 0.04, gap: WIDTH * 0.05, paddingHorizontal: WIDTH * 0.07, borderColor: '#F9F2ED', backgroundColor: colors.commonWhite }}>
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
                                    <Text style={{ fontWeight: '600', textAlign: 'right' }}>${totalPrice}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ textDecorationLine: 'line-through' }}>$2.0 </Text>
                                        <Text style={{ fontWeight: '600' }}>$1.0</Text>
                                    </View>
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
                            <Text style={{ color: colors.brownColor }}>${totalPrice - 1}</Text>
                        </View>
                        <Image source={bottomArrowIcon} />
                    </View>
                    <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.07, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C67C4D', alignSelf: 'center', borderRadius: WIDTH * 0.05 }}
                        onPress={() => HandleOrder()}>
                        <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', color: '#fff' }}>Order</Text>
                    </Pressable>
                </View>
            </>}
        </SafeAreaView>
    );
};

export default OrderScreen;
