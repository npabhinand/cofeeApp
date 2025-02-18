/* eslint-disable react-native/no-inline-styles */
import { FlatList, Modal, Pressable, SafeAreaView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import StockRenderItem from '../../components/StockRenderItem';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import AddStockComponent from '../../components/AddStockComponent';


const StockProductScreen = ({ route }) => {
    const { item } = route.params;
    const [isVisible, setIsVisible] = useState(false);
    const [stockData, setStockData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    // console.log(item.id)

    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        const stocks: any = [];
        try {
            const stockRef = await firestore().collection('stock').where('productId', '==', item.id).get();
            stockRef.forEach((doc) => stocks.push({ ...doc.data(), id: doc.id, ...item }));
            setStockData(stocks);
        } catch (error) {
            console.log('error while fetchingstock data');
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent header={'Product Stock'} />
            <FlatList
                data={stockData}
                renderItem={(stock) => (
                    <StockRenderItem item={stock.item} setLoading={setLoading} loading={loading} />
                )} />


            <Pressable style={{ position: 'absolute', justifyContent: 'center', bottom: HEIGHT * 0.03, backgroundColor: colors.brownColor, width: WIDTH * 0.9, alignSelf: 'center', height: HEIGHT * 0.056, borderRadius: 10 }} onPress={() => setIsVisible(!isVisible)}>
                <Text style={{ color: colors.commonWhite, textAlign: 'center', fontWeight: '600' }}>Add stock</Text>
            </Pressable>

            <Modal visible={isVisible} animationType="slide">
                <AddStockComponent item={item} setLoading={setLoading} loading={loading} edit={true} setIsVisible={setIsVisible} isVisible={isVisible} />
            </Modal>
        </SafeAreaView>
    );
};

export default StockProductScreen;
