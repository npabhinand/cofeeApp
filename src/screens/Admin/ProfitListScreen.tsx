/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import ProfitRenderItem from '../../components/ProfitRenderItem';
import { colors } from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';
import { useSelector } from 'react-redux';
import { selectAdminCount } from '../../redux/slice/adminCountSlice';
// import { colors } from '../../constants/colors';

const ProfitListScreen = () => {
    const adminCount = useSelector(selectAdminCount);

    const [coffeeData, setCoffeeData] = useState([]);
    const [isUpdate,setIsUpdate]=useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, [isUpdate]);

    const fetchData = async () => {
        const coffees: any = [];
        try {
            setLoading(true);
            const coffeeRef = await firestore().collection('items').get();
            coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
            setCoffeeData(coffees);
            setLoading(false);
        } catch (error) {
            console.log('error while fetching data', error);
        }
        setLoading(false);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :

                <>
                    <HeaderComponent header={'Profit'} />


                    <View style={{ width: WIDTH * 0.8, height: HEIGHT * 0.2, alignSelf: 'center', backgroundColor: `${colors.brownColor}90`, borderRadius: 30, padding: HEIGHT * 0.05 }}>
                        <Text>profit</Text>
                        <Text style={{ fontSize: HEIGHT * 0.04, fontWeight: '600' }}>₹{adminCount.totalProfit}</Text>
                    </View>

                    {/* <Pressable style={{
                        alignSelf: 'center', marginTop: HEIGHT * 0.02, width: WIDTH * 0.15, height: WIDTH * 0.15, borderRadius: 10, backgroundColor
                            : colors.commonBlack, alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Image source={plusIcon} style={{ width: WIDTH * 0.08, height: WIDTH * 0.08 }} />
                    </Pressable> */}

                    <Text style={{ paddingLeft: WIDTH * 0.05, marginTop: HEIGHT * 0.01, fontSize: HEIGHT * 0.022, fontWeight: '600' }}>Product Profits</Text>
                    <FlatList
                        data={coffeeData}
                        renderItem={(item) => (
                            <ProfitRenderItem item={item.item}  setIsUpdate={setIsUpdate}/>
                        )}
                    />
                </>

            }
        </SafeAreaView>
    );
};

export default ProfitListScreen;
