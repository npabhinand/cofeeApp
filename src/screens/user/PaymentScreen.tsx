import { View, Text, FlatList, Pressable, SafeAreaView, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import HeaderComponent from '../../components/HeaderComponent';
import { colors } from '../../constants/colors';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addedbookingTables } from '../../redux/slice/bookingTableSlice';
import { routeProps } from '../../constants/types/commonTypes';
import { shopImage } from '../../assets/images';



const PaymentScreen: React.FC<routeProps> = ({ route }) => {
    const { cartItems, totalPrice, orderType, selectedShops, selectedContact, selectedShop, setUpdate } = route.params;
    const userData = useSelector(selectedUserData);
    const bookedShop = useSelector(addedbookingTables);
    const booking = bookedShop[0];
    let today = new Date();
    const db = firestore();
    const { id, name } = userData[0];

    const [loading, setLoading] = useState<boolean>(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const orderData = {
                products: cartItems,
                totalPrice: totalPrice + 1,
                orderTime: Date.now(),
                status: 'processing',
                orderType: orderType,
                userId: id,
                name: name,
                ...(orderType === 'Delivery' && { address: selectedContact }),
                ...(orderType === 'Pick Up' && { shop: selectedShop }),
                ...(orderType === 'Dining' && { table: booking.tables }),
                ...(orderType === 'Dining' && { shop: selectedShops }),
            };

            if (orderType === 'Dining' && selectedShops && booking.tables) {
                const shopDoc = await db.collection('shops').doc(selectedShops.id);
                const shopData = (await shopDoc.get()).data();

                if (shopData && shopData.tables) {
                    const updatedTables = shopData.tables.map((item) => {
                        if (booking.tables.includes(item.tableId)) {
                            return { ...item, booked: true };
                        }
                        return item;
                    });

                    await shopDoc.update({ tables: updatedTables });
                }
            }

            await db.collection('orders').add(orderData);
            Alert.alert('Order placed successfully!');
            setUpdate(true);
            setLoading(false);
        } catch (error) {
            console.log('Error while placing order:', error);
            Alert.alert('Error', 'There was an issue placing your order.');
            setLoading(false);
        }
    };
    const OrderArray = [
        {id:1, name:'order Type', value:orderType},
        { id: 2, name: 'price', value: `₹${totalPrice}` },
        { id: 3, name: 'delivery Charge', value: '₹1' },
        // { id: 4, name: 'Total price', value: totalPrice + 1 },
    ]
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    const time = new Date().toLocaleTimeString();
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <HeaderComponent header="Order Details" />
            <ScrollView bounces={false}>
                <Image source={shopImage} style={{
                    width: WIDTH * 0.25, height: WIDTH * 0.25, borderRadius: '50%',
                    alignSelf: 'center', marginVertical: HEIGHT * 0.02
                }} />

                <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
                    <Text style={{ textAlign: 'center', fontWeight: '300', color: colors.grayColor,marginBottom:HEIGHT*0.02 }}>{date} | {time}</Text>
                    {/* <View style={{ }}> */}
                    <Text style={{fontWeight:'600', fontSize:18,  marginTop:HEIGHT*0.02, marginBottom:HEIGHT*0.02}}>Order Items</Text>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.productId}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#666', textTransform: 'capitalize', width: WIDTH * 0.3 }}>{item.name}</Text>
                                <Text style={{ fontSize: 16, color: '#666' }}>x{item.quantity}</Text>
                                <Text style={{ fontSize: 16, color: '#666' }}>₹{item.price} </Text>
                            </View>
                        )}
                    />
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: `${colors.grayColor}50`,
                        marginVertical: HEIGHT * 0.02
                    }}>
                    </View>
                    {OrderArray.map((item) => (
                        <View key={item.id} style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            borderColor: colors.grayColor, marginTop: 5, marginBottom: 5
                        }}>
                            <Text style={{ color: '#666',textTransform:'capitalize' }}>{item.name}</Text>
                            <Text style={{ fontSize: 16, color: '#666' }}>{item.value}</Text>
                        </View>
                    ))}
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'brown',
                            borderStyle: 'dashed',
                            marginVertical: HEIGHT * 0.02,
                        }}
                    ></View>

                    {/* </View> */}
                    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',marginVertical:HEIGHT*0.03}}>
                <Text style={{ fontSize: 16,}}>Total Payment</Text>
                <Text style={{fontSize: 16,}}> ₹{totalPrice+1}</Text>
            </View>

                </View>
            </ScrollView>
            <Pressable
                style={{
                    width: WIDTH * 0.9,
                    bottom: HEIGHT * 0.05,
                    backgroundColor: colors.brownColor,
                    paddingVertical: 15,
                    borderRadius: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }}
                onPress={handlePayment}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color={colors.commonWhite} /> :
                    <Text style={{ color: '#FFF', fontSize: 18 }}>Pay Now</Text>}

            </Pressable>
        </SafeAreaView>
    );
};

export default PaymentScreen;
