/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { backIcon } from '../assets/icons';
import { StockProps } from '../constants/types/commonTypes';

const StockRenderItem: React.FC<StockProps> = (props) => {
    const { item, setLoading, loading } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState<{ product: string; stock: number; }>({ product: item.product || '', stock: item.stock || 0 });
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const handleSubmit = async () => {
        setLoading(true);
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} field is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;

        }


        if (item.id) {
            try {
                await firestore().collection('coffeeItem').doc(item.id).update({
                    stock: parseInt(formData.stock, 10),
                });
                Alert.alert('Stock is Updated');
                setIsVisible(!isVisible);
                setLoading(false);
            } catch (error) {
                console.log('error while updating stock', error);
                Alert.alert('Stock is not updated');
                setLoading(false);
            }
        }
        setLoading(false);
    };

    const onChangeText = (value: any, key: string) => {
        if (key === 'stock') {
            value = value.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    return (
        <>
            <View style={{ width: WIDTH * 0.9, height: WIDTH * 0.25, backgroundColor: colors.commonWhite, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', borderRadius: 10, paddingHorizontal: WIDTH * 0.03, marginTop: HEIGHT * 0.015, gap: WIDTH * 0.05 }}>
                <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.2, height: WIDTH * 0.2, borderRadius: 10 }} />

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Product</Text>
                    <Text style={{ color: colors.grayColor }}>{item.product}</Text>
                </View>
                <View>
                    <Text>Stock</Text>
                    <Text style={{ color: colors.grayColor }}>{item.stock}</Text>

                </View>
                {/* <View>
                    <Text>Profit %</Text>
                    <Text style={{ color: colors.grayColor }}>{item.profit}</Text>
                </View> */}

                <Text style={{ color: colors.brownColor, fontSize: 15, position: 'absolute', bottom: 10, left: WIDTH * 0.4 }} onPress={() => setIsVisible(!isVisible)}>View Details</Text>
                {/* </View> */}
                {/* </View> */}

            </View>
            {/* Modal */}
            <Modal visible={isVisible} animationType="slide">
                <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
                    <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01, marginTop: HEIGHT * 0.1 }}>
                        <Pressable onPress={() => setIsVisible(!isVisible)}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Stock Details</Text>
                    </View>

                    {Object.keys(formData).map((key) => (
                        <View key={key}>
                            <Text style={{ marginTop: HEIGHT * 0.02, fontSize: 16 }}>{key}</Text>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}> */}

                            <Text style={{ color: colors.redColor, textAlign: 'right' }}>{errors[key]}</Text>
                            {/* </View> */}
                            <TextInput placeholder={`Enter ${key}`} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.056, borderWidth: 1, borderRadius: 5, padding: 5, borderColor: errors[key] ? colors.redColor : colors.commonBlack, backgroundColor: key === 'product' ? `${colors.grayColor}20` : isEdit ? colors.commonWhite : `${colors.grayColor}20` }} autoFocus={true} onChangeText={(text) => onChangeText(text, key)} value={(formData[key]).toString()} editable={key === 'product' ? false : isEdit} keyboardType="numeric" />
                        </View>
                    ))}


                    <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.05, width: WIDTH * 0.9, alignItems: 'center', height: HEIGHT * 0.056, alignSelf: 'center', backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10 }} onPress={isEdit ? handleSubmit : () => setIsEdit(!isEdit)} >
                        {loading ? <ActivityIndicator color={colors.commonWhite} /> : <Text style={{ color: colors.commonWhite, fontWeight: '600' }} >{isEdit ? 'Update Stock' : 'Edit Stock'}</Text>}
                    </Pressable>
                </View>

            </Modal>
        </>

    );
};

export default StockRenderItem;
