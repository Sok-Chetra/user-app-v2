import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type User = {
    id: string;
    name: string;
    email: string;
    profile: any;
    type: 'user' | 'admin',
    activatedAt: string;
}

export type FormState = {
    email?: string;
    otp?: string;
    newPassword?: string;
}

export type AuthState = {
    user: User | null;
    form: FormState;
    _hasHydrated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

export type AuthActions = {
    setUser: (user: User | null) => void;
    setForm: (form: Partial<FormState>) => void;
    setHasHydrated: (state: boolean) => void;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
    user: null,
    form: {
        email: '',
        otp: '',
        newPassword: '',
    },
    _hasHydrated: false,
    accessToken: null,
    refreshToken: null,
}

export const createAuthStore = () => {
    return createStore<AuthStore>()(persist(
        (set) => ({
            ...defaultInitState,
            setUser: (user: User | null) => {
                set({
                    user,
                });
            },
            setAccessToken: (access_token: string | null) => {
                set({
                    accessToken: access_token,
                });
            },
            setRefreshToken: (refresh_token: string | null) => {
                set({
                    refreshToken: refresh_token,
                });
            },
            setForm: (form: Partial<FormState>) => {
                set((state: AuthState) => ({
                    form: {
                        ...state.form,
                        ...form,
                    },
                }));
            },
            setHasHydrated: (state: boolean) => {
                set({
                    _hasHydrated: state,
                });
            }
        }),
        {
            onRehydrateStorage: () => async (state: any) => {
                state.setHasHydrated(true);
            },
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ));
}