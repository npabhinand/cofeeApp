/* eslint-disable react-native/no-inline-styles */
import {
    View, Text, SafeAreaView, Pressable, Image, ScrollView,
    Alert, ActivityIndicator, FlatList, Modal
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';

import { backIcon, bottomArrowIcon, plusIcon, walletIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { orderType } from '../../constants/data/dataArray';
import { colors } from '../../constants/colors';
import OrderComponent from '../../components/OrderComponent';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addTotalPrice, selectedPrice, } from '../../redux/slice/priceTotalSlice';
import SelectedAddressComponent from '../../components/SelectedAddressComponent';
import { addOrderType, selectedOrderType } from '../../redux/slice/orderTypeSlice';
import PaymentDetails from '../../components/PaymentDetails';
import HeaderComponent from '../../components/HeaderComponent';
import { addbookingTable, addedbookingTables, deleteTable } from '../../redux/slice/bookingTableSlice';
import { selectedCarts } from '../../redux/slice/cartSlice';
import { RootStackParamList } from '../../routes/AppNavigator';


const OrderScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'PaymentScreen'>>();
    const userData = useSelector(selectedUserData);
    const totalPrice = useSelector(selectedPrice);
    const orderTypes = useSelector(selectedOrderType);
    const bookedShop = useSelector(addedbookingTables);
    const cartData = useSelector(selectedCarts);
    const booking = bookedShop[0];
    const dispatch = useDispatch();
    const { id} = userData[0];
    const db = firestore();

    const [isSelected, setIsSelected] = useState<string>(orderTypes || 'Delivery');
    const [selectedContact, setSelectedContact] = useState<[]>([]);
    const [cartItems, setCartItems] = useState<{}[]>([]);
    const [shopData, setShopData] = useState();
    const [prices, setPrices] = useState(totalPrice);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);
    const [tables, setTables] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [update,setUpdate]=useState<boolean>(false);

    
    useEffect(() => {
        onFetchData();
        onFetchShopData();
    }, [update]);

    useEffect(() => {
        const filteredItems = cartData.filter((item) => item.orderType === isSelected);
        const price = filteredItems.reduce((acc, item) => acc += parseInt(item.price,) * item.quantity, 0);
        setPrices(price)
        dispatch(addTotalPrice(price));
        setCartItems(filteredItems);
    }, [isSelected, cartData]);

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
                        shops.push({ ...doc.data(), id: doc.id });
                    });
                });
            setShopData(shops);
            setLoading(false);
            // cart item
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };
   

    const HandleOrder =  () => {
        // setLoading(true);
        if(isSelected==='Pick Up' && selectedPlace===null){
            return Alert.alert('Pick up address is not selected')
        }
        else if(isSelected==='Dining' && (booking===undefined|| booking.tables.length===0)){
            return Alert.alert('Select tables to book')
        }
        try{
            if (cartItems.length > 0) {
                const selectedShops = shopData.find((item) => item.name === selectedShop);
                navigation.navigate('PaymentScreen', {
                    cartItems,
                    totalPrice: prices,
                    orderType: orderTypes,
                    selectedShops: selectedShops,
                    selectedContact,
                    selectedShop: shopData.find((shop) => shop.place === selectedPlace),
                    setUpdate:setUpdate,
                });
                setLoading(false);
            } else {
                Alert.alert('No items in the cart');
                setLoading(false);
            }
        }catch(error){
            Alert.alert('select address');
        }
        
    };



    // const HandleOrder = async () => {
    //     setLoading(true);
    //     // if(selectedPlace==null||){

    //     // }
    //     if (cartItems.length > 0) {
    //         for (const item of cartItems) {
    //             const itemRef = firestore().collection('items').doc(item.itemId);
    //             const doc = await itemRef.get();
    //             if (doc.exists) {
    //                 const currentStock = doc.data().stock || 0;
    //                 const updateStock = currentStock - item.quantity;

    //                 if (updateStock >= 0) {
    //                     firestore().collection('items').doc(item.productId).update({
    //                         stock: updateStock,
    //                     });
    //                 }
    //                 else {
    //                     Alert.alert('Sorry! product is out of stock');
    //                     setLoading(false);
    //                     return;
    //                 }
    //             }
    //         }
    //         try {
    //             await firestore().collection('orders').add({
    //                 products: filterCartItem,
    //                 address: isSelected === 'Delivery' ? selectedContact : isSelected === 'Dining' ? booking?.name : shopData.find((shop) => shop.place === selectedPlace),
    //                 userId: id,
    //                 orderType: isSelected,
    //                 status: 'processing',
    //                 totalPrice: prices + 1,
    //                 orderTime: Date.now(),
    //             });
    //             Alert.alert('Order placed successfully');
    //             navigation.navigate('UserOrderListScreen');
    //             setLoading(false);
    //         }
    //         catch (error) {
    //             console.log('error while adding data', error);
    //         }
    //     }
    //     else {
    //         Alert.alert('No items in the cart');
    //         setLoading(false);
    //     }
    //     setLoading(false);
    // };

  

    const changeOrderTask = (value: string) => {
        dispatch(addOrderType(value));
        setIsSelected(value);
    };

    const onDeleteTable = (shop:string, table:string) => {
        dispatch(deleteTable({ shopId: shop, tableId: table }))
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            {loading ? <>
                <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            </> : <>
                <ScrollView style={{ marginBottom: HEIGHT * 0.22 }} showsVerticalScrollIndicator={false}>
                    <HeaderComponent header='Carts' />

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
                    <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
                        {/* item.capacity === '4' ? table4 : item.capacity === '5' ? table5 : item.capacity === '6' ?  */}
                        <View style={{ marginTop: HEIGHT * 0.04, paddingBottom: HEIGHT * 0.03 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>{isSelected === 'Delivery' ? 'Delivery Address' : isSelected === 'Dining' ? 'select shop' : 'Pick Up Address'}</Text>

                            {/* delivery address */}
                            {isSelected === 'Delivery' ? (
                                <FlatList
                                    data={selectedContact}
                                    keyExtractor={(item,index) => index.toString()}
                                    scrollEnabled={false}
                                    renderItem={(item) => <SelectedAddressComponent item={item.item} isSelected={isSelected} />}
                                    ListEmptyComponent={<EmptyAddressComponent />}
                                />
                            ) : isSelected === 'Dining' ? (
                                <>
                                    {/* <View style={{flexDirection:'row',flexWrap:'wrap'}}> */}
                                    <Dropdown
                                        data={shopData}
                                        search
                                        maxHeight={HEIGHT * 0.4}
                                        searchPlaceholder="Search Here"
                                        labelField="name"
                                        valueField="value"
                                        placeholder={!isFocus || !selectedShop ? 'Select Shop' : selectedShop}
                                        value={selectedShop}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={(item) => {
                                            setSelectedShop(item.name);
                                            const selectedShopData = shopData.find((shop) => shop.name === item.name);
                                            if (selectedShopData) {
                                                setTables(selectedShopData.tables);
                                                setIsModalVisible(true);
                                            } else {
                                                setTables([]);
                                                setIsModalVisible(false);
                                            }
                                            setIsFocus(false);
                                        }}
                                        style={{ width: WIDTH * 0.5, paddingVertical: HEIGHT * 0.01, marginTop: HEIGHT * 0.02, justifyContent: 'center' }}

                                    />
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {Array.isArray(booking?.tables) && booking.tables.length > 0 ? (
                                            booking.tables.map((table, index) => (
                                                <Pressable key={index} style={{
                                                    flexDirection: 'row', marginRight: WIDTH * 0.04, alignItems: 'center', gap: 10,
                                                    height: 35, backgroundColor: `${colors.brownColor}50`, borderRadius: 10, paddingHorizontal: WIDTH * 0.04
                                                }}>
                                                    <Text>{table}</Text>
                                                    <Text style={{ fontSize: 16 }} onPress={() => onDeleteTable(booking.shopId, table)}>X</Text></Pressable>
                                            ))
                                        ) : (null
                                        )}
                                    </View>
                                    {/* </View> */}

                                </>
                            ) : (
                                <>
                                    <Dropdown
                                        data={shopData}
                                        search
                                        maxHeight={HEIGHT * 0.35}
                                        // maxWidth={WIDTH * 0.1}
                                        labelField="place"
                                        valueField="value"
                                        placeholder={selectedPlace === null ? selectedPlace : 'Select pick up'}
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

                            <View style={{ borderBottomColor: `${colors.grayColor}50`, borderBottomWidth: 0.5, marginVertical: HEIGHT * 0.02 }} />

                            
                            <FlatList
                                data={cartItems}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item)=>(
                                    <OrderComponent item={item.item} />
                                )}
                            />

                            {cartItems.length === 0 ?
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'center', color: colors.brownColor, fontSize: 16, fontWeight: '600', marginTop: HEIGHT * 0.05 }}>No Items in The Cart</Text>
                                </View>
                                : <PaymentDetails totalPrice={totalPrice} />
                            }
                        </View>
                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: HEIGHT * 0.07, height: HEIGHT * 0.2, backgroundColor: '#ffffff', width: WIDTH * 1.0, paddingHorizontal: WIDTH * 0.05 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.02 }}>
                        <Image source={walletIcon} />
                        <View style={{ marginLeft: WIDTH * 0.05, marginRight: WIDTH * 0.5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01 }}>Cash/Wallet</Text>
                            <Text style={{ color: colors.brownColor }}>${totalPrice + 1}</Text>
                        </View>
                        <Image source={bottomArrowIcon} />
                    </View>
                    <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C67C4D', alignSelf: 'center', borderRadius: WIDTH * 0.05 }}
                        onPress={() => HandleOrder()}>
                        <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', color: '#fff' }}>Order</Text>
                    </Pressable>
                </View>
                {/* </View>} */}
                <Modal
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    // transparent={true}
                    animationType="slide"
                >
                    <TableSelectionComponent setIsModalVisible={setIsModalVisible} selectedShop={selectedShop} shopData={shopData} tables={tables}/>
                                    </Modal>


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

