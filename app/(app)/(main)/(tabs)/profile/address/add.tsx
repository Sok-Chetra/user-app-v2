import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/input/Input'
import InputFloatLabel from '@/components/input/InputFloatLabel'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAddressStore } from '@/providers/project/AddressProvider'
import { useAuthStore } from '@/providers/auth/AuthProvider'

export const addressSchema = z.object({
    addressLineOne: z.string().nonempty({
        message: 'Required Field'
    }),
    addressLine2: z.string().nonempty({
        message: 'Required Field'
    }),
    country: z.string(),
    town: z.string().nonempty({
        message: 'Required Field'
    }),
    phone: z.string().nonempty({
        message: 'Required Field'
    }),
    postCode: z.string(),
    phoneCode: z.string(),
});

export type Address = {
    addressLineOne: string;
    phone: string;
    country: string;
    town: string;
    postCode: string;
    phoneCode: string;
};

type Props = {}

const AddAddress = (props: Props) => {
    const TABBAR_HEIGHT = useBottomTabBarHeight()
    const { selectedFromAddrBook, setSelectedFromAddrBook } = useAddressStore(state => state)
    const { accessToken } = useAuthStore(state => state)
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        getValues,
        reset
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            addressLineOne: '',
            addressLine2: '',
            country: 'United Kingdom',
            town: '',
            phone: '',
            postCode: '',
            phoneCode: '44'
        },
    });

    const queryClient = useQueryClient();
    const { isPending, isSuccess, error, mutate, status } = useMutation({
        mutationKey: ['AddAddress'],
        mutationFn: async (address: Address) => {
            const apiUrl = `http://192.168.110.186:5000/address`
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(address)
            });
            const data = await res.json();
            return data;
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: ['GetAddresses']
                });
                setTimeout(() => {
                    router.dismiss()
                    reset()
                }, 2000)
            }




        },
        onError: (error) => {
            alert(error.message)
        },
    });

    async function onAddAddress(values: z.infer<typeof addressSchema>) {
        // console.log(JSON.stringify(values, null, 2))
        const {
            addressLineOne,
            phone,
            phoneCode,
            country,
            town,
            postCode,
        } = values
        const address = {
            addressLineOne,
            phone,
            phoneCode,
            country,
            town,
            postCode,
        }
        mutate(address)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
                    <View style={[styles.header]}>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
                            <Pressable onPress={() => router.dismiss()} style={[styles.buttonback]}>
                                <Text style={[styles.buttonText]}>Back {isDirty ? 'yes' : "no"}</Text>
                            </Pressable>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
                            <Pressable onPress={handleSubmit(onAddAddress)} style={[styles.buttonback]}>
                                <Text style={[styles.buttonText]}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ScrollView contentInsetAdjustmentBehavior='automatic' contentInset={{
                        bottom: Platform.OS === "ios" ? TABBAR_HEIGHT + 30 : undefined,
                    }}
                        contentContainerStyle={{
                            paddingBottom: Platform.OS === "ios" ? 0 : 50,
                        }}>
                        <View style={{ marginTop: 50, }}>
                            <Text style={[styles.headerTitle]}>Add Address</Text>
                        </View>

                        <View style={[styles.formContainer]}>
                            <Controller
                                name="addressLineOne"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputFloatLabel
                                            label='Address one'
                                            style={{
                                                height: 55,
                                                borderRadius: 10
                                            }}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            error={() => {
                                                if (errors.addressLineOne) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.addressLineOne.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />

                            <Controller
                                name="addressLine2"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputFloatLabel
                                            label='Address two'
                                            style={{
                                                height: 55,
                                                borderRadius: 10
                                            }}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            error={() => {
                                                if (errors.addressLine2) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.addressLine2.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />

                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        name="town"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => {
                                            return (

                                                <InputFloatLabel
                                                    label='Town'
                                                    style={{
                                                        height: 55,
                                                        borderRadius: 10
                                                    }}
                                                    inputProps={{
                                                        value: value,
                                                        onChangeText: onChange,
                                                        style: {
                                                            color: '#0B192C'
                                                        }
                                                    }}
                                                    error={() => {
                                                        if (errors.town) {
                                                            return (
                                                                <Text style={[styles.errorText]}>
                                                                    {errors.town.message}
                                                                </Text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => {
                                            return (

                                                <InputFloatLabel
                                                    label='Country'
                                                    style={{
                                                        height: 55,
                                                        borderRadius: 10
                                                    }}
                                                    inputProps={{
                                                        value: value,
                                                        onChangeText: onChange,
                                                        editable: false,
                                                        style: {
                                                            color: '#0B192C',
                                                        }
                                                    }}
                                                    error={() => {
                                                        if (errors.country) {
                                                            return (
                                                                <Text style={[styles.errorText]}>
                                                                    {errors.country.message}
                                                                </Text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }}
                                    />
                                </View>
                            </View>

                            <Controller
                                name="postCode"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputFloatLabel
                                            label='Postcode'
                                            style={{
                                                height: 55,
                                                borderRadius: 10
                                            }}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                keyboardType: 'numeric',
                                                maxLength: 6,
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            error={() => {
                                                if (errors.postCode) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.postCode.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />

                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={{ width: 82 }}>
                                    <Controller
                                        name="phoneCode"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => {
                                            return (

                                                <InputFloatLabel
                                                    label='Code'
                                                    style={{
                                                        height: 55,
                                                        borderRadius: 10
                                                    }}
                                                    inputProps={{
                                                        value: value,
                                                        onChangeText: onChange,
                                                        editable: false,
                                                        style: {
                                                            color: '#0B192C'
                                                        }
                                                    }}
                                                    error={() => {
                                                        if (errors.phoneCode) {
                                                            return (
                                                                <Text style={[styles.errorText]}>
                                                                    {errors.phoneCode.message}
                                                                </Text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => {
                                            return (

                                                <InputFloatLabel
                                                    label='Phone number'
                                                    style={{
                                                        height: 55,
                                                        borderRadius: 10
                                                    }}
                                                    inputProps={{
                                                        value: value,
                                                        onChangeText: onChange,
                                                        keyboardType: 'phone-pad',
                                                        maxLength: 9,
                                                        style: {
                                                            color: '#0B192C',
                                                        }
                                                    }}
                                                    error={() => {
                                                        if (errors.phone) {
                                                            return (
                                                                <Text style={[styles.errorText]}>
                                                                    {errors.phone.message}
                                                                </Text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    header: {
        height: 80,
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF6500'
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