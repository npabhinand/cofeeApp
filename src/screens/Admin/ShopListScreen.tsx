/* eslint-disable react-native/no-inline-styles */
import { Text, SafeAreaView, Pressable, Modal, ActivityIndicator, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import RenderItem from '../../components/RenderItem';
import AddComponent from '../../components/AddComponent';

const ShopListScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
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
            shopRef.forEach((doc) => (shops.push({ id: doc.id, ...doc.data() })));
            setShopData(shops);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch shop details', error);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <View style={{ flex: 1 }}>
                    <HeaderComponent header={'Shops'} />
                    {/* renderItem */}
                    <FlatList
                        data={shopData}
                        bounces={false}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <RenderItem item={item.item} setUpdate={setUpdate} modalShow={'shop'} />)} />

                    <Pressable style={{ position: 'absolute', width: WIDTH * 0.9, height: HEIGHT * 0.06, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => setIsVisible(!isVisible)}>
                        <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Add Shop</Text>
                    </Pressable>

                    <Modal visible={isVisible} animationType="slide">
                        <AddComponent setIsVisible={setIsVisible} isVisible={isVisible} setUpdate={setUpdate} />
                    </Modal>
                </View>
            }
            {/*  */}

        </SafeAreaView>
    );
};

export default ShopListScreen;
