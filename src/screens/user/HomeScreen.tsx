/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, Image, Pressable, ScrollView, FlatList, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { bottomArrowIcon, filterIcon, searchIcon } from '../../assets/icons';
import PromoComponent from '../../components/PromoComponent';
import { filterArray } from '../../constants/data/dataArray';
import FilterButton from '../../components/FilterButton';
import CoffeeCard from '../../components/CoffeeCard';
import { colors } from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import DropDown from '../../components/DropDown';
// import { userDataItem } from '../../constants/types/commonTypes';


const HomeScreen = () => {
    const [isSelected, setIsSelected] = useState<number>();
    const [coffeeArray, setCoffeeArray] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const userData = useSelector(selectedUserData);


    useEffect(() => {

        const fetchCoffee = async () => {
            const coffees = [];
            try {
                setLoading(true);
                const coffeeRef = await firestore().collection('coffeeItem').get();
                coffeeRef.forEach((doc) => coffees.push({ ...doc.data(), id: doc.id }));
                setCoffeeArray(coffees);
                setLoading(false);
            } catch {
                console.log('error while fetching coffee items');
            }
        };
        fetchCoffee();
    }, []);



    return (
        <View style={{ flex: 1 }}>
            {loading ? <>
                <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            </> :
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                    {/* <View style={{ position: 'absolute' }}> */}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.matteBlack, colors.commonBlack]} style={{ width: WIDTH * 1, height: HEIGHT * 0.35 }} >

                        <View style={{ paddingLeft: WIDTH * 0.07 }}>
                            <Text style={{ color: colors.grayColor, marginTop: HEIGHT * 0.08 }}>Location</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: colors.commonWhite, marginTop: HEIGHT * 0.01 }}>Bilzen, Tanjungbalai </Text>
                                <Image source={bottomArrowIcon} style={{ marginTop: HEIGHT * 0.01, tintColor: colors.commonWhite, marginRight: WIDTH * 0.3 }} />
                                <DropDown color={colors.commonWhite} />


                            </View>

                            <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03 }}>
                                <View style={{
                                    backgroundColor: colors.matteBlack, height: HEIGHT * 0.06, justifyContent: 'center', borderRadius: HEIGHT * 0.01, paddingLeft: WIDTH * 0.1, width: WIDTH * 0.7,
                                }}>
                                    <Image source={searchIcon} tintColor={colors.commonWhite} style={{ position: 'absolute', left: WIDTH * 0.02 }} />
                                    <TextInput
                                        placeholder="Search Coffee" placeholderTextColor={colors.grayColor} style={{ color: colors.commonWhite }} />
                                </View>
                                <Pressable style={{ backgroundColor: colors.brownColor, marginLeft: WIDTH * 0.03, alignItems: 'center', justifyContent: 'center', width: HEIGHT * 0.06, borderRadius: HEIGHT * 0.015 }}>
                                    <Image source={filterIcon} style={{ tintColor: colors.commonWhite }} />
                                </Pressable>
                            </View>
                        </View>

                    </LinearGradient>
                    <ScrollView horizontal style={{ position: 'absolute', top: HEIGHT * 0.25, width: WIDTH * 1 }} showsHorizontalScrollIndicator={false}>
                        <PromoComponent />
                        <PromoComponent />
                    </ScrollView>



                    {/* </View> */}

                    <ScrollView horizontal style={{ marginTop: HEIGHT * 0.1, paddingLeft: WIDTH * 0.07 }} showsHorizontalScrollIndicator={false}>
                        {filterArray.map((filter) => (
                            <FilterButton
                                key={filter.id}
                                buttonName={filter.name}
                                selected={isSelected === filter.id}
                                onPress={() => setIsSelected(filter.id)}
                            />
                        ))}
                    </ScrollView>
                    <FlatList
                        data={coffeeArray}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        contentContainerStyle={{ marginBottom: HEIGHT * 0.13, paddingHorizontal: WIDTH * 0.02 }}
                        renderItem={({ item }) => (
                            <CoffeeCard item={item} userId={userData[0].email} />
                        )} />
                </ScrollView>
            }
        </View>
    );
};

export default HomeScreen;
