import { create } from 'zustand'
import type { AuthSuccessResponse } from '@test-platform/shared/schemas';


interface AuthState {
  user: AuthSuccessResponse | null;
  isLoggedIn: boolean;
  login: (userData: AuthSuccessResponse) => void;
  logout: () => void;
  updateProfile: (updatedData: AuthSuccessResponse) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',

  login: (userData) => {
    localStorage.setItem('isLoggedIn', 'true') 
    set({ user: userData, isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn')
    set({ user: null, isLoggedIn: false })
  },

  updateProfile: (updatedData) => {
    set({ user: updatedData })
  }
}))