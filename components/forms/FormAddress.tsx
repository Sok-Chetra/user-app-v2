import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddressStore } from '@/providers/project/AddressProvider';
import { useAuthStore } from '@/providers/auth/AuthProvider';
import InputFloatLabel from '../input/InputFloatLabel';
import { z } from 'zod';
import { router } from 'expo-router';
import { addressSchema } from '@/app/(app)/(main)/(tabs)/profile/address/add';

type Props = {}

const FormAddress = (props: Props) => {
    const { accessToken } = useAuthStore(state => state)
    const { selectedFromAddrBook, hasChangedAddress, setHasChangedAddressd, setSelectedFromAddrBook } = useAddressStore(state => state)
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        getValues,
        watch,
        resetField,
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

    async function onUpdateAddress(values: z.infer<typeof addressSchema>) {
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
        //   mutate(address)
        console.log(address)
    }

    useEffect(() => {
        resetField('addressLineOne', { keepDirty: false, defaultValue: selectedFromAddrBook.addressLineOne })
        resetField('addressLine2', { keepDirty: false, defaultValue: selectedFromAddrBook.addressLine2 })
        resetField('country', { keepDirty: false, defaultValue: selectedFromAddrBook.country })
        resetField('town', { keepDirty: false, defaultValue: selectedFromAddrBook.town })
        resetField('phone', { keepDirty: false, defaultValue: selectedFromAddrBook.phone })
        resetField('postCode', { keepDirty: false, defaultValue: selectedFromAddrBook.postCode })
        resetField('phoneCode', { keepDirty: false, defaultValue: selectedFromAddrBook.phoneCode })
    }, [selectedFromAddrBook.id])

    useEffect(() => {
        if (isDirty) {
            setHasChangedAddressd(true)
        } else {
            setHasChangedAddressd(false)
        }
    }, [isDirty])

    return (
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable
                    style={[
                        {
                            width: 100,
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 10,
                        }
                    ]}
                    onPress={() => {
                        if (hasChangedAddress) {
                        } else {
                            router.back()
                        }

                    }}
                >
                    <Text
                    >
                        {hasChangedAddress ? 'Cancel' : 'Back'}
                    </Text>

                </Pressable>
                <Pressable
                    style={{
                        backgroundColor: !selectedFromAddrBook.id ? 'gray' : '#FF6500',
                        width: 100,
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        if (hasChangedAddress) {
                            handleSubmit(onUpdateAddress)
                        } else {
                            router.push('/(app)/(main)/(screens)/projects/single-job/title')
                        }
                    }}
                    disabled={!selectedFromAddrBook.id}
                >
                    <Text style={{ color: 'white' }}>
                        {hasChangedAddress ? 'Save' : 'Next'}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FormAddress

const styles = StyleSheet.create({
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