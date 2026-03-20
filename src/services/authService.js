// Importa o 'auth' que já configurámos no firebaseConfig.js
import { auth } from './firebaseConfig.js'; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged // Este é o "ouvinte"
} from 'firebase/auth';

// Importa a função para criar o perfil do usuário no Firestore
import { criarPerfilUsuario } from './firestoreService.js';

// Função de Cadastro
export const cadastrarUsuario = async (email, password, nome, role) => {
  // 1. Cria a conta técnica (e-mail/senha)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Cria o perfil no Firestore com os dados que você quer (nome, role, status)
  await criarPerfilUsuario(user.uid, nome, email, role);
  
  return user;
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