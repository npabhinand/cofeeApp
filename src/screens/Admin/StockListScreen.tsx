/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

// import StockRenderItem from '../../components/StockRenderItem';
import { colors } from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';
import ProductRenderItem from '../../components/ProductRenderItem';

const StockListScreen = () => {
    const [coffeeData, setCoffeeData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [update, setUpdate] = useState(false);
    useEffect(() => {

        fetchData();
    }, [loading]);

    const fetchData = async () => {
        const coffees: any = [];
        setUpdate(true);
        try {
            const coffeeRef = await firestore().collection('products').where('deleted', '==', false).get();
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
                    <HeaderComponent header={'Coffee Products'} />
                    {/*  */}
                    <FlatList
                        data={coffeeData}
                        renderItem={(item) => (
                            // <StockRenderItem item={item.item} setLoading={setLoading} loading={loading} />
                            <ProductRenderItem item={item.item} setUpdate={setUpdate} update={update} showButtons={false} />
                        )}
                    />
                </>
            }
        </SafeAreaView>
    );
};

export default StockListScreen;
