import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    roles: string[];
    permissions: string[];
    isAuthenticated: boolean;
    username: string;

    login: (payload: LoginResponseData) => void;
    logout: () => void;
    setAccessToken: (token: string) => void;
};

type LoginResponseData = {
    email: string;
    permissions: string[];
    refreshToken: string;
    roles: string[];
    token: string;
    type: string;
    username: string;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            email: null,
            roles: [],
            permissions: [],
            isAuthenticated: false,
            username: "",

            login: (data) =>
                set({
                    accessToken: data.token,
                    refreshToken: data.refreshToken,
                    email: data.email,
                    roles: data.roles,
                    permissions: data.permissions,
                    isAuthenticated: true,
                    username: data.username,
                }),

            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    email: null,
                    roles: [],
                    permissions: [],
                    isAuthenticated: false,
                    username: "",
                }),

            setAccessToken: (token) =>
                set({ accessToken: token }),
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                if (state?.accessToken) {
                    state.isAuthenticated = true;
                }
            },
        }
    )
);
