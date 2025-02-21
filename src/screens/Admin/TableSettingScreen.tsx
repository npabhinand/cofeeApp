import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import RenderItem from '../../components/RenderItem';
import HeaderComponent from '../../components/HeaderComponent';

const TableSettingScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shopData, setShopData] = useState([]);
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        fetchShops();
    }, [update]);

    const fetchShops = async () => {
        try {
            setLoading(true);
            const shops: any = [];
            const shopRef = await firestore().collection('shops').get();
            shopRef.forEach(doc => shops.push({ id: doc.id, ...doc.data() }));
            setShopData(shops);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch shop details', error);
            setLoading(false);
        }
    };
    return (
        <SafeAreaView>
            <HeaderComponent header={'Table Setting'} />
            <FlatList
                data={shopData}
                keyExtractor={item => item.id}
                renderItem={item => (
                    <RenderItem item={item.item} setUpdate={setUpdate} modalShow={''} />
                )}
            />
        </SafeAreaView>
    );
};

export default TableSettingScreen;
