// Importa as instâncias 'storage' e 'auth' do teu ficheiro de configuração
import { storage, auth } from './firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Faz o upload de uma imagem para o Firebase Storage.
 * @param {File} file - O ficheiro de imagem a ser enviado.
 */
export const uploadImage = async (file) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("Utilizador não autenticado para fazer upload");

    // Cria um nome de ficheiro único para evitar sobreposições
    // Ex: relatorios/USER_ID/TIMESTAMP_FILENAME
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `relatorios/${userId}/${uniqueFileName}`);

    // Faz o upload do ficheiro
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtém o URL de download da imagem
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log("Ficheiro enviado com sucesso! URL:", downloadURL);
    return downloadURL;

  } catch (error) {
    console.error("Erro no upload da imagem: ", error);
    throw error;
  }
};
