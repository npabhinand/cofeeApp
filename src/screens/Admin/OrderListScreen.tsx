/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, FlatList, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import { colors } from '../../constants/colors';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import OrderDetailsRenderItem from '../../components/OrderDetailsRenderItem';
import HeaderComponent from '../../components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';


const OrderListScreen = () => {
    const navigation = useNavigation();
    const [orderList, setOrderList] = useState<[]>([]);
    const [fullOrderList, setFullOrderList] = useState<[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const orders: any = [];
            let totalPrice = 0;
            await firestore().collection('orders')
                .where('status', '==', 'delivered')
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                        totalPrice += doc.data().TotalPrice;
                    });
                });

            const orderWithProfit = orders.map(order => {
                let orderProfit = 0;
                order.products.forEach(product => {
                    orderProfit += parseInt(product.price, 10) * product.profit / 100;
                });
                console.log(orderProfit, '>>>>>');
                return { ...order, profit: orderProfit.toFixed(2) };

            });
            setFullOrderList(orderWithProfit);
            setOrderList(orderWithProfit);
            setPrice(totalPrice);
            // const totalProfit = orderWithProfit.reduce((profits, curr) => curr.products.map((product) => profits += parseInt(product.price) * profit / 100), 0);
            const totalProfit = orderWithProfit.reduce((profits, curr) => profits += parseFloat(curr.profit), 0);
            setProfit(totalProfit);
        }
        catch (err) {
            console.log('Error while fetching data');
        }
    };
    const handleDateSelected = (selectedDate: string) => {

        const filteredOrders = fullOrderList.filter(order => {
            const orderDate = moment(order.orderTime).format('DD/MM/YYYY');
            return orderDate === selectedDate;
        });
        setOrderList(filteredOrders);
        const updatedPrice = filteredOrders.reduce((total, order) => total + order.TotalPrice, 0);
        const updatedProfit = filteredOrders.reduce((profits, curr) => profits += parseFloat(curr.profit), 0);
        setProfit(updatedProfit);
        setPrice(updatedPrice);
    };

    const orderInventoryArray = [
        { id: 1, name: 'Orders', count: orderList.length || 0 },
        { id: 2, name: 'Income', count: `₹${price}` },
        { id: 3, name: 'Profit', count: `₹${profit}` },
    ];


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <HeaderComponent header={'Orders'} />

            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                style={{ height: HEIGHT * 0.12, paddingTop: 10 }}
                calendarHeaderStyle={{ color: 'white' }}
                calendarColor={colors.brownColor}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                startingDate={moment()}
                onDateSelected={(date) => handleDateSelected(moment(date).format('DD/MM/YYYY'))}
            />
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{}}>
                <Pressable style={{ flexDirection: 'row', backgroundColor: colors.commonWhite, alignItems: 'center', height: HEIGHT * 0.15, justifyContent: 'space-evenly' }} onPress={() => navigation.navigate('Orders')}>
                    {orderInventoryArray.map((item, index) => (
                        <View key={index}>
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: colors.brownColor }}>{item.count}</Text>
                            <Text style={{ color: colors.grayColor }}>{item.name}</Text>
                        </View>
                    ))}
                </Pressable>
                <Text style={{ fontSize: 25, margin: WIDTH * 0.05 }}>Order Details</Text>

                <FlatList
                    data={orderList}
                    scrollEnabled={false}
                    // keyExtractor={}
                    renderItem={(item) => (
                        <OrderDetailsRenderItem item={item.item} />
                    )} />

            </ScrollView>
        </SafeAreaView >
    );
};

export default OrderListScreen;
