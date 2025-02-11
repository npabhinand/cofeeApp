/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CalendarStrip from 'react-native-calendar-strip';
import { colors } from '../../constants/colors';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { backIcon } from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import OrderDetailsRenderItem from '../../components/OrderDetailsRenderItem';
import moment from 'moment';

const OrderListScreen = () => {
    const navigation = useNavigation();
    const [orderList, setOrderList] = useState<[]>([]);
    const [fullOrderList, setFullOrderList] = useState<[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [profit, setProfit] = useState<string>();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders: [] = [];
                let totalPrice = 0;
                await firestore().collection('orders').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                        totalPrice += doc.data().TotalPrice;
                    });
                });
                setFullOrderList(orders);
                setOrderList(orders);
                setPrice(totalPrice);
                setProfit((totalPrice * 0.2).toFixed(2));
            }
            catch (err) {
                console.log('Error while fetching data');
            }
        };
        fetchOrders();
    }, []);


    const handleDateSelected = (selectedDate: string) => {

        const filteredOrders = fullOrderList.filter(order => {
            const orderDate = moment(order.orderTime).format('DD/MM/YYYY');
            return orderDate === selectedDate;
        });
        setOrderList(filteredOrders);
        const updatedPrice = filteredOrders.reduce((total, order) => total + order.TotalPrice, 0);
        setPrice(updatedPrice);
        const updatedProfit = updatedPrice * 0.2;
        setProfit(updatedProfit.toFixed(2));
    };

    const orderInventoryArray = [
        { id: 1, name: 'Orders', count: orderList.length || 0 },
        { id: 2, name: 'Income', count: price },
        { id: 3, name: 'Profit', count: profit },
    ];


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Orders</Text>
            </View>

            <CalendarStrip
                // key={ }
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
                <View style={{ flexDirection: 'row', backgroundColor: colors.commonWhite, alignItems: 'center', height: HEIGHT * 0.15, justifyContent: 'space-evenly' }}>
                    {orderInventoryArray.map((item, index) => (
                        <View key={index}>
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: colors.brownColor }}>{item.count}</Text>
                            <Text style={{ color: colors.grayColor }}>{item.name}</Text>
                        </View>
                    ))}
                </View>
                <Text style={{ fontSize: 25, margin: WIDTH * 0.05 }}>Order Details</Text>

                <FlatList
                    data={orderList}
                    scrollEnabled={false}
                    // keyExtractor={}
                    renderItem={(item) => (
                        <OrderDetailsRenderItem item={item.item} />
                    )} />
                {/*  */}
            </ScrollView>
        </SafeAreaView >
    );
};

export default OrderListScreen;
