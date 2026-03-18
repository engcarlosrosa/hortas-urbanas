// --- Carregamento do .env (DEVE VIR PRIMEIRO) ---
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Sobe UM nível (de /scripts para /) para encontrar o .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
// --- Fim do carregamento ---

// --- OBJETO DE DADOS (COM OS ERROS DE DIGITAÇÃO CORRIGIDOS) ---
const mockPlantasDBCompleto = {
  'banana': { nome: 'Banana', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/2280926/pexels-photo-2280926.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Precisa de muito sol, água abundante e solo rico em potássio. Ideal para quintais, pois cresce bastante.', epoca: 'Produz o ano todo em climas tropicais.' },
  'melancia': { nome: 'Melancia', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Exige muito sol e espaço para se espalhar. Gosta de solo bem drenado e regas regulares, sem encharcar.', epoca: 'Verão.' },
  'abacaxi': { nome: 'Abacaxi', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/28353017/pexels-photo-28353017.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Planta tropical que ama sol pleno. O solo deve ser leve e bem drenado. Demora, mas vale a pena!', epoca: 'Varia muito, pode levar de 18 a 24 meses para a primeira fruta.' },
  'mamao': { nome: 'Mamão Papaya', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/10869540/pexels-photo-10869540.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de sol pleno e solo fértil. Não tolera encharcamento. Produz rápido, muitas vezes no primeiro ano.', epoca: 'Ano todo em climas quentes.' },
  'laranja': { nome: 'Laranja', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Árvore que precisa de sol pleno e regas regulares. A adubação deve ser feita 3 a 4 vezes por ano.', epoca: 'Depende da variedade, mas geralmente no inverno.' },
  'morango': { nome: 'Morango', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Ótimo para vasos e canteiros. Gosta de sol e solo rico em matéria orgânica. Mantenha o solo húmido.', epoca: 'Primavera e outono.' },
  'cenoura': { nome: 'Cenoura', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'O principal cuidado é com o solo, que deve ser muito fofo, leve e sem pedras, para que a raiz possa crescer direita.', epoca: 'Ano todo, com melhor desenvolvimento em climas amenos.' },
  'beterraba': { nome: 'Beterraba', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/29436276/pexels-photo-29436276.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de sol, mas tolera meia-sombra. Solo fofo e rico em matéria orgânica. Regas regulares.', epoca: 'Ano todo.' },
  'abobrinha': { nome: 'Abobrinha', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/34476508/pexels-photo-34476508.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Precisa de espaço, sol pleno e regas frequentes. Produz muito e rápido. Colha as abobrinhas ainda pequenas.', epoca: 'Verão.' },
  'batata-doce': { nome: 'Batata Doce', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/7456548/pexels-photo-7456548.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Planta rústica e fácil de cultivar. Gosta de calor e sol. A rama se espalha bastante pelo chão.', epoca: 'Plantar na primavera/verão.' },
  'berinjela': { nome: 'Berinjela', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/5529605/pexels-photo-5529605.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Ama calor e sol pleno (pelo menos 6h). Solo bem adubado e regas frequentes sem encharcar.', epoca: 'Verão.' },
  'pimentao': { nome: 'Pimentão', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Assim como a berinjela, ama calor e sol pleno. Regas regulares. Pode precisar de um tutor (estaca) para apoiar a planta.', epoca: 'Verão.' },
  'anis-estrelado': { nome: 'Anis-estrelado', categoria: 'Erva Medicinal', imageUrl: 'https://images.pexels.com/photos/30112806/pexels-photo-30112806.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'É uma árvore, difícil de cultivar em vasos. Prefere climas subtropicais, solo húmido e bem drenado.', epoca: 'Colheita dos frutos antes de amadurecerem.' },
  'erva-doce': { nome: 'Erva-doce (Funcho)', categoria: 'Erva Medicinal', imageUrl: 'https://images.pexels.com/photos/6045502/pexels-photo-6045502.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de sol pleno e solo bem drenado. Não gosta de ser transplantada, plante no local definitivo.', epoca: 'Plantar na primavera.' },
  'boldo': { nome: 'Boldo', categoria: 'Erva Medicinal', imageUrl: 'https://images.pexels.com/photos/4098469/pexels-photo-4098469.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Arbusto muito rústico. Pega fácil por galho. Gosta de sol e tolera solos mais pobres, mas não gosta de encharcamento.', epoca: 'Ano todo.' },
  'capim-limao': { nome: 'Capim-limão', categoria: 'Erva Medicinal', imageUrl: 'https://cdn.pixabay.com/photo/2014/02/23/05/54/cymbopogon-272641_1280.jpg', cuidados: 'Precisa de sol pleno e cresce bastante, formando touceiras. Regas regulares. Fácil de cultivar.', epoca: 'Ano todo.' },
  'salvia': { nome: 'Sálvia', categoria: 'Erva Medicinal', imageUrl: 'https://images.pexels.com/photos/33209626/pexels-photo-33209626.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de muito sol e solo bem drenado. Não tolera excesso de água. Ótima para vasos.', epoca: 'Ano todo.' },
  'erva-cidreira': { nome: 'Erva-cidreira (Melissa)', categoria: 'Erva Medicinal', imageUrl: 'https://cdn.pixabay.com/photo/2020/05/25/13/43/melissa-5218673_1280.jpg', cuidados: 'Gosta de sol pela manhã (meia-sombra) e solo húmido. É invasiva, por isso é ótimo plantá-la em vasos.', epoca: 'Ano todo.' },
  'cebolinha': { nome: 'Cebolinha', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2013/12/13/23/22/winter-onion-228039_1280.jpg', cuidados: 'Muito fácil! Gosta de sol e solo sempre húmido. Pode cortar as folhas que elas crescem de novo. Perfeita para vasos.', epoca: 'Ano todo.' },
  'salsa': { nome: 'Salsa', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2018/06/03/13/09/parsley-3450411_1280.jpg', cuidados: 'Fácil de cultivar. Gosta de meia-sombra (sol da manhã) e rega frequente. Pode ser plantada em vasos pequenos.', epoca: 'Ano todo.' },
  'manjericao': { nome: 'Manjericão', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2016/03/10/18/44/top-view-1248955_1280.jpg', cuidados: 'Ama sol (pelo menos 4h) e regas frequentes, mas sem encharcar o solo. Retire as flores para que a planta continue a dar folhas.', epoca: 'Primavera e verão.' },
  'hortela': { nome: 'Hortelã', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg', cuidados: 'Gosta de meia-sombra e solo bem húmido. É EXTREMAMENTE invasiva. Plante-a sempre num vaso sozinha.', epoca: 'Ano todo.' },
  'louro': { nome: 'Louro', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2017/09/23/19/24/laurel-2779880_1280.jpg', cuidados: 'É uma árvore que cresce lentamente. Pode ser mantida em vaso grande. Gosta de sol e solo bem drenado.', epoca: 'Ano todo.' },
  'alecrim': { nome: 'Alecrim', categoria: 'Tempero', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg', cuidados: 'Ama sol pleno (pelo menos 6h) e ODEIA excesso de água. O solo deve ser bem drenado. Perfeito para vasos.', epoca: 'Ano todo.' },
  'taioba': { nome: 'Taioba', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2021/10/20/12/46/elephants-ears-6725939_1280.jpg', cuidados: 'Gosta de meia-sombra e solo muito húmido, rico em matéria orgânica. CUIDADO: Só pode ser consumida cozida, NUNCA crua.', epoca: 'Ano todo em climas quentes.' },
  'ora-pro-nobis': { nome: 'Ora-pro-nóbis', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2022/11/15/14/32/flower-7594101_1280.jpg', cuidados: 'Planta trepadeira muito rústica. Gosta de sol pleno e é resistente à seca. Pega fácil por galhos. Rica em proteína.', epoca: 'Floresce na primavera, folhas o ano todo.' },
  'vinagreira': { nome: 'Vinagreira (Rosela)', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2022/03/31/04/07/rosella-7102161_1280.jpg', cuidados: 'Arbusto que gosta de sol pleno e calor. Usam-se os cálices das flores (vermelhos) para fazer chás, geleias e sucos (Karkadé).', epoca: 'Plantar na primavera, colher no verão/outono.' },
  'peixinho-da-horta': { nome: 'Peixinho-da-horta', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2014/10/22/21/02/stachys-wool-498974_960_720.jpg', cuidados: 'Planta rasteira com folhas aveludadas. Gosta de sol e solo bem drenado (não tolera encharcamento). As folhas são consumidas empanadas e fritas, lembrando o sabor de peixe.', epoca: 'Ano todo.' },
  'azedinha': { nome: 'Azedinha', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2012/08/11/13/59/meadows-sauerampfer-54054_1280.jpg', cuidados: 'Fácil de cultivar em vasos. Gosta de meia-sombra e solo húmido. Tem um sabor ácido, ótimo para saladas e sucos.', epoca: 'Ano todo.' },
  'capuchinha': { nome: 'Capuchinha', categoria: 'PANC', imageUrl: 'https://cdn.pixabay.com/photo/2016/12/29/18/00/tropaeolum-majus-1939046_640.jpg', cuidados: 'Planta rasteira ou pendente. Gosta de sol. As flores e folhas são comestíveis e têm um sabor apimentado, ótimas para saladas.', epoca: 'Floresce na primavera e verão.' }
};

// --- FUNÇÃO DE AUTODIAGNÓSTICO ---
// Usamos uma IIFE (Immediately Invoked Function Expression) async
// para poder usar 'await import()' no nível superior.
(async () => {
  console.log("--- INICIANDO SCRIPT DE SEED ---");

  // 1. Verifica se o .env foi carregado ANTES de importar o Firebase
  if (!process.env.VITE_PROJECT_ID) {
    console.error("!!! ERRO FATAL: Não foi possível ler 'VITE_PROJECT_ID' do .env.");
    console.error("   Verifique se o .env está na raiz do projeto (pasta 'hortas-urbanas').");
    console.error("   Execute: node -r dotenv/config scripts/seedPlantas.js");
    process.exit(1);
  }

  console.log(`Conectando ao Firestore (Projeto: ${process.env.VITE_PROJECT_ID})...`);

  // 2. Importa o Firebase *DEPOIS* do dotenv ter corrido
  // Isto garante que o process.env está preenchido quando o firebaseConfig.js for lido
  const { db } = await import('../src/services/firebaseConfig.js');
  const { collection, addDoc } = await import('firebase/firestore');

  const plantasCollection = collection(db, "plantas");
  let contador = 0;
  
  console.log("Iniciando cadastro de plantas...");

  // Itera sobre cada chave no objeto
  for (const plantaKey in mockPlantasDBCompleto) {
    const plantaData = mockPlantasDBCompleto[plantaKey];
    try {
      // Adiciona o documento ao Firestore
      await addDoc(plantasCollection, plantaData);
      console.log(`- Sucesso: '${plantaData.nome}'`);
      contador++;
    } catch (error) {
      console.error(`!! Erro ao cadastrar '${plantaData.nome}':`, error.message);
    }
  }

  console.log(`\n--- SCRIPT FINALIZADO ---`);
  console.log(`${contador} de ${Object.keys(mockPlantasDBCompleto).length} plantas cadastradas com sucesso.`);
  
  process.exit(0);
})().catch((error) => {
  console.error("!!! ERRO INESPERADO (fora da função):", error);
  process.exit(1);
});