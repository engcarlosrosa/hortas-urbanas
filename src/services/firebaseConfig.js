import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Detecta se estamos no Vite (import.meta.env) ou no Node (process.env)
// O script (seedPlantas.js) é responsável por carregar o process.env via dotenv *antes* disto.
const env = import.meta.env || process.env;

const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID
  // measurementId: env.VITE_MEASUREMENT_ID // Descomente se precisar do Analytics
};

// A verificação de erro foi movida para o script de seed,
// pois este ficheiro deve ser "agnóstico" do ambiente.

// Inicializa o Firebase
export const app = initializeApp(firebaseConfig);

// Exporta os serviços
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);