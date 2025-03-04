/* eslint-disable react-native/no-inline-styles */

import { SafeAreaView, Text, Alert, FlatList, ScrollView, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import HeaderComponent from '../../components/HeaderComponent';
import MyOrderComponent from '../../components/MyOrderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { colors } from '../../constants/colors';
import { RootStackParamList } from '../../routes/AppNavigator';


const UserOrderListScreen = () => {
    const userData = useSelector(selectedUserData);
    const { id } = userData[0];
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
                .where('userId', '==', id)
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
                .where('userId', '==', id)
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
                    <ScrollView style={{ paddingHorizontal: WIDTH * 0.05, paddingBottom: 100 }} bounces={false} showsVerticalScrollIndicator={false}>

                        {currentOrderList.length > 0 && (
                            <Text style={{ fontSize: 18, marginBottom: HEIGHT * 0.02, fontWeight: '600' }}>Current Orders</Text>
                        )}

                        <FlatList
                            data={currentOrderList}
                            keyExtractor={(item,index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={(item) => (
                                <MyOrderComponent item={item.item} setUpdate={setUpdate} onNavigation={onNavigation} update={update}/>
                            )} />


                        {pastOrderList.length > 0 && (
                            <Text style={{ fontSize: 18, marginBottom: HEIGHT * 0.02, fontWeight: '600' }}>Past Orders</Text>
                        )}

                        <FlatList
                            data={pastOrderList}
                            scrollEnabled={false}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={(item) => (
                                <MyOrderComponent item={item.item} setUpdate={setUpdate} update={update}/>
                            )} />
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    );
};


export default UserOrderListScreen;
