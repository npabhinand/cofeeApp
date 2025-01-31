/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/firestore';
import { backIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import UserRenderItem from '../../components/UserRenderItem';

interface userType {
    name?: string;
    phone?: number;
    email?: string;

}
const UserListScreen: React.FC<userType> = () => {
    const [usersList, setUsersList] = useState<[]>();
    const navigation = useNavigation();
    useEffect(() => {
        const fetchProductData = async () => {
            const usersArray = [];
            try {
                const userRef = await firebase().collection('user').where('userType', '==', 'user').get();
                userRef.forEach((doc) => {
                    usersArray.push({ id: doc.id, ...doc.data() });
                });
                setUsersList(usersArray);
            } catch (error) {
                console.log('error occured while fetching Product Data');
            }
        };
        fetchProductData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01, alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Users</Text>
            </View>
            <FlatList
                data={usersList}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <UserRenderItem item={item.item} />
                )} />
        </SafeAreaView>
    );
};

export default UserListScreen;
