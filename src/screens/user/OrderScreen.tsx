/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dropdown } from 'react-native-element-dropdown';

import { backIcon, bottomArrowIcon, deleteIcon, discountIcon, plusIcon, rightArrowIcon, table4, table5, table6, table8, walletIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { orderType } from '../../constants/data/dataArray';
import { colors } from '../../constants/colors';
import OrderComponent from '../../components/OrderComponent';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addTotalPrice, selectedPrice } from '../../redux/slice/priceTotalSlice';
import SelectedAddressComponent from '../../components/SelectedAddressComponent';
import { addOrderType } from '../../redux/slice/orderTypeSlice';
import PaymentDetails from '../../components/PaymentDetails';


const OrderScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const userData = useSelector(selectedUserData);
    const totalPrice = useSelector(selectedPrice);
    const dispatch = useDispatch();
    const { id } = userData[0];

    const [isSelected, setIsSelected] = useState<string>('Delivery');
    const [selectedContact, setSelectedContact] = useState<[]>([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [cartItems, setCartItems] = useState<{}[]>([]);
    const [shopData, setShopData] = useState();
    const [prices, setPrices] = useState(totalPrice);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selected, setSelected] = useState<[]>([]);
    const [isFocus, setIsFocus] = useState(false);
    const [focus, setFocus] = useState(false);
    const [tables, setTables] = useState([] || null);

    useEffect(() => {
        onFetchData();
        if (isSelected === 'Delivery') {
            onFetchDeliveryCartItem();
        } else if (isSelected === 'Dining') {
            onFetchDiningCartItem();
        } else {
            onFetchPickUPCartItem();
        }

        onFetchShopData();
    }, [isFocused, isSelected]);

    const onFetchData = async () => {
        setLoading(true);
        try {
            const address: any = [];
            await firestore()
                .collection('address')
                .where('selected', '==', true)
                .where('userId', '==', id)
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

    const onFetchShopData = async () => {
        try {
            const shops: any = [];
            await firestore()
                .collection('shops')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        shops.push(doc.data());
                    });
                });
            setShopData(shops);
            setLoading(false);
            // cart item
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };


    const onFetchDeliveryCartItem = async () => {
        try {
            const carts: any = [];
            let total: number = 0;
            await firestore()
                .collection('cartItem').where('userId', '==', id)
                .where('orderType', '==', 'Delivery')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        carts.push({ ...doc.data(), id: doc.id });
                        total += parseInt(doc.data().price * doc.data().quantity, 10);
                    });
                });
            setPrices(total);
            setCartItems(carts);
            dispatch(addTotalPrice(total));

        } catch (error) {
            console.log('Error occurred while fetching cart data', error);
        }
    };
    const onFetchPickUPCartItem = async () => {
        try {
            const carts: any = [];
            let total: number = 0;
            await firestore()
                .collection('cartItem').where('userId', '==', id)
                .where('orderType', '==', 'Pick Up')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        carts.push({ ...doc.data(), id: doc.id });
                        total += parseInt(doc.data().price * doc.data().quantity, 10);
                    });
                });
            setPrices(total);
            setCartItems(carts);
            dispatch(addTotalPrice(total));

        } catch (error) {
            console.log('Error occurred while fetching cart data', error);
        }
    };
    const onFetchDiningCartItem = async () => {
        try {
            const carts: any = [];
            let total: number = 0;
            await firestore()
                .collection('cartItem').where('userId', '==', id)
                .where('orderType', '==', 'Dining')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        carts.push({ ...doc.data(), id: doc.id });
                        total += parseInt(doc.data().price * doc.data().quantity, 10);
                    });
                });
            setPrices(total);
            setCartItems(carts);
            dispatch(addTotalPrice(total));

        } catch (error) {
            console.log('Error occurred while fetching cart data', error);
        }
    };


    const filterCartItem = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        type: item.types,
        price: item.price,
        image: item.image,
        name: item.name,
    }));



    const handleButtonDelete = async (cartId: string) => {
        firestore()
            .collection('cartItem')
            .doc(cartId)
            .delete()
            .then(() => {
                console.log('cartItem deleted deleted!');
            });

    };
    const handleTablePress = (tableId: string) => {
        setSelected(prevState => {
            if (prevState.includes(tableId)) {
                return prevState.filter((table) => table !== tableId);
            } else {
                return [...prevState, tableId];
            }
        });
    };

    const HandleOrder = async () => {
        setLoading(true);
        if (cartItems.length > 0) {
            for (const item of cartItems) {
                const itemRef = firestore().collection('items').doc(item.itemId);
                const doc = await itemRef.get();
                if (doc.exists) {
                    const currentStock = doc.data().stock || 0;
                    const updateStock = currentStock - item.quantity;

                    if (updateStock >= 0) {
                        firestore().collection('items').doc(item.productId).update({
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
                    address: isSelected === 'Delivery' ? selectedContact : shopData.find((shop) => shop.place === selectedPlace),
                    userId: id,
                    orderType: isSelected,
                    status: 'processing',
                    totalPrice: prices + 1,
                    orderTime: Date.now(),
                });
                Alert.alert('Order placed successfully');
                navigation.navigate('UserOrderListScreen');
                setLoading(false);

            } catch (error) {
                console.log('error while adding data', error);
            }
        }
        else {
            Alert.alert('No items in the cart');
            setLoading(false);
        }
        setLoading(false);
    };

    const onRowDidOpen = (rowKey: string) => {

        Alert.alert('Are You sure want to delete Cart Item', '', [
            {
                text: 'Cancel',
                onPress: () => { console.log('Cancel Pressed'); setLoading(false); },
                style: 'cancel',
            },
            {
                text: 'Delete',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: () => handleButtonDelete(rowKey),

            },
        ]);
    };

    const changeOrderTask = (value: string) => {
        dispatch(addOrderType(value));
        setIsSelected(value);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            {loading ? <>
                <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            </> : <>
                {/* {cartItems.length === 0 ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: colors.brownColor, fontSize: 16, fontWeight: '600' }}>No Items in The Cart</Text>
                    </View>
                    : <View> */}
                <ScrollView style={{ marginBottom: HEIGHT * 0.27, paddingHorizontal: WIDTH * 0.05 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01 }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.3 }}>Order</Text>
                    </View>

                    {/* orderType details */}
                    <View style={{ width: WIDTH * 0.9, backgroundColor: `${colors.grayColor}10`, height: HEIGHT * 0.05, alignSelf: 'center', marginTop: HEIGHT * 0.04, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {orderType.map((type, index) => (
                            <Pressable key={index} style={[{ width: WIDTH * 0.29, height: HEIGHT * 0.04, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
                            isSelected === type.name && { backgroundColor: colors.brownColor }]}
                                onPress={() => changeOrderTask(type.name)}
                            >
                                <Text style={[{ fontSize: HEIGHT * 0.02 }, isSelected === type.name && { color: colors.commonWhite, fontWeight: '500' }]}>{type.name}</Text>
                            </Pressable>
                        ))}
                    </View>
                    {/*  */}
                    {/* item.capacity === '4' ? table4 : item.capacity === '5' ? table5 : item.capacity === '6' ?  */}
                    <View style={{ marginTop: HEIGHT * 0.04, paddingBottom: HEIGHT * 0.03 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>{isSelected === 'Delivery' ? 'Delivery Address' : isSelected === 'Dining' ? 'select shop' : 'Pick Up Address'}</Text>

                        {/* delivery address part */}
                        {isSelected === 'Delivery' ? (
                            <FlatList
                                data={selectedContact}
                                keyExtractor={(item, index) => item.id}
                                scrollEnabled={false}
                                renderItem={(item) => <SelectedAddressComponent item={item.item} isSelected={isSelected} />}
                                ListEmptyComponent={<EmptyAddressComponent />}
                            />
                        ) : isSelected === 'Dining' ? (
                            <Dropdown
                                data={shopData}
                                search
                                maxHeight={HEIGHT * 0.4}
                                searchPlaceholder="Search Here"
                                labelField="name"
                                valueField="value"
                                placeholder={!focus || !selectedShop ? selectedShop : 'Select Shop'}
                                value={selectedShop}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                onChange={(item) => {
                                    setSelectedShop(item.name);
                                    const selectedShopData = shopData.find((shop) => shop.name === item.name);
                                    if (selectedShopData) {
                                        setTables(selectedShopData.tables);
                                    } else {
                                        setTables([]);
                                    }
                                    setFocus(false);
                                }}
                                style={{ width: 'auto', maxWidth: WIDTH * 0.5, marginTop: HEIGHT * 0.02, justifyContent: 'center' }}
                            />
                        ) : (
                            <>
                                <Dropdown
                                    data={shopData}
                                    search
                                    maxHeight={HEIGHT * 0.35}
                                    // maxWidth={WIDTH * 0.1}
                                    labelField="place"
                                    valueField="value"
                                    placeholder={!isFocus || selectedPlace === null ? selectedPlace : 'Select pick up'}
                                    value={selectedPlace}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(item) => {
                                        setSelectedPlace(item.place);
                                        setIsFocus(false);
                                    }}
                                    style={{ width: WIDTH * 0.35, maxWidth: WIDTH * 0.5, marginTop: HEIGHT * 0.02, justifyContent: 'center' }}
                                // renderLeftIcon={() => <Image source={bottomArrowIcon} />}
                                />
                                {selectedPlace && (
                                    <SelectedAddressComponent
                                        item={shopData.find((shop) => shop.place === selectedPlace)}
                                    />
                                )}
                            </>
                        )}


                        {/*  */}
                        {isSelected === 'Dining' && tables.length > 0 ? (
                            <View>
                                <Text style={{ fontSize: 18, marginTop: HEIGHT * 0.01 }} >Select Tables</Text>
                                <FlatList
                                    data={tables}
                                    numColumns={2}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.tableId}
                                    renderItem={({ item }) => (
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ position: 'absolute' }}>{item.tableId}</Text>
                                            <Pressable onPress={() => handleTablePress(item.tableId)}>
                                                <Image
                                                    source={item.capacity === '4' ? table4 : item.capacity === '5' ? table5 : item.capacity === '6' ? table6 : table8}
                                                    style={{ width: WIDTH * 0.3, height: WIDTH * 0.3, tintColor: selected.includes(item.tableId) ? colors.redColor : colors.greenColor }}
                                                />
                                            </Pressable>
                                        </View>
                                    )}
                                />
                            </View>
                        ) : undefined}
                        <View style={{ borderBottomColor: `${colors.grayColor}50`, borderBottomWidth: 0.5, marginVertical: HEIGHT * 0.02 }} />

                        <SwipeListView
                            data={cartItems}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <OrderComponent item={item} />)}
                            renderHiddenItem={(item) => (
                                <View style={{ height: HEIGHT * 0.12, marginTop: -HEIGHT * 0.02 }} >
                                    <Pressable style={{ right: WIDTH * 0.1, position: 'absolute', top: HEIGHT * 0.05 }}>
                                        <Image source={deleteIcon} />
                                    </Pressable>
                                </View>
                            )}
                            onRowDidOpen={(rowKey) => onRowDidOpen(rowKey)}
                            rightOpenValue={-300}
                        />

                        {cartItems.length === 0 ?
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', color: colors.brownColor, fontSize: 16, fontWeight: '600', marginTop: HEIGHT * 0.05 }}>No Items in The Cart</Text>
                            </View>
                            : <PaymentDetails totalPrice={totalPrice} />
                        }
                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: HEIGHT * 0.1, height: HEIGHT * 0.2, backgroundColor: '#ffffff', width: WIDTH * 1.0, paddingHorizontal: WIDTH * 0.05 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.02 }}>
                        <Image source={walletIcon} />
                        <View style={{ marginLeft: WIDTH * 0.05, marginRight: WIDTH * 0.5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01 }}>Cash/Wallet</Text>
                            <Text style={{ color: colors.brownColor }}>${totalPrice + 1}</Text>
                        </View>
                        <Image source={bottomArrowIcon} />
                    </View>
                    <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.07, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C67C4D', alignSelf: 'center', borderRadius: WIDTH * 0.05 }}
                        onPress={() => HandleOrder()}>
                        <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', color: '#fff' }}>Order</Text>
                    </Pressable>
                </View>
                {/* </View>} */}
            </>}
        </SafeAreaView >
    );
};

export default OrderScreen;



const EmptyAddressComponent = () => {
    const navigation = useNavigation();
    return (
        <Pressable style={{ marginHorizontal: WIDTH * 0.02, marginTop: HEIGHT * 0.03, flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite, width: WIDTH * 0.4 }} onPress={() => navigation.navigate('AddressScreen')}>
            <Image source={plusIcon} style={{ tintColor: colors.commonBlack }} />
            <Text>Add Address</Text>
        </Pressable>
    );
};
