/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Modal, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { Dropdown } from 'react-native-element-dropdown';
import { table4, table5, table6, table8 } from '../../assets/icons';
import { colors } from '../../constants/colors';


const BookTableScreen = () => {
    const [shopData, setShopData] = useState<{}[]>([]);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        onFetchShopData();
    }, []);

    console.log('tre');

    const onFetchShopData = async () => {
        try {
            const shops: any = [];
            await firestore()
                .collection('shops')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        shops.push(doc.data());
                    });
                });
            setShopData(shops);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    const handleTablePress = (tableName: string) => {
        setSelected(prevSelected => prevSelected === tableName ? null : tableName);
    };

    return (
        <SafeAreaView>
            <HeaderComponent header="Book A Table" />
            <View style={{ paddingHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.02, gap: 10 }}>

                <Dropdown
                    data={shopData}
                    search
                    maxHeight={HEIGHT * 0.4}
                    searchPlaceholder="Search Here"
                    labelField="name"
                    valueField="value"
                    placeholder={!isFocus || !selectedShop ? 'Select Shop' : selectedShop}
                    value={selectedShop}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setSelectedShop(item.name);
                        const selectedShopData = shopData.find((shop) => shop.name === item.name);
                        if (selectedShopData) {
                            setTables(selectedShopData.tables);
                        } else {
                            setTables([]);
                        }
                        setIsFocus(false);
                    }}
                    style={{ width: 'auto', maxWidth: WIDTH * 0.5, marginTop: HEIGHT * 0.02, justifyContent: 'center' }}
                />

                <Text style={{ fontSize: 18 }} >Select Tables</Text>

                {tables &&
                    <FlatList
                        data={tables}
                        numColumns={2}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleTablePress(item.name)}>
                                <Image
                                    source={item.capacity === '4' ? table4 : item.capacity === '5' ? table5 : item.capacity === '6' ? table6 : table8}
                                    style={{ width: WIDTH * 0.3, height: WIDTH * 0.3, tintColor: selected === item.name ? 'green' : colors.redColor }}
                                />
                            </Pressable>
                        )}
                    />
                }
            </View>
        </SafeAreaView>
    );
};

export default BookTableScreen;
