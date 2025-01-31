/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
// import { coffee1 } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { deleteIcon, editIcon } from '../assets/icons';
import AddProductComponent from './AddProductComponent';
import firestore from '@react-native-firebase/firestore';


interface productItems {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
    item: {
        id: string,
        product: string,
        coffeeType: string,
        image: string,
        type: { size: string, price: number }
    }
}
const ProductRenderItem: React.FC<productItems> = (props) => {
    const { item, setUpdate, update } = props;
    const [modalVisible, setModalVisible] = useState(false);

    const onDeleteItem = () => {
        firestore().collection('coffeeItem').doc(item.id).delete().then(() => { console.log('product deleted!'); });
        setUpdate(!update);
    };
    const handleDeleteAlert = () =>
        Alert.alert('Are You sure want to delete Product', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: onDeleteItem,

            },
        ]);

    return (
        <View style={{
            flexDirection: 'row', marginTop: HEIGHT * 0.02, width: WIDTH * 0.9, backgroundColor: colors.commonWhite, alignSelf: 'center', height: HEIGHT * 0.15, borderRadius: 10, padding: 10, gap: 10, justifyContent: 'space-between', alignItems: 'center', shadowColor: colors.commonBlack, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2,
        }}>
            <Pressable style={{ position: 'absolute', right: WIDTH * 0.05, top: HEIGHT * 0.015, width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: '50%', backgroundColor: `${colors.brownColor}40`, justifyContent: 'center', alignItems: 'center', zIndex: 1 }} onPress={() => setModalVisible(true)}>
                <Image source={editIcon} style={{ tintColor: colors.brownColor }} />
            </Pressable>
            <Pressable style={{ position: 'absolute', right: WIDTH * 0.15, top: HEIGHT * 0.015, width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: '50%', backgroundColor: `${colors.brownColor}40`, justifyContent: 'center', alignItems: 'center', zIndex: 1 }} onPress={handleDeleteAlert}>
                <Image source={deleteIcon} style={{ tintColor: colors.brownColor, width: WIDTH * 0.04, height: WIDTH * 0.03 }} />
            </Pressable>
            <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.25, height: WIDTH * 0.25, borderRadius: 10 }} />
            <View style={{ rowGap: 10, marginRight: WIDTH * 0.05 }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.product}</Text>
                <Text style={{ color: colors.grayColor }}>{item.coffeeType}</Text>
            </View>
            <Text style={{ fontSize: HEIGHT * 0.03, marginTop: HEIGHT * 0.01, fontWeight: '600', color: colors.brownColor, marginRight: WIDTH * 0.05 }}>${item.type[0].price}</Text>
            <Modal visible={modalVisible} animationType="slide">
                <AddProductComponent setModalVisible={setModalVisible} item={item} setUpdate={setUpdate} update={update} />
            </Modal>
        </View>
    );
};

export default ProductRenderItem;
