import { type ReactNode, createContext, useContext, useEffect } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { type AuthStore, createAuthStore } from '@/libs/states/auth';
import { router } from 'expo-router';
// Create a Zustand store instance outside the component
export const authStore = createAuthStore();
export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

export interface AuthStoreProviderProps {
    children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {

    return (
        <AuthStoreContext.Provider value={authStore}>
            {children}
        </AuthStoreContext.Provider>
    );
};

// Custom hook to access AuthStore
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
    const authStoreContext = useContext(AuthStoreContext);

    if (!authStoreContext) {
        throw new Error(`useAuthStore must be used within AuthStoreProvider`);
    }

    return useStore(authStoreContext, selector);
};