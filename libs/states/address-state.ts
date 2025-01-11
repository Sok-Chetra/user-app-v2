import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

// Define SelectedAddr type
type SelectedAddr = {
    id?: string;
    addressLineOne?: string;
    addressLine2?: string;
    phone?: string;
    country?: string;
    town?: string;
    postCode?: string;
    phoneCode?: string;
};

// Define AddressState with abbreCountryName, phoneCode, startDate, and selectedFromAddrBook
export type AddressState = {
    abbreCountryName: string;
    phoneCode: string;
    _hasHydrated: boolean;
    selectedFromAddrBook: SelectedAddr;
    startDate: string; // New field for startDate
    jobTitle: string;
    jobDesc: string;
    hasChangedAddress: boolean;
}

// Define actions, including setStartDate
export type AddressActions = {
    setAbbreCountryName: (abbreCountryName: string) => void;
    setphoneCode: (phoneCode: string) => void;
    setHasHydrated: (state: boolean) => void;
    setSelectedFromAddrBook: (selectedAddr: SelectedAddr) => void;
    setStartDate: (startDate: string) => void; // New action for setting startDate
    setJobTitle: (title: string) => void;
    setJobDesc: (desc: string) => void
    setHasChangedAddressd: (hasChangedAddress: boolean) => void;
}

// Combine state and actions
export type AddressStore = AddressState & AddressActions;

// Default initial state, with a placeholder for selectedFromAddrBook and startDate
export const defaultInitState: AddressState = {
    abbreCountryName: 'HK',
    phoneCode: 'HK',
    _hasHydrated: false,
    hasChangedAddress: false,
    selectedFromAddrBook: {
        id: '',
        addressLineOne: '',
        addressLine2: '',
        country: 'Hong Kong',
        town: '',
        phone: '',
        postCode: '',
        phoneCode: '852'
    },
    startDate: '',
    jobTitle: '',
    jobDesc: ''
}

// Create the store
export const createAddressStore = () => {
    return createStore<AddressStore>()(persist(
        (set) => ({
            ...defaultInitState,
            setAbbreCountryName: (abbreCountryName: string) => {
                set({
                    abbreCountryName: abbreCountryName,
                });
            },
            setphoneCode: (phoneCode: string) => {
                set({
                    phoneCode: phoneCode,
                });
            },
            setHasHydrated: (state: boolean) => {
                set({
                    _hasHydrated: state,
                });
            },
            setSelectedFromAddrBook: (selectedAddr: SelectedAddr) => {
                set({
                    selectedFromAddrBook: selectedAddr,
                });
            },
            // Implement the new setStartDate function
            setStartDate: (startDate: string) => {
                set({
                    startDate: startDate,
                });
            },
            setJobTitle: (jobTitle: string) => {
                set({
                    jobTitle: jobTitle, // This correctly matches the state field
                });
            },
            setJobDesc: (jobDesc: string) => {
                set({
                    jobDesc: jobDesc, // This correctly matches the state field
                });
            },
            setHasChangedAddressd: (hasChangedAddress: boolean) => {
                set({
                    hasChangedAddress: hasChangedAddress,
                });
            },
        }),
        {
            onRehydrateStorage: () => async (state: any) => {
                state.setHasHydrated(true);
            },
            name: 'Address',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ));
}
