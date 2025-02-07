/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { backIcon } from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import StockRenderItem from '../../components/StockRenderItem';

const StockListScreen = () => {
    const [coffeeData, setCoffeeData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const coffees = [];
            try {
                const coffeeRef = await firestore().collection('coffeeItem').get();
                coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
                setCoffeeData(coffees);
            } catch (error) {
                console.log('error while fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01, alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Stocks</Text>
            </View>
            {/*  */}
            <FlatList
                data={coffeeData}
                renderItem={(item) => (
                    <StockRenderItem item={item.item} />
                )}
            />

        </SafeAreaView>
    );
};

export default StockListScreen;
