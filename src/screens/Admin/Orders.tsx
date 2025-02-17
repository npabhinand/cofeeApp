/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import OrderDetailsRenderItem from '../../components/OrderDetailsRenderItem';
import { ordersScreenProps } from '../../constants/types/commonTypes';

const Orders: React.FC<ordersScreenProps> = ({ route }) => {
    const { orderTypes, buttonNames, showItem } = route.params;
    const [isSelected, setIsSelected] = useState<string>(orderTypes);
    const [selectedData, setSelectedData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);

    const orderType: { newOrder: string; delivered: string; cancelled: string; } = {
        newOrder: 'New Orders',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
    };

    useEffect(() => {
        if (isSelected === orderType.newOrder) {
            fetchNewOrders();
        }
        else if (isSelected === orderType.delivered) {
            fetchDeliveredOrders();
        }
        else {
            fetchCancelledOrders();
        }
    }, [isSelected, update]);


    const fetchNewOrders = async () => {
        try {
            setTimeout(() => {
                setLoading(true);
            }, 200);

            const orders: any = [];
            // let totalPrice = 0;
            await firestore().collection('orders')
                .where('status', '==', 'processing')
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                        // totalPrice += doc.data().TotalPrice;
                    });
                    setSelectedData(orders);
                    setLoading(false);
                });
        } catch (err) {
            console.log('Error while fetching  new orders data', err);
            setLoading(false);
        }
    };

    const fetchCancelledOrders = async () => {
        try {
            setTimeout(() => {
                setLoading(true);
            }, 200);
            const orders: any = [];
            // let totalPrice = 0;
            await firestore().collection('orders')
                .where('status', '==', 'cancelled')
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                        // totalPrice += doc.data().TotalPrice;
                    });
                    setSelectedData(orders);
                    setLoading(false);
                });
        } catch (err) {
            console.log('Error while fetching  cancelled orders data', err);
            setLoading(false);
        }
    };

    const fetchDeliveredOrders = async () => {
        try {
            setTimeout(() => {
                setLoading(true);
            }, 200);
            const orders: any = [];
            // let totalPrice = 0;
            await firestore().collection('orders')
                .where('status', '==', 'delivered')
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                        // totalPrice += doc.data().TotalPrice;
                    });
                    const orderWithProfit = orders.map(order => {
                        let orderProfit = 0;
                        order.products.forEach(product => {
                            orderProfit += parseInt(product.price, 10) * product.profit / 100;
                        });
                        console.log(orderProfit, '>>>>>');
                        return { ...order, profit: orderProfit.toFixed(2) };

                    });
                    setSelectedData(orderWithProfit);
                    setLoading(false);
                });

        } catch (err) {
            console.log('Error while fetching delivered orders data', err);
            setLoading(false);
        }
    };


    const handleButtonClick = (buttonName: string) => {
        setIsSelected(buttonName);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent header={'Orders'} />
            <View style={{ padding: WIDTH * 0.05 }}>
                {buttonNames && <View style={{ flexDirection: 'row', marginBottom: HEIGHT * 0.02, backgroundColor: colors.commonWhite, borderRadius: 10 }}>
                    {buttonNames.map((button) => (
                        <Pressable key={button.id} onPress={() => handleButtonClick(button.name)}
                            style={[{ width: WIDTH * 0.3, height: HEIGHT * 0.056, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
                            isSelected === button.name && { backgroundColor: colors.brownColor },
                            ]}><Text style={[isSelected === button.name && { color: colors.commonWhite }]}>{button.name}</Text></Pressable>
                    ))}
                </View>}

                {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT * 0.3 }} /> :
                    <FlatList
                        data={selectedData}
                        bounces={false}
                        ListEmptyComponent={<EmptyComponent />}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <OrderDetailsRenderItem item={item.item} setLoading={setUpdate} showItem={showItem} />
                        )} />
                }
            </View>
        </SafeAreaView>
    );
};

export default Orders;


const EmptyComponent = () => {
    return (
        <View style={{ marginTop: HEIGHT * 0.3, alignItems: 'center' }}>
            <Text style={{ color: colors.brownColor }}>No Ordered Items</Text>
        </View>
    );
};

