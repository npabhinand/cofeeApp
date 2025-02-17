/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/firestore';

import UserRenderItem from '../../components/UserRenderItem';
import { colors } from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';

interface userType {
    name?: string;
    phone?: number;
    email?: string;

}
const UserListScreen: React.FC<userType> = () => {
    const [usersList, setUsersList] = useState<[]>();
    const [loading, setLoading] = useState<boolean>(false);
    // const navigation = useNavigation();
    useEffect(() => {
        fetchProductData();
    }, []);
    const fetchProductData = async () => {
        const usersArray: any = [];
        setLoading(true);
        try {
            const userRef = await firebase().collection('user').where('userType', '==', 'user').get();
            userRef.forEach((doc) => {
                usersArray.push({ id: doc.id, ...doc.data() });
            });
            setUsersList(usersArray);
            setLoading(false);
        } catch (error) {
            console.log('error occured while fetching Product Data');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <>
                    <HeaderComponent header={'Users'} />
                    <FlatList
                        data={usersList}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <UserRenderItem item={item.item} />
                        )} />
                </>

            }
        </SafeAreaView>
    );
};

export default UserListScreen;
