import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  lojaSelecionada: string | null;
  login: (loja: string) => void;
  logout: () => void;
  trocarLoja: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lojaSelecionada, setLojaSelecionada] = useState<string | null>(null);

  const login = (loja: string) => {
    setIsLoggedIn(true);
    setLojaSelecionada(loja);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLojaSelecionada(null);
  };

  const trocarLoja = () => {
    setLojaSelecionada(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, lojaSelecionada, login, logout, trocarLoja }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
