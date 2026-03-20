import React, { createContext, useContext, useState, useEffect } from 'react';
// Atenção ao caminho do import!
import { onAuthChange, deslogarUsuario } from '../services/authService.js';
import { getDoc, doc } from 'firebase/firestore'; // Importe as funções necessárias
import { db } from '../services/firebaseConfig.js';
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

  // 4. O "Ouvinte" do Firebase para mudanças de autenticação (Ex: login, logout, recarregar a página)
// src/context/AuthContext.jsx

useEffect(() => {
  const unsubscribe = onAuthChange(async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          // Unifica os dados do Auth com os dados do Firestore (nome, role, status)
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setCurrentUser(user);
      }
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  });

  return unsubscribe; // Retorna apenas uma vez aqui
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