import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTitle, Button } from '../components/UIKit.jsx';

// Dados mocados (com mais detalhes para a página de detalhe)
const mockPlantasDBCompleto = {
  // Frutas
  'banana': { nome: 'Banana', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/2280926/pexels-photo-2280926.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Precisa de muito sol, água abundante e solo rico em potássio. Ideal para quintais, pois cresce bastante.', epoca: 'Produz o ano todo em climas tropicais.' },
  'melancia': { nome: 'Melancia', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Exige muito sol e espaço para se espalhar. Gosta de solo bem drenado e regas regulares, sem encharcar.', epoca: 'Verão.' },
  'abacaxi': { nome: 'Abacaxi', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/28353017/pexels-photo-28353017.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Planta tropical que ama sol pleno. O solo deve ser leve e bem drenado. Demora, mas vale a pena!', epoca: 'Varia muito, pode levar de 18 a 24 meses para a primeira fruta.' },
  'mamao': { nome: 'Mamão Papaya', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/10869540/pexels-photo-10869540.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de sol pleno e solo fértil. Não tolera encharcamento. Produz rápido, muitas vezes no primeiro ano.', epoca: 'Ano todo em climas quentes.' },
  'laranja': { nome: 'Laranja', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Árvore que precisa de sol pleno e regas regulares. A adubação deve ser feita 3 a 4 vezes por ano.', epoca: 'Depende da variedade, mas geralmente no inverno.' },
  'morango': { nome: 'Morango', categoria: 'Fruta', imageUrl: 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Ótimo para vasos e canteiros. Gosta de sol e solo rico em matéria orgânica. Mantenha o solo húmido.', epoca: 'Primavera e outono.' },
  // Legumes
  'cenoura': { nome: 'Cenoura', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'O principal cuidado é com o solo, que deve ser muito fofo, leve e sem pedras, para que a raiz possa crescer direita.', epoca: 'Ano todo, com melhor desenvolvimento em climas amenos.' },
  'beterraba': { nome: 'Beterraba', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/29436276/pexels-photo-29436276.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Gosta de sol, mas tolera meia-sombra. Solo fofo e rico em matéria orgânica. Regas regulares.', epoca: 'Ano todo.' },
  'abobrinha': { nome: 'Abobrinha', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/34476508/pexels-photo-34476508.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Precisa de espaço, sol pleno e regas frequentes. Produz muito e rápido. Colha as abobrinhas ainda pequenas.', epoca: 'Verão.' },
  'batata-doce': { nome: 'Batata Doce', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/7456548/pexels-photo-7456548.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Planta rústica e fácil de cultivar. Gosta de calor e sol. A rama se espalha bastante pelo chão.', epoca: 'Plantar na primavera/verão.' },
  'berinjela': { nome: 'Berinjela', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/5529605/pexels-photo-5529605.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Ama calor e sol pleno (pelo menos 6h). Solo bem adubado e regas frequentes sem encharcar.', epoca: 'Verão.' },
  'pimentao': { nome: 'Pimentão', categoria: 'Legume', imageUrl: 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'Assim como a berinjela, ama calor e sol pleno. Regas regulares. Pode precisar de um tutor (estaca) para apoiar a planta.', epoca: 'Verão.' },
  // Ervas Medicinais
  'anis-estrelado': { nome: 'Anis-estrelado', categoria: 'Erva Medicinal', imageUrl: 'https://images.pexels.com/photos/30112806/pexels-photo-30112806.jpeg?auto=compress&cs=tinysrgb&w=1260', cuidados: 'É uma árvore, difícil de cultivar em vasos. Prefere climas subtropicais, solo húmido e bem drenado.', epoca: 'Colheita dos frutos antes de amadurecerem.' },
  'erva-doce': { nome: 'Erva-doce (Funcho)', categoria: 'Erva Medicinal', imageUrl: 'falta colocar', cuidados: 'Gosta de sol pleno e solo bem drenado. Não gosta de ser transplantada, plante no local definitivo.', epoca: 'Plantar na primavera.' },
  'boldo': { nome: 'Boldo', categoria: 'Erva Medicinal', imageUrl: 'falta colocar', cuidados: 'Arbusto muito rústico. Pega fácil por galho. Gosta de sol e tolera solos mais pobres, mas não gosta de encharcamento.', epoca: 'Ano todo.' },
  'capim-limao': { nome: 'Capim-limão', categoria: 'Erva Medicinal', imageUrl: 'falta colocar', cuidados: 'Precisa de sol pleno e cresce bastante, formando touceiras. Regas regulares. Fácil de cultivar.', epoca: 'Ano todo.' },
  'salvia': { nome: 'Sálvia', categoria: 'Erva Medicinal', imageUrl: 'falta colocar', cuidados: 'Gosta de muito sol e solo bem drenado. Não tolera excesso de água. Ótima para vasos.', epoca: 'Ano todo.' },
  'erva-cidreira': { nome: 'Erva-cidreira (Melissa)', categoria: 'Erva Medicinal', imageUrl: 'falta colocar', cuidados: 'Gosta de sol pela manhã (meia-sombra) e solo húmido. É invasiva, por isso é ótimo plantá-la em vasos.', epoca: 'Ano todo.' },
  // Temperos
  'cebolinha': { nome: 'Cebolinha', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'Muito fácil! Gosta de sol e solo sempre húmido. Pode cortar as folhas que elas crescem de novo. Perfeita para vasos.', epoca: 'Ano todo.' },
  'salsa': { nome: 'Salsa', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'Fácil de cultivar. Gosta de meia-sombra (sol da manhã) e rega frequente. Pode ser plantada em vasos pequenos.', epoca: 'Ano todo.' },
  'manjericao': { nome: 'Manjericão', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'Ama sol (pelo menos 4h) e regas frequentes, mas sem encharcar o solo. Retire as flores para que a planta continue a dar folhas.', epoca: 'Primavera e verão.' },
  'hortela': { nome: 'Hortelã', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'Gosta de meia-sombra e solo bem húmido. É EXTREMAMENTE invasiva. Plante-a **sempre** num vaso sozinha.', epoca: 'Ano todo.' },
  'louro': { nome: 'Louro', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'É uma árvore que cresce lentamente. Pode ser mantida em vaso grande. Gosta de sol e solo bem drenado.', epoca: 'Ano todo.' },
  'alecrim': { nome: 'Alecrim', categoria: 'Tempero', imageUrl: 'falta colocar', cuidados: 'Ama sol pleno (pelo menos 6h) e ODEIA excesso de água. O solo deve ser bem drenado. Perfeito para vasos.', epoca: 'Ano todo.' }
};

const PlantaDetailPage = () => {
  const { id } = useParams();
  // Busca na nova base de dados completa
  const planta = mockPlantasDBCompleto[id];

  if (!planta) {
    return (
      <div className="text-center">
        <PageTitle>Planta não encontrada</PageTitle>
        <p className="text-gray-400 mb-6">A planta que você está a procurar não existe na nossa base de dados.</p>
        <Button as={Link} to="/plantas" variant="primary">
          Ver todas as plantas
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <PageTitle>{planta.nome}</PageTitle>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img 
          src={planta.imageUrl} 
          alt={planta.nome}
          className="w-full h-64 md:h-80 object-cover" // Imagem grande
        />
        <div className="p-6 md:p-8">
          <span className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {planta.categoria}
          </span>
          
          <h2 className="text-2xl font-semibold text-green-400 mb-3">Cuidados Essenciais</h2>
          <p className="text-gray-300 mb-6">{planta.cuidados}</p>

          <h2 className="text-2xl font-semibold text-green-400 mb-3">Época de Plantio/Colheita</h2>
          <p className="text-gray-300">{planta.epoca}</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button as={Link} to="/plantas" variant="secondary">
          &larr; Voltar para todas as plantas
        </Button>
      </div>
    </div>
  );
};

export default PlantaDetailPage;

