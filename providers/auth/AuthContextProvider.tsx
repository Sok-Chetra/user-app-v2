import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/storage/useStorageState';
import { router } from 'expo-router';

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    function handleSignIn() {
        setSession('xxx');
        router.replace('/(app)/(main)');
    }

    function handleLogout() {
        setSession(null);
        router.replace('/(auth)');
    }

    return (
        <AuthContext.Provider
            value={{
                signIn: handleSignIn,
                signOut: handleLogout,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
