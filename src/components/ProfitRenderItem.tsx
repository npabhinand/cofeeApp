/* eslint-disable react-native/no-inline-styles */

import { View, Text, Image, Modal, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { backIcon } from '../assets/icons';
import { profitProps } from '../constants/types/commonTypes';
const ProfitRenderItem: React.FC<profitProps> = (props) => {
    const { item, setIsUpdate } = props;
    const [isVisible, setIsVisible] = useState(false);

    const [formData, setFormData] = useState<{ product: string; profit: number; }>({ product: item.product.product || '', profit: item.profit || 0 });
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [loading,setLoading]=useState<boolean>(false);

    const handleSubmit = async () => {

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} field is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (item.id) {
            try {
                setLoading(true);
                await firestore().collection('items').doc(item.id).update({
                    profit: parseInt(formData.profit, 10),
                });
                Alert.alert('Profit Percentage is Updated');
                setIsVisible(!isVisible);
                setLoading(false);
            } catch (error) {
                console.log('error while updating profit', error);
                Alert.alert('Profit Percentage is not updated');
                setLoading(false);
            }
        }
        setIsUpdate(true)
        setLoading(false);
    };

    const onChangeText = (value: any, key: string) => {
        if (key === 'profit') {
            value = value.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };
    return (
        <>
            <View style={{ height: 90, width: WIDTH * 0.9, backgroundColor: colors.commonWhite, alignSelf: 'center', borderRadius: 20, marginTop: HEIGHT * 0.02, alignItems: 'center', paddingLeft: 10, flexDirection: 'row', gap: 10 }}>
                <Image source={{ uri: item.product.image }} style={{ width: WIDTH * 0.13, height: WIDTH * 0.13, borderRadius: '50%' }} />
                <View style={{ width: WIDTH * 0.5 }}>
                    <Text style={{ fontWeight: '600' }}>Product</Text>
                    <Text style={{ color: colors.grayColor }}>{item.product.product}</Text>
                </View>
                <View>
                    <Text>Profit</Text>
                    <Text style={{ color: colors.grayColor }}>{item.profit} %</Text>
                </View>
                <Text style={{ color: colors.brownColor, fontSize: 15, position: 'absolute', bottom: 10, left: WIDTH * 0.4 }} onPress={() => setIsVisible(!isVisible)}>View Details</Text>
            </View>
            {/* modal */}
            <Modal visible={isVisible} animationType="slide">
                <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
                    <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01, marginTop: HEIGHT * 0.1 }}>
                        <Pressable onPress={() => setIsVisible(!isVisible)}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Profit Details</Text>
                    </View>

                    {Object.keys(formData).map((key) => (
                        <View key={key}>
                            <Text style={{ marginTop: HEIGHT * 0.01, fontSize: 16 }}>{key}</Text>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}> */}

                            <Text style={{ color: colors.redColor, textAlign: 'right' }}>{errors[key]}</Text>
                            {/* </View> */}
                            <TextInput placeholder={`Enter ${key}`} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.056, borderWidth: 1, borderRadius: 5, padding: 5, borderColor: errors[key] ? colors.redColor : colors.commonBlack, backgroundColor: key === 'product' ? `${colors.grayColor}20` : isEdit ? colors.commonWhite : `${colors.grayColor}20` }} autoFocus={true} onChangeText={(text) => onChangeText(text, key)} value={formData[key].toString()} editable={key === 'product' ? false : isEdit} keyboardType="numeric" />
                        </View>
                    ))}


                    <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.05, width: WIDTH * 0.9, alignItems: 'center', height: HEIGHT * 0.056, alignSelf: 'center', backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10 }} onPress={isEdit ? handleSubmit : () => setIsEdit(!isEdit)} >
                        {loading ? <ActivityIndicator color={colors.commonWhite} /> : <Text style={{ color: colors.commonWhite, fontWeight: '600' }} >{isEdit ? 'Update profit' : 'Edit Profit'}</Text>}
                    </Pressable>
                </View>

            </Modal>
        </>
    );
};

export default ProfitRenderItem;
