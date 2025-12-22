"use client";

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock user object that mirrors the Firebase User type
const mockUser = {
  uid: 'mock-user-id',
  email: 'user@promptly.dev',
  displayName: 'Prompt Engineer',
  photoURL: 'https://i.pravatar.cc/150?u=mock-user-id',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  providerId: 'password',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-token',
  getIdTokenResult: async () => ({
    token: 'mock-token',
    claims: {},
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    expirationTime: '',
  }),
  reload: async () => {},
  toJSON: () => ({}),
} as unknown as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would use onAuthStateChanged from Firebase Auth here
    // For now, we simulate a logged-out state initially
    const timer = setTimeout(() => {
        setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
        setUser(null);
        setLoading(false);
    }, 500);
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
