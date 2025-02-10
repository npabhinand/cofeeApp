/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { useNavigation } from '@react-navigation/native';
import { backIcon } from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import ProfitRenderItem from '../../components/ProfitRenderItem';
import { colors } from '../../constants/colors';

const ProfitListScreen = () => {
    const [coffeeData, setCoffeeData] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const coffees: any = [];
            try {
                const coffeeRef = await firestore().collection('orders').get();
                coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
                setCoffeeData(coffees);
            } catch (error) {
                console.log('error while fetching data', error);
            }
        };
        fetchData();
    }, [loading]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ?

                <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} /> :

                <>
                    <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01 }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>profit</Text>
                    </View>
                    <View style={{ width: WIDTH * 0.8, height: HEIGHT * 0.2, alignSelf: 'center', backgroundColor: `${colors.brownColor}90`, borderRadius: 30, padding: HEIGHT * 0.05 }}>
                        <Text>profit</Text>
                        <Text style={{ fontSize: HEIGHT * 0.04, fontWeight: '600' }}>$24.45</Text>
                    </View>
                    <Text style={{ padding: WIDTH * 0.05, fontSize: HEIGHT * 0.022, fontWeight: '600' }}>Recent Orders</Text>
                    <FlatList
                        data={coffeeData}
                        renderItem={(item) => (
                            <ProfitRenderItem item={item.item} setLoading={setLoading} loading={loading} />
                        )}
                    />
                </>

            }
        </SafeAreaView>
    );
};

export default ProfitListScreen;
