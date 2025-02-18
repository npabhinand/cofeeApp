/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Modal } from 'react-native';
import React, { useState } from 'react';
// import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
// import { backIcon, plusIcon } from '../assets/icons';
import { StockProps } from '../constants/types/commonTypes';
import AddStockComponent from './AddStockComponent';

const StockRenderItem: React.FC<StockProps> = (props) => {
    const { item, setLoading, loading } = props;
    const [isVisible, setIsVisible] = useState(false);
    // const [formData, setFormData] = useState<{ product: string; stock: number; }>({ product: item.product || '', stock: item.stock || 0 });
    // const [errors, setErrors] = useState({});
    // const [isEdit, setIsEdit] = useState<boolean>(false);
    // const [attributes, setAttributes] = useState(item?.types ? Object.entries(item.types).map(([name, value]) => ({ name, value })) : []);
    // const [attributeName, setAttributeName] = useState<string>('');
    // const [attributeValue, setAttributeValue] = useState<string>('');


    // const handleSubmit = async () => {
    //     setLoading(true);
    //     let newErrors = {};
    //     Object.keys(formData).forEach((key) => {
    //         if (!formData[key].trim()) {
    //             newErrors[key] = `${key} field is required`;
    //         }
    //     });
    //     if (Object.keys(newErrors).length > 0) {
    //         setErrors(newErrors);
    //         setLoading(false);
    //         return;

    //     }
    //     const attributesObject = attributes.reduce((acc, attr) => {
    //         if (attr.name.trim()) {
    //             acc[attr.name] = attr.value;
    //         }
    //         return acc;
    //     }, {});
    //     if (item.id) {
    //         //     try {
    //         //         await firestore().collection('stock').doc(item.id).update({
    //         //             stock: parseInt(formData.stock, 10),
    //         //         });
    //         //         Alert.alert('Stock is Updated');
    //         //         setIsVisible(!isVisible);
    //         //         setLoading(false);
    //         //     } catch (error) {
    //         //         console.log('error while updating stock', error);
    //         //         Alert.alert('Stock is not updated');
    //         //         setLoading(false);
    //         //     }
    //         // }
    //         // else {
    //         try {
    //             await firestore().collection('stock').add({
    //                 stock: parseInt(formData.stock, 10),
    //                 productId: item.id,
    //                 types: attributesObject,
    //             });
    //         } catch (error) {
    //             console.log('Error occured while adding data', error);
    //             Alert.alert('Stock is not added');
    //             setLoading(false);
    //         }
    //     }
    //     setLoading(false);
    // };

    // const addAttribute = () => {
    //     if (attributeName.trim() && attributeValue.trim()) {
    //         setAttributes([...attributes, { name: attributeName, value: attributeValue }]);
    //         setAttributeName('');
    //         setAttributeValue('');
    //     } else {
    //         Alert.alert('Both Fields in attribute are required');
    //     }
    // };

    // const deleteAttribute = (id: number) => {
    //     const updatedAttribute = [...attributes];
    //     updatedAttribute.splice(id, 1);
    //     setAttributes(updatedAttribute);
    // };

    // const onChangeText = (value: any, key: string) => {
    //     if (key === 'stock') {
    //         value = value.replace(/[^0-9]/g, '');
    //     }
    //     setFormData((prev) => ({ ...prev, [key]: value }));
    //     setErrors((prev) => ({ ...prev, [key]: '' }));
    // };

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
                <AddStockComponent item={item} setLoading={setLoading} loading={loading} edit={true} setIsVisible={setIsVisible} isVisible={isVisible} />
            </Modal>
        </>

    );
};

export default StockRenderItem;
