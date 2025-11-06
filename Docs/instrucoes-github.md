Passo a Passo para Subir seu ProjetoSiga estes 4 passos na ordem correta para garantir a segurança das suas chaves de API e enviar seu código para o repositório do GitHub.Passo 1: Segurança - Isolar suas Chaves de API (Obrigatório)Vamos mover suas chaves do Firebase para um arquivo de ambiente que não será enviado ao GitHub.Crie um Arquivo .env:Na pasta principal do seu projeto (hortas-urbanas), crie um novo arquivo e nomeie-o exatamente como .env.Mova as Chaves para o .env:Recorte o objeto firebaseConfig do seu arquivo FirebaseConfig.js.Cole as chaves dentro do arquivo .env. Você precisará formatá-las como variáveis de ambiente, adicionando o prefixo VITE_ a cada одна.O seu arquivo .env deve ficar assim:VITE_API_KEY="sua-api-key"
VITE_AUTH_DOMAIN="seu-auth-domain"
VITE_PROJECT_ID="seu-project-id"
VITE_STORAGE_BUCKET="seu-storage-bucket"
VITE_MESSAGING_SENDER_ID="seu-messaging-sender-id"
VITE_APP_ID="seu-app-id"
VITE_MEASUREMENT_ID="seu-measurement-id"
Atualize o FirebaseConfig.js para Ler as Chaves:Modifique seu FirebaseConfig.js para que ele leia essas variáveis de ambiente de forma segura. O Vite (ferramenta que você usou para criar o projeto) faz isso automaticamente através do objeto import.meta.env.Seu FirebaseConfig.js agora deve ficar assim:// Importe as funções dos SDKs que você precisa
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// A configuração do seu app da web do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que você irá usar em outras partes do seu projeto
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
Passo 2: Segurança - Ignorar o Arquivo .envAgora, vamos dizer ao Git para nunca enviar o arquivo .env para o GitHub.Abra o arquivo .gitignore que já existe na pasta do seu projeto.Adicione uma nova linha no final do arquivo com o seguinte texto:.env
Passo 3: Corrigir a Inicialização do GitSeu terminal mostrou um erro de "not a git repository". Vamos corrigir isso, inicializando o repositório localmente e conectando-o ao seu repositório remoto no GitHub.No seu terminal, dentro da pasta hortas-urbanas, execute o seguinte comando para iniciar o Git:git init
Agora, conecte seu repositório local ao do GitHub. Substitua a URL abaixo pela URL do seu repositório:git remote add origin https://github.com/hortas-urbanas/hortas-urbanas.git
Passo 4: Enviar o Código para o GitHubCom as chaves seguras e o Git configurado, agora podemos enviar os arquivos.Observação Importante: Certifique-se de que você está dentro da pasta hortas-urbanas no seu terminal antes de executar os comandos abaixo.Adicione todos os arquivos ao controle do Git:git add .
Crie o primeiro "commit" (um ponto de salvamento do seu progresso):git commit -m "feat: Estrutura inicial do projeto e configuração do Firebase"
Renomeie a branch principal para main, que é o padrão atual:git branch -M main
Envie seu código para o GitHub:git push -u origin main
Pronto! Após esses passos, seu código estará no GitHub e suas chaves de API estarão seguras no seu computador.