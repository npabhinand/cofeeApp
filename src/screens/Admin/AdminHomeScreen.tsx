/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import CardRenderItem from '../../components/AdminCardRenderItem';
import { cardArray } from '../../constants/data/dataArray';
import DropDown from '../../components/DropDown';

const AdminHomeScreen = () => {


    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginHorizontal: WIDTH * 0.1, justifyContent: 'space-between', height: HEIGHT * 0.05, marginVertical: HEIGHT * 0.03, marginBottom: HEIGHT * 0.05 }}>
                <View>
                    <Text style={{ fontSize: 9, color: colors.grayColor }}>WELCOME BACK</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Admin</Text>
                </View>

                <DropDown color={colors.commonBlack} />
            </View>
            <FlatList
                data={cardArray}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => (
                    <CardRenderItem item={item.item} />
                )}
            />
        </SafeAreaView>
    );
};


export default AdminHomeScreen;
