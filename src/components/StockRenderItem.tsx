/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Modal, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { backIcon } from '../assets/icons';
import firestore from '@react-native-firebase/firestore';
const StockRenderItem = (props) => {
    const { item } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ product: item.product || '', stock: item.stock || '', profit: item.stock || '' });
    const [errors, setErrors] = useState({});
    // const [buttonText, setButtonText] = useState(false);
    console.log(item.id)
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
                await firestore().collection('coffeeItem').doc(item.id).update({
                    stock: formData.stock,
                    profit: formData.profit,
                });
            } catch (error) {
                console.log('error while updating stock', error);
                Alert.alert('Stock is not updated');
            }
        }
    };

    const onChangeText = (value: any, key: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    return (
        <>
            <View style={{ width: WIDTH * 0.9, height: HEIGHT * 0.12, backgroundColor: colors.commonWhite, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', borderRadius: 10, paddingHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.015 }}>
                <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.2, height: WIDTH * 0.2 }} />
                <View style={{ marginLeft: WIDTH * 0.03 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>{item.product}</Text>
                    <Text>Stock: {item.stock}</Text>
                    <Text>Profit: {item.profit}</Text>
                    <Text style={{ color: colors.brownColor, fontSize: 15 }} onPress={() => setIsVisible(!isVisible)}>View Details</Text>
                </View>

            </View>
            {/* Modal */}
            <Modal visible={isVisible} style={{}} animationType="fade">
                <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
                    <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01, marginTop: HEIGHT * 0.1 }}>
                        <Pressable onPress={() => setIsVisible(!isVisible)}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Stock Details</Text>
                    </View>

                    {Object.keys(formData).map((key) => (
                        <View key={key}>
                            <Text style={{ marginTop: HEIGHT * 0.01, fontSize: 16 }}>{key}</Text>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}> */}

                            <Text style={{ color: colors.redColor, textAlign: 'right' }}>{errors[key]}</Text>
                            {/* </View> */}
                            <TextInput placeholder={`Enter ${key}`} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.056, borderWidth: 1, borderRadius: 5, padding: 5 }} autoFocus={true} onChangeText={(text) => onChangeText(text, key)} value={formData[key]} editable={key === 'product' ? false : true} />
                        </View>
                    ))}

                    <Pressable style={{ width: WIDTH * 0.9, alignItems: 'center', marginTop: HEIGHT * 0.1, height: HEIGHT * 0.056, backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10 }} onPress={handleSubmit} ><Text style={{ color: colors.commonWhite, fontWeight: '600' }} >Add Stock</Text></Pressable>
                </View>

            </Modal>
        </>

    );
};

export default StockRenderItem;
