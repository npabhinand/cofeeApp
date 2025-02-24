/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { Dropdown } from 'react-native-element-dropdown';
import { table4, table5, table6, table8 } from '../../assets/icons';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../../redux/slice/userDataSlice';


const BookTableScreen = () => {
    const userData = useSelector(selectedUserData);
    const { id, name } = userData[0];

    const [shopData, setShopData] = useState<{}[]>([]);
    const [tables, setTables] = useState([] || null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<[]>([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        onFetchShopData();
    }, []);

    const onFetchShopData = async () => {
        try {
            const shops: any = [];
            await firestore()
                .collection('shops')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        shops.push({ ...doc.data(), shopId: doc.id });
                    });
                });
            setShopData(shops);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    const handleTablePress = (tableId: string) => {
        setSelected(prevState => {
            if (prevState.includes(tableId)) {
                return prevState.filter((table) => table !== tableId);
            } else {
                return [...prevState, tableId];
            }
        });
    };

    const onPressBook = async () => {
        try {
            await firestore().collection('booking').add({
                userId: id,
                name: name,
                tablesBooked: selected,
                bookTime: Date.now(),
            });
            if (selectedShop) {
                await firestore().collection('shops').doc(selectedShop.shopId).update({
                    book: true,
                });
            }
        }
        catch (err) {
            console.log(err, ' error while booking');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                {tables && (
                    <>
                        <Text style={{ fontSize: 18 }} >Select Tables</Text>
                        <FlatList
                            data={tables}
                            numColumns={2}
                            keyExtractor={(item) => item.tableId}
                            renderItem={({ item }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ position: 'absolute' }}>{item.tableId}</Text>
                                    <Pressable onPress={() => handleTablePress(item.tableId)}>
                                        <Image
                                            source={item.capacity === '4' ? table4 : item.capacity === '5' ? table5 : item.capacity === '6' ? table6 : table8}
                                            style={{ width: WIDTH * 0.3, height: WIDTH * 0.3, tintColor: selected.includes(item.tableId) ? colors.redColor : colors.greenColor }}
                                        />
                                    </Pressable>
                                </View>
                            )}
                        />
                    </>
                )}
            </View>

            <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.05, alignSelf: 'center', width: WIDTH * 0.9, backgroundColor: colors.brownColor, height: HEIGHT * 0.056, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}><Text style={{ fontWeight: '600', color: colors.commonWhite }} onPress={onPressBook}>Reserve Table</Text></Pressable>
        </SafeAreaView>
    );
};

export default BookTableScreen;
