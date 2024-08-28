import { create, StateCreator } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User } from '../model/User.model';

interface AuthState {
    isLoggedIn: boolean;
    isAuthLoading: boolean;
    user: User | null;
    setLoggedIn: (user: User) => void;
    setLoggedOut: () => void;
    logOut: () => void;
}

const authStateCreator: StateCreator<AuthState> = (set) => ({
    isLoggedIn: false,
    isAuthLoading: false,
    user: null,
    setLoggedIn: (user: User) => set({ isLoggedIn: true, user }),
    setLoggedOut: () => set({ isLoggedIn: false, user: null }),
    logOut: () => set({ isLoggedIn: false, user: null }),
});

const useAuthStore = create<AuthState>()(
    devtools(
        persist(authStateCreator, {
            name: 'auth-storage',
            partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
        })
    )
);

export default useAuthStore;
