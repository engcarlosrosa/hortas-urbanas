// Em: src/services/firestoreService.js

// Importa o 'db' (a base de dados) do nosso config
import { db } from './firebaseConfig.js';
// Importa as funções do Firestore que vamos usar
import { 
  collection, 
  addDoc,
  serverTimestamp, // <-- IMPORTANTE: Para a data correta
  query,            // <-- NOVO: Para criar consultas
  orderBy,          // <-- NOVO: Para ordenar os resultados
  onSnapshot,        // <-- NOVO: Para escutar em tempo real
  getDocs,  // <-- NOVO: Para buscar uma lista 1x
  getDoc,   // <-- NOVO: Para buscar 1 documento 1x
  doc,       // <-- NOVO: Para referenciar um documento
  deleteDoc  // <-- NOVO: Para deletar um documento
} from 'firebase/firestore';

// --- FUNÇÕES REAIS DO FIRESTORE ---

export const criarPost = (uid, emailUsuario, texto) => {
  // 1. Aponta para a "coleção" (gaveta) 'posts'
  const postsCollectionRef = collection(db, 'posts');
  
  // 2. Adiciona um novo "documento" (ficheiro) nessa gaveta
  return addDoc(postsCollectionRef, {
    uid: uid,
    autorEmail: emailUsuario,
    texto: texto,
    criadoEm: serverTimestamp() // <-- MUDADO: Usar a data do servidor
  });
};

// --- NOVA FUNÇÃO PARA LER OS POSTS ---
export const getPostsSnapshot = (callback) => {
  // 1. Aponta para a coleção 'posts'
  const postsCollectionRef = collection(db, 'posts');

  // 2. Cria uma consulta para ordenar os posts (do mais novo para o mais antigo)
  const q = query(postsCollectionRef, orderBy('criadoEm', 'desc'));

  // 3. Escuta a consulta em tempo real
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      // Adiciona o post E o seu ID
      posts.push({ id: doc.id, ...doc.data() });
    });
    // 4. Envia os posts de volta para o componente
    callback(posts);
  });

  // 5. Retorna a função 'unsubscribe' (para parar de escutar)
  return unsubscribe;
};

export const deletePost = (id) => {
  // Cria uma referência direta ao documento do post
  const postDocRef = doc(db, 'posts', id);
  // Deleta o documento
  return deleteDoc(postDocRef);
};

// --- NOVAS FUNÇÕES PARA GUIAS ---

// Função para buscar a LISTA de todos os guias
export const getGuias = async () => {
  const guiasCollectionRef = collection(db, 'guias');
  const querySnapshot = await getDocs(guiasCollectionRef);
  
  const guias = [];
  querySnapshot.forEach((doc) => {
    // Adiciona o guia E o seu ID
    guias.push({ id: doc.id, ...doc.data() });
  });
  
  return guias;
};

// Função para buscar UM guia específico pelo seu ID
export const getGuiaById = async (id) => {
  // 1. Cria uma referência direta ao documento
  const docRef = doc(db, 'guias', id);
  // 2. Busca esse documento
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // 3. Se existir, retorna os dados
    return docSnap.data();
  } else {
    // 4. Se não, joga um erro
    console.error("Guia não encontrado!");
    throw new Error("Documento não encontrado");
  }
};

// --- NOVAS FUNÇÕES PARA PLANTAS ---

// Função para buscar a LISTA de todas as plantas
export const getPlantas = async () => {
  const plantasCollectionRef = collection(db, 'plantas');
  // Nota: Você pode querer adicionar um orderBy('nome', 'asc') aqui
  const querySnapshot = await getDocs(plantasCollectionRef);
  
  const plantas = [];
  querySnapshot.forEach((doc) => {
    plantas.push({ id: doc.id, ...doc.data() });
  });
  
  return plantas;
};

// Função para buscar UMA planta específica pelo seu ID
export const getPlantaById = async (id) => {
  const docRef = doc(db, 'plantas', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }; // Retorna com o ID
  } else {
    console.error("Planta não encontrada!");
    throw new Error("Documento não encontrado");
  }
};

// --- NOVA FUNÇÃO PARA REPORTAR TERRENO ---

export const criarRelatorioTerreno = (uid, relatorio) => {
  // O relatorio já vem com: { titulo, descricao, endereco, imageUrl }
  const terrenosCollectionRef = collection(db, 'terrenos');
  
  return addDoc(terrenosCollectionRef, {
    ...relatorio,
    autorUid: uid,
    status: 'pendente', // Status inicial
    criadoEm: serverTimestamp() 
  });
};

// --- NOVA FUNÇÃO PARA ENVIAR VOLUNTARIADO ---

export const enviarVoluntariado = (uid, dadosVoluntario) => {
  // dadosVoluntario já vem com: { nome, email, motivo }
  const voluntariosCollectionRef = collection(db, 'voluntarios');
  
  return addDoc(voluntariosCollectionRef, {
    ...dadosVoluntario,
    autorUid: uid,
    status: 'pendente', // Status inicial
    criadoEm: serverTimestamp() 
  });
};
// --- NOVA FUNÇÃO PARA BUSCAR TERRENOS REPORTADOS ---
export const getTerrenos = async () => {
  const terrenosCollectionRef = collection(db, 'terrenos');
  const querySnapshot = await getDocs(terrenosCollectionRef);
  
  const terrenos = [];
  querySnapshot.forEach((doc) => {
    terrenos.push({ id: doc.id, ...doc.data() });
  });
  
  return terrenos;
};
// --- DADOS MOCADOS (Para Guias e Plantas) ---
// (O resto do seu arquivo continua igual)

const mockGuias = [
  // ... (seus dados mocados)
];
// ... (todas as suas outras funções mocadas) ...
export const getMockGuias = () => mockGuias;
export const getMockGuiaById = (id) => mockGuiasDB[id];
export const getMockCategorias = () => categorias;
export const getMockPlantas = () => mockPlantasCompleto;
export const getMockPlantaById = (id) => mockPlantasDBCompleto[id];