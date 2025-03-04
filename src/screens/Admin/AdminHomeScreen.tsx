import { useEffect, useState } from 'react';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import CardRenderItem from '../../components/AdminCardRenderItem';
import DropDown from '../../components/DropDown';
import { addAdminCount, selectAdminCount } from '../../redux/slice/adminCountSlice';

const AdminHomeScreen = () => {
  const db = firestore();
  const adminCount = useSelector(selectAdminCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [update,setUpdate]=useState<boolean>(false);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      const counts = await getCounts();
      dispatch(addAdminCount(counts));
      setLoading(false);
    };
    fetchCounts();
  }, []);

  const getCounts = async () => {
    const counts = {
      productCount: await fetchProductCounts(),
      userCount: await fetchUserCounts(),
      orderCount: await fetchOrderCounts(),
      stockCount: await fetchStockCounts(),
      totalProfit: await fetchProfitCount(),
      shopCount: await fetchShopCounts(),
    };
    return counts;
  };

  const fetchProductCounts = async () => {
    try {
      const productSnapshot = await getCountFromServer(db.collection('products'));
      return productSnapshot.data().count;
    } catch (error) {
      console.log(error);
      
    }
  };

  const fetchShopCounts = async () => {
    try {
      const shopSnapshot = await getCountFromServer(db.collection('shops'));
      console.log(',,,',shopSnapshot.data().count);
      return shopSnapshot.data().count;
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderCounts = async () => {
    try {
      const orderSnapshot = await db.collection('orders').where('status', '==', 'delivered').get();
      return orderSnapshot.size;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserCounts = async () => {
    try {
      const userSnapshot = await db.collection('user').where('userType', '==', 'user').get();
      return userSnapshot.size;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const fetchStockCounts = async () => {
    try {
      const items:any = [];
      const itemRef = await db.collection('items').where('stock', '>', 0).get();
      itemRef.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      return items.reduce((count:number, item) => count + item.stock, 0);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const fetchProfitCount = async () => {
    try {
      const items = [];
      let totalProfit = 0;
      const orderRef = await db.collection('orders').where('status', '==', 'delivered').get();
  
      orderRef.forEach(doc => {
        items.push({ ...doc.data(), id: doc.id });
      });
  
      for (const item of items) {
        for (const product of item.products) {
          const snapShot = await db.collection('items').doc(product.itemId).get();
          const profit = snapShot.data().profit;
          totalProfit += (profit * product.price * product.quantity) / 100;
        }
      }
  
      return totalProfit;
    } catch (error) {
      console.log(error);
    }
  };
  

  const cardArray = [
    { id: 1, title: 'Product', count: adminCount.productCount, navigate: 'ProductListScreen' },
    { id: 2, title: 'User', count: adminCount.userCount, navigate: 'UserListScreen' },
    { id: 3, title: 'Orders', count: adminCount.orderCount, navigate: 'OrderListScreen' },
    { id: 4, title: 'Stock', count: adminCount.stockCount, navigate: 'StockListScreen' },
    { id: 5, title: 'Profit', count: `₹${adminCount.totalProfit}`, navigate: 'ProfitListScreen' },
    { id: 6, title: 'Shops', count: adminCount.shopCount, navigate: 'ShopListScreen' },
    { id: 7, title: 'Table Setting', navigate: 'TableSettingScreen' },
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
