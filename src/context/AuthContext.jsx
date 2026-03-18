import React, { createContext, useContext, useState, useEffect } from 'react';
// Atenção ao caminho do import!
import { onAuthChange, deslogarUsuario } from '../services/authService.js';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria um "hook" customizado para ser fácil de usar
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Cria o "Provedor" (o componente que vai "abraçar" a app)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Guarda o utilizador logado
  const [loading, setLoading] = useState(true); // Para saber se já verificou o login

  // 4. O "Ouvinte" do Firebase
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false); // Já verificámos, pode carregar a app
    });
    
    // Limpa o ouvinte quando o componente for "desmontado"
    return unsubscribe;
  }, []);

  // Função de logout (passada pelo contexto)
  const logout = () => {
    return deslogarUsuario();
  };

  // 5. O valor que será partilhado com todos os componentes
  const value = {
    currentUser,
    logout
  };

  // Não mostra a app enquanto não souber se o utilizador está logado
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};