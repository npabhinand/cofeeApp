/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { backIcon } from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import StockRenderItem from '../../components/StockRenderItem';
import { colors } from '../../constants/colors';

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
                            <StockRenderItem item={item.item} setLoading={setLoading} loading={loading} />
                        )}
                    />
                </>
            }
        </SafeAreaView>
    );
};

export default StockListScreen;
