/* eslint-disable react-native/no-inline-styles */

import { SafeAreaView, Text, Alert, FlatList, ScrollView, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import MyOrderComponent from '../../components/MyOrderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const UserOrderListScreen = () => {
    const userData = useSelector(selectedUserData);
    const { email } = userData[0];
    const navigation = useNavigation();
    const [currentOrderList, setCurrentOrderList] = useState<[]>([]);
    const [pastOrderList, setPastOrderList] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchCurrentOrders();
        fetchPastOrders();
    }, [update]);


    const fetchCurrentOrders = async () => {
        const orders: any = [];
        try {
            setTimeout(() => {
                setLoading(true);
            }, 150);
            await firestore().collection('orders')
                .where('userId', '==', email)
                .where('status', '==', 'processing').get()
                .then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                    });
                });
            setCurrentOrderList(orders);
            setLoading(false);
        } catch {
            console.log('Error occur while fetching orders');
            Alert.alert('Error occur while fetching orders');
        }
    };
    const fetchPastOrders = async () => {
        const orders: any = [];
        try {
            await firestore().collection('orders')
                .where('userId', '==', email)
                .where('status', 'in', ['delivered', 'cancelled']).get()
                .then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        orders.push({ ...doc.data(), id: doc.id });
                    });
                });
            setPastOrderList(orders);
        } catch {
            console.log('Error occur while fetching orders');
            Alert.alert('Error occur while fetching orders');
        }
    };
    // }
    const onNavigation = () => {
        navigation.navigate('DeliveryScreen');
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <View style={{}}>
                    <HeaderComponent header={'My Orders'} />
                    <ScrollView style={{ paddingHorizontal: WIDTH * 0.05, paddingBottom: 100 }} bounces={false}>

                        {currentOrderList.length > 0 && (
                            <Text style={{ fontSize: 18, marginBottom: HEIGHT * 0.02, fontWeight: '600' }}>Current Orders</Text>
                        )}

                        <FlatList
                            data={currentOrderList}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={(item) => (
                                <MyOrderComponent item={item.item} setUpdate={setUpdate} onNavigation={onNavigation} />
                            )} />


                        {pastOrderList.length > 0 && (
                            <Text style={{ fontSize: 18, marginBottom: HEIGHT * 0.02, fontWeight: '600' }}>Past Orders</Text>
                        )}

                        <FlatList
                            data={pastOrderList}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => (
                                <MyOrderComponent item={item.item} setUpdate={setUpdate} />
                            )} />
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    );
};


export default UserOrderListScreen;
