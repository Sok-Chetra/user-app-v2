'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import {
    type ServiceStore,
    createServiceStore
} from '@/libs/states/service-state'

export const ServiceStoreContext = createContext<StoreApi<ServiceStore> | null>(
    null,
)

export interface ServiceStoreProviderProps {
    children: ReactNode
}

export const ServiceStoreProvider = ({
    children,
}: ServiceStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ServiceStore>>()

    if (!storeRef.current) {
        storeRef.current = createServiceStore()
    }

    return (
        <ServiceStoreContext.Provider value={storeRef.current}>
            {children}
        </ServiceStoreContext.Provider>
    )
}

export const useServiceStore = <T,>(
    selector: (store: ServiceStore) => T,
): T => {
    const serviceStoreContext = useContext(ServiceStoreContext)

    if (!serviceStoreContext) {
        throw new Error(`useAuthStore must be use within AuthStoreProvider`)
    }

    return useStore(serviceStoreContext, selector)
}