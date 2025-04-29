import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../libs/firebase";

interface AuthProviderProps {
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthProviderProps>((set) => {
  onAuthStateChanged(auth, (user) => {
    set({ email: user?.email ?? null, loading: false });
  });

  return {
    email: null,
    loading: true,
    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    async register(email, password) {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    async logout() {
      await signOut(auth);
      set({ email: null });
    },
  };
});
