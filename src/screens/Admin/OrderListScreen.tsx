import { View, Text, SafeAreaView, FlatList, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import moment from 'moment';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import OrderDetailsRenderItem from '../../components/OrderDetailsRenderItem';
import HeaderComponent from '../../components/HeaderComponent';
import { RootStackParamList } from '../../routes/AppNavigator';

const OrderListScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const db = firestore();
    const [orderList, setOrderList] = useState<[]>([]);
    const [fullOrderList, setFullOrderList] = useState<[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [update,setUpdate]=useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<string>('Delivery');

   
    useEffect(() => {
        fetchCount();
        if (isSelected === 'Delivery') {
            fetchOrder('Delivery');
        } else if (isSelected === 'Pick Up') {
            fetchOrder('Pick Up');
        } else {
            fetchOrder('Dining');
        }
    }, [isSelected,update]);

    const fetchOrder = async (orderType: string) => {
        try {
            const orders: any = [];
            await db.collection('orders').where('orderType', '==', orderType)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                    });
                });
            setOrderList(orders);
            setFullOrderList(orders);
        } catch (error) {
            console.error('error fetchingData');
            Alert.alert('Failed to fetch data');
        }
    };

    const fetchCount = async () => {
        try {
            const orderSnapshot = await getCountFromServer(db.collection('orders'));
            const orderCount = orderSnapshot.data().count;
            setCount(orderCount);
        } catch (error) {
            console.log('error occurred while counting data', error);
        }
    };
    const handleDateSelected = (selectedDate: string) => {
        try {
            console.log('Full Order List:', fullOrderList);
            const filteredOrders = fullOrderList.filter(order => {
                const orderDate = moment(order.orderTime).format('DD/MM/YYYY');
                console.log('Order Date:', orderDate, 'Selected Date:', selectedDate);
                return orderDate === selectedDate;
            });
            console.log('Filtered Orders:', filteredOrders);
            setOrderList(filteredOrders);
            const updatedPrice = filteredOrders.reduce((total, order) => total + order.TotalPrice, 0);
            const updatedProfit = filteredOrders.reduce((profits, curr) => profits += parseFloat(curr.profit), 0);
            setProfit(updatedProfit);
            setPrice(updatedPrice);
        } catch (error) {
            console.error('Error selecting date:', error);
        }
    };
    
    const buttonNames = [
        { id: 1, name: 'New Orders' },
        { id: 2, name: 'Delivered' },
        { id: 3, name: 'Cancelled' },
    ];
    const orderInventoryArray = [
        { id: 1, name: 'Orders', count: count || 0, onNavigate: () => navigation.navigate('Orders', { orderTypes: 'New Orders', buttonNames }) },
        { id: 2, name: 'Income', count: `₹${price}`, onNavigate: () => navigation.navigate('Orders', { orderTypes: 'Delivered', showItem: 'price' }) },
        { id: 3, name: 'Profit', count: `₹${profit}`, onNavigate: () => navigation.navigate('Orders', { orderTypes: 'Delivered', showItem: 'profit' }) },
    ];

    const orderTypeButtonArray = [
        { id: 1, title: 'Delivery' },
        { id: 2, title: 'Pick Up' },
        { id: 3, title: 'Dining' },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <View>
                    <HeaderComponent header={'Orders'} />
                    <CalendarStrip
                        // calendarAnimation={{ type: 'sequence', duration: 30 }}
                        // daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                        style={{ height: HEIGHT * 0.12, paddingTop: 10 }}
                        calendarHeaderStyle={{ color: 'white' }}
                        calendarColor={colors.brownColor}
                        dateNumberStyle={{ color: 'white' }}
                        dateNameStyle={{ color: 'white' }}
                        highlightDateNumberStyle={{ color: 'yellow' }}
                        onDateSelected={(date) => handleDateSelected(moment(date).format('DD/MM/YYYY'))}
                    />


                    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{ marginBottom: HEIGHT * 0.2 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: colors.commonWhite, alignItems: 'center', height: HEIGHT * 0.15, justifyContent: 'space-evenly' }} >
                            {orderInventoryArray.map((item, index) => (
                                <Pressable key={index} onPress={item.onNavigate}>
                                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: colors.brownColor }}>{item.count}</Text>
                                    <Text style={{ color: colors.grayColor }}>{item.name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Text style={{ fontSize: 25, margin: WIDTH * 0.05 }}>Order Details</Text>
                        <FlatList
                            data={orderList}
                            scrollEnabled={false}
                            renderItem={(item) => (
                                <OrderDetailsRenderItem item={item.item} setLoading={setUpdate} loading={update}/>
                            )} />
                    </ScrollView>
                </View>}
            <View style={{ position: 'absolute', bottom: HEIGHT * 0.05, backgroundColor: colors.brownColor, flexDirection: 'row', width: WIDTH * 0.9, height: HEIGHT * 0.05, alignSelf: 'center', alignItems: 'center', borderRadius: 10, justifyContent: 'center' }}>
                {orderTypeButtonArray.map((item, index) => (
                    <Pressable key={index} style={[{ width: WIDTH * 0.29, height: HEIGHT * 0.04, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }, isSelected === item.title && { backgroundColor: colors.commonWhite }]} onPress={() => { setIsSelected(item.title) }}>
                        <Text style={{ color: isSelected === item.title ? colors.commonBlack : colors.commonWhite }}>{item.title}</Text></Pressable>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default OrderListScreen;