const TableSelectionComponent=(props)=>{
    const {setIsModalVisible,shopData, selectedShop, tables}=props;
    const dispatch=useDispatch()
    
    
    const [selectedTable, setSelectedTable] = useState<[]>([]);

    const onPressSelectTable =() => {
        const selectedShops = shopData.find((item) => item.name === selectedShop);
       
        if (selectedTable && selectedShop) {
            const bookingData = {
                shopId: selectedShops.shopId,
                name: selectedShop,
                tables: selectedTable,
            };
            dispatch(addbookingTable(bookingData));
            setIsModalVisible(false);
        }
    };
    
    const handleTablePress = (tableId: string) => {
        setSelectedTable(prevState => {
            if (prevState.includes(tableId)) {
                return prevState.filter((table) => table !== tableId);
            } else {
                return [...prevState, tableId];
            }
        });
    };

    return(
        <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: HEIGHT * 0.1, marginHorizontal: WIDTH * 0.05 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: HEIGHT * 0.01 }}>
                                <Pressable onPress={() => setIsModalVisible(false)}><Image source={backIcon} /></Pressable>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select a Table</Text>
                                <View />
                            </View>
                            <FlatList
                                data={tables}
                                numColumns={2}
                                keyExtractor={(item) => item.tableId}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            handleTablePress(item.tableId);
                                            // setSelectedTable(item.tableId);
                                        }}
                                        disabled={item.booked}
                                        style={{
                                            flexDirection: 'row',
                                            width: WIDTH * 0.3,
                                            height: 60,
                                            backgroundColor: selectedTable.includes(item.tableId) || item.booked ? `${colors.grayColor}50` : colors.greenColor,
                                            // backgroundColor: item.booked ? `${colors.grayColor}50` : colors.greenColor,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: 10,
                                        }}
                                    >
                                        <Text style={{ color: colors.commonWhite }}>{item.tableId}</Text>
                                        <Text style={{ color: colors.commonWhite }}> - {item.capacity}</Text>
                                    </Pressable>
                                )}
                            />
                        </View>


                        <Pressable
                            style={{
                                position: 'absolute',
                                bottom: HEIGHT * 0.07,
                                left: WIDTH * 0.05,
                                right: WIDTH * 0.05,
                                backgroundColor: colors.brownColor,
                                paddingVertical: HEIGHT * 0.02,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={onPressSelectTable}
                        >
                            <Text style={{ color: colors.commonWhite }}>Select Table</Text>
                        </Pressable>
                    </View>

    )
}
