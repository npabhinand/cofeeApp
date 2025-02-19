/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import HeaderComponent from '../../components/HeaderComponent';
import FavouriteRenderItem from '../../components/FavouriteRenderItem';
import { colors } from '../../constants/colors';
import { useIsFocused } from '@react-navigation/native';

const FavoriteScreen = () => {
    const isFocused = useIsFocused();

    const [favoriteData, setFavoriteData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState();

    useEffect(() => {
        fetchFavoriteData();
    }, [update, isFocused]);
    const fetchFavoriteData = async () => {
        try {
            setLoading(true);
            let favorites: any = [];
            const favoriteRef = await firestore().collection('favorite').get();
            favoriteRef.forEach((doc) => favorites.push({ ...doc.data(), id: doc.id }));
            setFavoriteData(favorites);
            setLoading(false);
        } catch (error) {
            console.log(error, 'error occured while fetching favourites');
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator size={'large'} color={colors.brownColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
                <>
                    <HeaderComponent header="Favourites" />

                    <FlatList
                        data={favoriteData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <FavouriteRenderItem item={item} setLoading={setUpdate} />
                        )} />
                </>
            }

            {/*  */}
        </SafeAreaView>
    );
};

export default FavoriteScreen;
