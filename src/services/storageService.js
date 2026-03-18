import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { app } from './firebaseConfig.js'; // Importa o app inicializado
import { v4 as uuidv4 } from 'uuid'; // Para nomes de arquivo únicos

// 1. Inicializa o Storage
const storage = getStorage(app);

// 2. Função de Upload
export const uploadImage = async (file, path) => {
  // 3. Cria um nome de arquivo único
  // ex: 'terrenos/algum-id-aleatorio.jpg'
  const extensao = file.name.split('.').pop();
  const nomeArquivo = `${uuidv4()}.${extensao}`;
  const storageRef = ref(storage, `${path}/${nomeArquivo}`);

  try {
    // 4. Faz o upload do arquivo
    const snapshot = await uploadBytes(storageRef, file);
    
    // 5. Pega a URL pública do arquivo
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    throw new Error("Falha ao fazer upload da imagem.");
  }
};