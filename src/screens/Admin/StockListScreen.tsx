/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { backIcon } from '../../assets/icons';
import StockRenderItem from '../../components/StockRenderItem';
import { colors } from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';

const StockListScreen = () => {
    const [coffeeData, setCoffeeData] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [update, setUpdate] = useState(false);
    useEffect(() => {

        fetchData();
    }, [loading]);
    const fetchData = async () => {
        const coffees: any = [];
        setUpdate(true);
        try {

            const coffeeRef = await firestore().collection('coffeeItem').get();
            coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
            setCoffeeData(coffees);
            setUpdate(false);
        } catch (error) {
            console.log('error while fetching data', error);
        }
        setUpdate(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {update ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <>
                    <HeaderComponent header={'stocks'} />
                    {/*  */}
                    <FlatList
                        data={coffeeData}
                        renderItem={(item) => (
                            <StockRenderItem item={item.item} setLoading={setLoading} loading={loading} />
                        )}
                    />
                </>
            }
        </SafeAreaView>
    );
};

export default StockListScreen;
