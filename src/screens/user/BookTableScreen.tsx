/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addbookingTable } from '../../redux/slice/bookingTableSlice';



const BookTableScreen = () => {
    const dispatch=useDispatch();
    const db=firestore();
    const userData = useSelector(selectedUserData);
    const { id, name } = userData[0];
    const navigation=useNavigation();
    const [shopData, setShopData] = useState<{}[]>([]);
    const [tables, setTables] = useState([] || null);
    const [selected, setSelected] = useState<[]>([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        onFetchShopData();
    }, []);

    const onFetchShopData = async () => {
        try {
            const shops: any = [];
            await db
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
    // console.log('id',id,'name',name,'selected---',selectedShop);
    
    const selectedShops = shopData.find((item) => item.name === selectedShop);
    
    const onPressBook = async () => {
        // try {
        //     await firestore().collection('booking').add({
        //         userId: id,
        //         name: name,
        //         tablesBooked: selected,
        //         bookTime: Date.now(),
        //     });
        //     console.log('seleceted shop', selectedShop);
            
        //     if (selectedShop) {
        //         const shopDoc = firestore().collection('shops').doc(selectedShopId.shopId);
        //         const shopData = (await shopDoc.get()).data();
                
        //         const updatedTables = shopData.tables.map((item) => {
        //             if (selected.includes(item.tableId)) {
        //                 return { ...item, booked: true };
        //             }
        //             return item;
        //         });
    
        //         await shopDoc.update({
        //             tables: updatedTables,
        //         });
        //     }
        // }
        // catch (err) {
        //     console.log(err, ' error while booking');
        // }
        console.log('tables',selected)
        dispatch(addbookingTable({
            shopId:selectedShops.shopId,
            name:selectedShop,
            tables:selected,
        }));
        navigation.goBack();
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
                                <Pressable onPress={() => handleTablePress(item.tableId)} disabled={item.booked?true:false} style={{flexDirection:'row', width:WIDTH*0.3,height:60, 
                                backgroundColor:selected.includes(item.tableId)||item.booked ? `${colors.grayColor}50` : colors.greenColor, borderRadius:10, alignItems:'center',justifyContent:'center', margin:10}}>
                                    <Text style={{color:colors.commonWhite}}>{item.tableId}</Text>
                                        <Text style={{color:colors.commonWhite}}>- {item.capacity}</Text>
                                    </Pressable>
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
