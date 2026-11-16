import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Usuario } from '../types/pokemon';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useLocalStorage<Usuario | null>('usuario', null);

  // nao temos backend, entao o login so confere o formato do email e o tamanho da senha
  function login(email: string, senha: string) {
    const emailValido = /^\S+@\S+\.\S+$/.test(email);
    if (!emailValido || senha.length < 6) return false;

    const nome = email.split('@')[0];
    setUsuario({ nome: nome.charAt(0).toUpperCase() + nome.slice(1), email });
    return true;
  }

  function logout() {
    setUsuario(null);
  }

  return <AuthContext.Provider value={{ usuario, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro do AuthProvider');
  return context;
}
