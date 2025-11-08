import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from './rbac';


export type Session = { accessToken: string; refreshToken: string; user: { id: string; name: string; role: Role } };


type AuthState = {
    session: Session | null;
    login: (s: Session) => void;
    logout: () => void;
};


export const useAuth = create<AuthState>()(persist((set) => ({
    session: null,
    login: (s) => set({ session: s }),
    logout: () => set({ session: null })
}), { name: 'ecareer-auth' }));