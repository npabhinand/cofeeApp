/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, SafeAreaView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { addShopProps } from '../constants/types/commonTypes';
import { backIcon, plusIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';


const AddTableComponent: React.FC<addShopProps> = (props) => {
    const { item, setIsVisible, isVisible, setUpdate } = props;
    const [tables, setTables] = useState(item?.tables ? item?.tables.map(([tableId, capacity]) => ({ tableId, capacity })) : []);
    const [tableId, setTableId] = useState<string>('');
    const [capacity, setCapacity] = useState<string>('');

    const addTable = () => {
        if (tableId.trim() && capacity.trim()) {
            setTables([...tables, { tableId: tableId, capacity: capacity }]);
            setTableId('');
            setCapacity('');
        } else {
            Alert.alert('Both Fields in table are required');
        }
    };

    const deleteTable = (id: number) => {
        const updatedTable = [...tables];
        updatedTable.splice(id, 1);
        setTables(updatedTable);
    };
    const handleSubmit = async () => {
        try {
            await firestore().collection('shops').doc(item.id).update({
                tables,
            });
            Alert.alert('Table Added Successfully');
            setUpdate(true);
            setIsVisible(!isVisible);
        } catch (error) {
            console.log(error, 'error ocurred');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: WIDTH * 0.05 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: HEIGHT * 0.02 }}>
                <Pressable onPress={() => setIsVisible(!isVisible)}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item?.id ? 'Update Table Setting' : 'Add Table Setting'}</Text>
                <View />
            </View>
            <Text>Shop Name</Text>
            <TextInput value={item?.name} editable={false} style={{ marginVertical: HEIGHT * 0.01, paddingLeft: 10, width: WIDTH * 0.9, height: 0.056 * HEIGHT, borderRadius: 10, borderWidth: 0.5, backgroundColor: `${colors.grayColor}50` }} />
            {/* tables */}
            <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.01, }}>Tables</Text>

            <View style={{}}>
                {tables.map((table, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, marginBottom: HEIGHT * 0.01, backgroundColor: `${colors.grayColor}50`, height: HEIGHT * 0.05, padding: WIDTH * 0.02, borderRadius: 10, marginRight: WIDTH * 0.04 }}>
                        <Text style={{}}>Table Id: {table.tableId}</Text>
                        <Text style={{}}>Table capacity:{table.capacity}</Text>
                        <Pressable onPress={() => deleteTable(index)}>
                            <Text style={{ color: colors.commonWhite, fontWeight: '600' }}>X</Text>
                        </Pressable>
                    </View>
                ))}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, marginBottom: HEIGHT * 0.01 }}>
                <TextInput
                    placeholder="Table Id"
                    style={{
                        paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5,
                        // backgroundColor: isEdit ? colors.commonWhite : `${colors.grayColor}20`,
                    }}
                    value={tableId}
                    onChangeText={(text) => setTableId(text)}
                />
                <TextInput
                    placeholder="Seat Capacity"
                    style={{
                        paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5,
                        // backgroundColor: isEdit ? colors.commonWhite : `${colors.grayColor}20`,
                    }}
                    value={capacity}
                    onChangeText={(text) => setCapacity(text)}
                />
                <Pressable style={{ width: WIDTH * 0.1, backgroundColor: colors.commonBlack, height: WIDTH * 0.1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={addTable}>
                    <Image source={plusIcon} />
                </Pressable>
            </View>
            {/*  */}
            <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.05, width: WIDTH * 0.9, alignItems: 'center', height: HEIGHT * 0.056, alignSelf: 'center', backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10 }} onPress={handleSubmit}>
                <Text style={{ color: colors.commonWhite, fontWeight: '600' }} >Add Table</Text>
            </Pressable>

        </SafeAreaView>
    );
};

export default AddTableComponent;
