/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState } from 'react';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import CardRenderItem from '../../components/AdminCardRenderItem';
import DropDown from '../../components/DropDown';




const AdminHomeScreen = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [counts, setCounts] = useState<{}>([]);

    // useEffect(() => {
    //     fetchCounts();
    // }, []);

    // const fetchProductCounts = async () => {
    //     try {
    //         const productSnapshot = await getCountFromServer(firestore().collection('products'));
    //         const productCount = productSnapshot.data().count;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // const fetchOrderCounts = async () => {
    //     try {
    //         const orderSnapshot = await getCountFromServer(firestore().collection('orders'));
    //         const orderCount = orderSnapshot.data().count;

    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // const fetchUserCounts = async () => {
    //     try {
    //         const userSnapshot = await getCountFromServer(firestore().collection('user').where('userType', '==', 'user'));
    //         const userCount = userSnapshot.data().count;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // const fetchStockCounts = async () => {
    //     try {
    //         const coffees = [];
    //         const coffeeRef = await firestore().collection('items').where('stock', '>', 0).get();
    //         coffeeRef.forEach(doc => coffees.push({ ...doc.data(), id: doc.id }));
    //         const stockCount = coffees.reduce((count, item) => count += item.stock, 0);

    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // const fetchTotalProfits = async () => {
    //     try {
    //         const orders: [] = [];
    //         const orderRef = await firestore().collection('orders').get();
    //         orderRef.forEach(doc => orders.push({ ...doc.data(), id: doc.id }));

    //         const orderWithProfit = orders.map(order => {
    //             let orderProfit = 0;
    //             order.products.forEach(product => {
    //                 orderProfit += parseInt(product.price, 10) * product.profit / 100;
    //             });
    //             console.log(orderProfit, '>>>>>');
    //             return { ...order, profit: orderProfit.toFixed(2) };

    //         });
    //         const totalProfit = orderWithProfit.reduce((profits, curr) => profits += parseFloat(curr.profit), 0);
    //     }catch(error){
    //         console.log(error);
    //     }
    // };

    // const counters = useSelector(selectedCounts);
    const cardArray = [
        { id: 1, title: 'Product', count: counts.productCount, navigate: 'ProductListScreen' },
        { id: 2, title: 'User', count: counts.userCount, navigate: 'UserListScreen' },
        { id: 3, title: 'Orders', count: counts.orderCount, navigate: 'OrderListScreen' },
        { id: 4, title: 'Stock', count: counts.stockCount, navigate: 'StockListScreen' },
        { id: 5, title: 'Profit', count: `₹${counts.totalProfit}`, navigate: 'ProfitListScreen' },
        { id: 6, title: 'Shops', count: 0, navigate: 'ShopListScreen' },
        { id: 7, title: 'Table Settings', count: 0, navigate: 'TableSettingScreen' },
    ];




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.commonWhite }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <>
                    <View style={{ flexDirection: 'row', marginHorizontal: WIDTH * 0.05, justifyContent: 'space-between', height: HEIGHT * 0.05, marginVertical: HEIGHT * 0.03, marginBottom: HEIGHT * 0.05 }}>
                        <View>
                            <Text style={{ fontSize: 9, color: colors.grayColor }}>WELCOME BACK</Text>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Admin</Text>
                        </View>

                        <DropDown color={colors.commonBlack} onPressClose={() => setIsVisible(!isVisible)} isVisible={isVisible} />
                    </View>
                    <FlatList
                        data={cardArray}
                        numColumns={2}
                        bounces={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{}}
                        renderItem={(item) => (
                            <CardRenderItem item={item.item} />
                        )}
                    />
                </>}
        </SafeAreaView>
    );
};


export default AdminHomeScreen;
