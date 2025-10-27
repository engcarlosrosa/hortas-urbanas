// Importa as instâncias 'db' e 'auth' do teu ficheiro de configuração
import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

/**
 * Envia um relatório de terreno baldio para o Firestore.
 * @param {object} relatorio - O objeto com os dados do relatório.
 */
export const submitReport = async (relatorio) => {
  try {
    // Vamos assumir que os relatórios são públicos ou semi-públicos
    // Se fossem privados do utilizador, usariamos o ID do utilizador no caminho
    // const userId = auth.currentUser?.uid;
    // if (!userId) throw new Error("Utilizador não autenticado");

    const relatoriosCollection = collection(db, 'relatorios');
    const docRef = await addDoc(relatoriosCollection, {
      ...relatorio,
      // Garante que a data é guardada no formato do Firestore
      criadoEm: Timestamp.fromDate(relatorio.criadoEm), 
    });
    console.log("Relatório enviado com ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao submeter relatório: ", error);
    throw error;
  }
};

/**
 * Envia um formulário de voluntariado.
 * @param {object} formulario - O objeto com os dados do formulário.
 */
export const submitVolunteering = async (formulario) => {
  try {
    const formulariosCollection = collection(db, 'formularios');
    const docRef = await addDoc(formulariosCollection, {
      ...formulario,
      criadoEm: Timestamp.fromDate(formulario.criadoEm),
    });
    console.log("Formulário enviado com ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao submeter formulário: ", error);
    throw error;
  }
};

/**
 * Adiciona um novo post ao fórum.
 * @param {object} post - O objeto do post.
 */
export const addPost = async (post) => {
  try {
    const userId = auth.currentUser?.uid;
    const displayName = auth.currentUser?.displayName || "Anónimo";

    if (!userId) throw new Error("Utilizador não autenticado para publicar");

    const postsCollection = collection(db, 'forumPosts');
    const docRef = await addDoc(postsCollection, {
      ...post,
      autorId: userId,
      autorNome: displayName,
      criadoEm: Timestamp.fromDate(post.data), // Usa a data passada ou new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar post: ", error);
    throw error;
  }
};

/**
 * Busca os posts mais recentes do fórum.
 */
export const getPosts = async () => {
  try {
    const postsCollection = collection(db, 'forumPosts');
    // Cria uma query para ordenar os posts por data, dos mais recentes para os mais antigos
    const q = query(postsCollection, orderBy('criadoEm', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        // Converte o Timestamp do Firestore de volta para um objeto Date do JS
        data: data.criadoEm.toDate(), 
      });
    });
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts: ", error);
    throw error;
  }
};
