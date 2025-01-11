
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import {
    type AddressStore,
    createAddressStore,
} from '@/libs/states/address-state'


export const AddressStoreContext = createContext<StoreApi<AddressStore> | null>(
    null,
)

export interface AddressProviderProps {
    children: ReactNode
}

export const AddressStoreProvider = ({
    children,
}: AddressProviderProps) => {
    const storeRef = useRef<StoreApi<AddressStore>>()

    if (!storeRef.current) {
        storeRef.current = createAddressStore();
    }

    return (
        <AddressStoreContext.Provider value={storeRef.current}>
            {children}
        </AddressStoreContext.Provider>
    )
}

export const useAddressStore = <T,>(
    selector: (store: AddressStore) => T,
): T => {
    const addressStoreContext = useContext(AddressStoreContext)

    if (!addressStoreContext) {
        throw new Error(`useAddressStore must be use within AddressStoreProvider`)
    }

    return useStore(addressStoreContext, selector)
}