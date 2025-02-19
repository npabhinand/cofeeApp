/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, FlatList, Modal, Pressable, SafeAreaView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/firestore';

import ProductRenderItem from '../../components/ProductRenderItem';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import AddProductComponent from '../../components/AddProductComponent';
import HeaderComponent from '../../components/HeaderComponent';




const ProductListScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [update, setUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    // const counter = useSelector(selectedCounts);
    // console.log('counter', counter);
    useEffect(() => {
        fetchProductData();
    }, [update]);

    const fetchProductData = async () => {
        const productArray: any = [];

        try {
            setLoading(true);
            const productRef = await firebase().collection('products').where('deleted', '==', false).get();
            productRef.forEach((doc) => {
                productArray.push({ id: doc.id, ...doc.data() });
            });
            setProductList(productArray);
            setLoading(false);
        } catch (error) {
            console.log('error occured while fetching Product Data');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} /> :

                <>
                    <HeaderComponent header={'Products'} />

                    <FlatList
                        data={productList}
                        // keyExtractor={(item) => item.id}
                        scrollEventThrottle={1}
                        renderItem={(item) => (
                            <ProductRenderItem item={item.item} setUpdate={setUpdate} update={update} showButtons={true} />
                        )} />
                    <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.03, backgroundColor: colors.brownColor, width: WIDTH * 0.9, height: HEIGHT * 0.07, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => setModalVisible(true)}>
                        <Text style={{ fontWeight: 'bold', color: colors.commonWhite, fontSize: 18 }}>Add Product</Text>
                    </Pressable>
                    <Modal visible={modalVisible} animationType="slide">
                        <AddProductComponent setModalVisible={setModalVisible} setUpdate={setUpdate} update={update} />
                    </Modal>
                </>
            }
        </SafeAreaView>
    );
};

export default ProductListScreen;
