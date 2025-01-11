import { Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '@/providers/auth/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import BottomSheetFlatList, { BottomSheetMethods } from '@/components/animated/bottom-sheet/BottomSheetFlatList'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useAddressStore } from '@/providers/project/AddressProvider'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Controller, useForm } from 'react-hook-form'
import InputFloatLabel from '@/components/input/InputFloatLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema } from '../../../(tabs)/profile/address/add'
import { router } from 'expo-router'
import FormAddress from '@/components/forms/FormAddress'
import AddressList from '@/components/item-list/AddressList'

type Props = {}

const Location = (props: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const { top } = useSafeAreaInsets()
    const bottomSheetRef = useRef<BottomSheetMethods>(null)
    const { accessToken } = useAuthStore(state => state)
    const { selectedFromAddrBook, hasChangedAddress } = useAddressStore(state => state)



    const { data, isFetched, isError, refetch } = useQuery({
        queryKey: ['GetAddresses'],
        queryFn: async () => {
            const api_url = `http://192.168.110.186:5000/address`
            const res = await fetch(api_url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await res.json()
            return data.data;
        },
    })

    const expandHandler = useCallback(() => {
        bottomSheetRef.current?.expand()
        setModalVisible(true);
    }, [])

    const closeHandler = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    const addres = data && data.find((addr: any) => selectedFromAddrBook.id === addr.id)

    return (
        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ paddingTop: top, height: top + 50, justifyContent: 'center' }}>
                        <Text>Location</Text>
                    </View>


                    <ScrollView

                        contentInset={{
                            bottom: Platform.OS === "ios" ? 60 : undefined,
                        }}
                        contentContainerStyle={{

                            marginHorizontal: 20,
                            paddingBottom: Platform.OS === "ios" ? 0 : 50,
                        }}>
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, padding: 25, marginTop: 20, borderRadius: 20 }} onPress={expandHandler}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>{addres ? hasChangedAddress ? <>(Unsave) {addres.addressLineOne}</> : <>{addres.addressLineOne}</> : 'Choose Address '}</Text>
                            <Ionicons name='chevron-forward-outline' size={30} />
                        </Pressable>
                        <FormAddress />
                    </ScrollView>
                    <AddressList
                        bottomSheetRef={bottomSheetRef}
                        closeHandler={closeHandler}
                        data={data}
                        isModalVisible={isModalVisible}
                        setModalVisible={setModalVisible}
                    />
                </GestureHandlerRootView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Location

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        height: 100
    },
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
    buttonback: {
        justifyContent: 'flex-end',
    },
    buttonText: {
        fontWeight: 'bold'
    },
    formContainer: {
        marginTop: 50,
        gap: 25
    },
    errorText: {
        color: 'red',
        paddingHorizontal: 20,
        marginTop: 3
    }
})