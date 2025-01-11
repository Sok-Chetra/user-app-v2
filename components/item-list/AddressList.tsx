import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheetFlatList, { BottomSheetMethods } from '../animated/bottom-sheet/BottomSheetFlatList'
import { Ionicons } from '@expo/vector-icons'
import { useAddressStore } from '@/providers/project/AddressProvider'

type Props = {
    data: any;
    closeHandler: () => void;
    bottomSheetRef: React.RefObject<BottomSheetMethods>;
    isModalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressList = ({
    data,
    bottomSheetRef,
    isModalVisible,
    closeHandler,
    setModalVisible
}: Props) => {
    const { setSelectedFromAddrBook } = useAddressStore(state => state)

    return (
        <BottomSheetFlatList
            setModalVisible={setModalVisible}
            isModalVisible={isModalVisible}
            ref={bottomSheetRef}
            snapTo='95%'
            backgroundColor={'white'}
            backDropColor='black'
            data={data}
            contentContainerStyle={{
                marginTop: 50
            }}
            ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
            renderItem={({ item, index }) => {

                return (
                    <Pressable
                        onPress={() => {
                            setSelectedFromAddrBook({
                                id: item.id,
                                addressLineOne: item.addressLineOne,
                                country: item.country,
                                town: item.town,
                                phone: item.phone,
                                postCode: item.postCode,
                                phoneCode: item.phoneCode
                            })
                            closeHandler()
                        }}
                        style={[
                            {
                                flex: 1,
                                backgroundColor: 'lightgray',
                                height: 100,
                                paddingHorizontal: 10
                            }
                        ]}
                    >
                        <View style={[styles.cardContent]}>
                            <View>
                                <Ionicons
                                    name="location"
                                    color={'#FF6500'}
                                    size={25}
                                />
                            </View>
                            <View style={{ width: '100%', paddingRight: 50 }}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{item.addressLineOne}({item.postCode})</Text>
                                <Text style={styles.cardMessage} numberOfLines={1}>+{item.phoneCode}{item.phone}</Text>
                            </View>
                        </View>
                    </Pressable>
                )
            }}
        />
    )
}

export default AddressList

const styles = StyleSheet.create({
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    cardMessage: {
        fontSize: 14,
        color: "#555",
        marginTop: 2,
    },
})