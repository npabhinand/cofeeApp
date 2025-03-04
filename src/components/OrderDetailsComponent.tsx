/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { addressProp, detailProps, orderComponentProps } from '../constants/types/commonTypes';
import ProductComponent from './ProductCompnent';
import HandleOrderButtons from './HandleOrderButtons';


const OrderDetailsComponent: React.FC<orderComponentProps> = (props) => {
    const { handleModal, marginTop, item,setLoading,loading  } = props;
    const db=firestore();
    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');

    const [update,setUpdate]=useState<boolean>(false);

    const orderDetails = [
        { label: 'Order Id', value: item.id },
        { label: 'Order Price', value: `$${item.totalPrice} ` },
        { label: 'Order Time', value: date },
        { label: 'Status', value: item.status },
    ];
   
    const handleCancelAlert = () => {
        Alert.alert('Are You sure want to cancel order', '', [
            {
                text: 'Back',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Cancel',
                onPress: handleCancelOrder,

            },
        ]);
    };

    const handleAcceptAlert = () => {
        Alert.alert(
            `Are You sure you want to ${item.orderType === 'Dining' ? 'release table' : 'accept order'}?`,
            '', 
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: item.orderType === 'Dining' ? 'Release' : 'Accept',
                    // onPress: () => dispatch(deleteContact(item.id))
                    onPress: handleAcceptOrder,
                },
            ]
        );
    };
    

    const handleAcceptOrder = async () => {
        try {
                setUpdate(!update);
                await handleStock();
                await firestore().collection('orders').doc(item.id).update({ status: 'delivered' });
                handleReleaseTable()
                setLoading(!loading);
                setUpdate(false);
                handleModal;
        } catch (error) {
                setLoading(!loading);  
                console.log('Error while updating data', error);
                handleModal;
                setUpdate(false);
        } 
    }
    const handleCancelOrder = async () => {
        try {
                setUpdate(!update);
                await firestore().collection('orders').doc(item.id).update({
                status: 'cancelled',
            });
                handleReleaseTable()
                setLoading(!loading);
                
                handleModal;
                setUpdate(false);
                
        } catch (error) {
                console.log('error while loading data', error);
                setLoading(!loading);
                setUpdate(false);
                handleModal;
        }
    };

    const handleStock=async()=>{
        try{
            const batch = firestore().batch();
        const products=item.products;
        products.forEach((product) => {
            console.log('product.itemId',product.itemId)
            const productRef = firestore().collection('items').doc(product.itemId);
            batch.update(productRef, { stock: firestore.FieldValue.increment(-product.quantity) });
        });
        await batch.commit();
        }catch(error){
            console.error('error ocured while updating stock');
        }
            
              
    }

    const handleReleaseTable=async()=>{
        try{
            if (item.orderType === 'Dining') {
                const shopDoc = await db.collection('shops').doc(item.shop.id);
                const shopData = (await shopDoc.get()).data();
                if (shopData && shopData.tables) {
                    const updatedTables = shopData.tables.map((table) => {
    
                        if (item.table.includes(table.tableId)) {
                            return { ...table, booked: false };
                        }
                        return table;
                    });
    
                    await shopDoc.update({ tables: updatedTables });
                }
            }
        }catch(error){
            console.error('error while updating',error)
        }
    }
    
    return (

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ marginTop: marginTop, backgroundColor: colors.commonWhite, borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingBottom: HEIGHT * 0.2 }}>
            <View style={{ alignSelf: 'center', width: WIDTH, paddingHorizontal: WIDTH * 0.05 }}>
                <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>{item.orderType==='Delivery'?'Delivery Address':
                    item.orderType==='Pick Up'?'Pick Up':'Dining'}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.grayColor }} onPress={handleModal}>X</Text>
                </View>

                {item.orderType==='Delivery'&&
                <View>
                    <AddressDetailComponent address={item.address} />
                </View>}
                {item.orderType==='Dining'&&
                 <View style={{gap:10}}>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                     <Text style={{color: colors.brownColor, fontWeight: '600',fontSize: 16,}}>Shop Name</Text>
                     <Text style={{fontWeight: '600', fontSize: 16}}>{item.shop.name}</Text>
                 </View>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                     <Text style={{color: colors.brownColor, fontWeight: '600', fontSize: 16,}}>Tables Booked</Text>
                     <View style={{flexDirection:'row'}}>
                     {item.table.map((table, index) => (
                         <Text key={index} style={{fontWeight: '600', fontSize: 16}}>{table},</Text>
                     ))}
                     </View>
                 </View>
             </View>}  
                 {item.orderType==='Pick Up'&&
                    <View style={{gap:10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: colors.brownColor, fontWeight: '600',fontSize: 15,}}>Shop Name</Text>
                        <Text style={{fontWeight: '600', fontSize: 16}}>{item.shop.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: colors.brownColor, fontWeight: '600',fontSize: 16,}}>User Id</Text>
                        <Text style={{fontWeight: '600', fontSize: 15}}>{item.userId}</Text>
                    </View>
                </View>
                    }   

                <FlatList
                    data={item.products}
                    scrollEnabled={false}
                    keyExtractor={(product, index) => index.toString()}
                    renderItem={product => (
                        <ProductComponent product={product} />
                    )}
                />

                <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Payment Details</Text>

                {orderDetails.map((detail, index) => (
                    <OrderDetails key={index} detail={detail} />
                ))}
                {update?<ActivityIndicator size={'large'} color={colors.grayColor}/>:
                <>
                {(item.status!=='delivered'&& item.status!=='cancelled')&&
                      <HandleOrderButtons onPress1={handleCancelAlert} onPress2={handleAcceptAlert} text1={'Cancel Order'} text2={item.orderType==='Dining'?
                    'Release Table':'Accept Order'} />
                }
                </>
                }
                
            </View>
        </ScrollView>

    );
};

export default OrderDetailsComponent;


const AddressDetailComponent: React.FC<addressProp> = (props) => {
    const { address } = props;
    const detail=address[0]
    const addressDetails = [
            { label: 'Name', value: detail.name },
            { label: 'UserId', value: detail.userId },
            { label: 'Address', value: detail.address },
            { label: 'Phone', value: detail.phone },
        ];
    
    return (
        <>
        {addressDetails.map((address,index)=>(
            <View key={index} style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: HEIGHT * 0.01 }} >
            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>{address.label}</Text>
            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, width: WIDTH * 0.6 }}>{address.value}</Text>
        </View>
        ))}
       </>
    );
};

const OrderDetails: React.FC<detailProps> = (props) => {
    const { detail } = props;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.01 }}>
            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>
                {detail.label}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, textAlign: 'left' }}>{detail.value}</Text>
        </View>
    );
};





