// Importa o 'auth' que já configurámos no firebaseConfig.js
import { auth } from './firebaseConfig.js'; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged // Este é o "ouvinte"
} from 'firebase/auth';

// Função de Cadastro
export const cadastrarUsuario = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Função de Login
export const logarUsuario = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Função de Logout
export const deslogarUsuario = () => {
  return signOut(auth);
};

// Função de Recuperar Senha (Podemos deixar para depois se o tempo apertar)
export const recuperarSenha = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Observador do Estado de Autenticação
// Esta é a função mais importante.
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};