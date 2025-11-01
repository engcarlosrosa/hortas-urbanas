import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTitle, Button } from '../components/UIKit.jsx';

// Dados mocados (devem ser os mesmos da página de lista, mas com mais detalhes)
const mockGuiasDB = {
  'principios-basicos': {
    id: 'principios-basicos',
    titulo: 'Princípios Básicos de Cultivo',
    conteudo: [
      { tipo: 'h2', texto: '1. O Solo' },
      { tipo: 'p', texto: 'O solo é a base de tudo. Um bom solo deve ser rico em matéria orgânica, bem drenado e aerado. Para hortas em vasos, utilize uma mistura de terra vegetal, húmus de minhoca e perlita ou areia grossa para garantir a drenagem.' },
      { tipo: 'h2', texto: '2. Iluminação' },
      { tipo: 'p', texto: 'A maioria das hortaliças precisa de pelo menos 4 a 6 horas de sol direto por dia. Observe o local onde pretende plantar e veja como o sol se move. Plantas de folhas (alface, rúcula) toleram um pouco menos de sol, enquanto plantas de frutos (tomate, pimentão) exigem sol pleno.' },
      { tipo: 'h2', texto: '3. Rega' },
      { tipo: 'p', texto: 'A rega deve ser consistente. O solo deve estar sempre húmido, mas nunca encharcado. Toque o solo com o dedo: se os primeiros 2-3 cm estiverem secos, é hora de regar. Regue no início da manhã ou no final da tarde para evitar a evaporação rápida.' },
    ]
  },
  'compostagem-caseira': {
    id: 'compostagem-caseira',
    titulo: 'Compostagem Caseira',
    conteudo: [
      { tipo: 'h2', texto: 'O que é Compostagem?' },
      { tipo: 'p', texto: 'É um processo biológico que transforma resíduos orgânicos (restos de frutas, legumes, borra de café) em húmus, um adubo natural riquíssimo.' },
      { tipo: 'h2', texto: 'O que NÃO colocar' },
      { tipo: 'p', texto: 'Evite carnes, laticínios, gorduras, alimentos cozinhados e dejetos de animais de estimação, pois podem atrair pragas e causar mau cheiro.' },
    ]
  },
  'controle-pragas': {
    id: 'controle-pragas',
    titulo: 'Controle Natural de Pragas',
    conteudo: [
      { tipo: 'h2', texto: 'Receita: Calda de Alho' },
      { tipo: 'p', texto: 'Bata no liquidificador 100g de alho, 1 litro de água. Deixe descansar por 24h. Coe e dilua em mais 1 litro de água. Pulverize nas plantas (de preferência ao final da tarde) para combater pulgões e ácaros.' },
    ]
  }
};

const GuiaDetailPage = () => {
  const { id } = useParams();
  const guia = mockGuiasDB[id];

  if (!guia) {
    return (
      <div className="text-center">
        <PageTitle>Guia não encontrado</PageTitle>
        <p className="text-gray-400 mb-6">O guia que você está a procurar não existe.</p>
        <Button as={Link} to="/manutencao" variant="primary">
          Voltar para Guias
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <PageTitle>{guia.titulo}</PageTitle>
      
      <div className="bg-gray-800 p-6 rounded-lg text-gray-300 space-y-4">
        {guia.conteudo.map((item, index) => {
          if (item.tipo === 'h2') {
            return <h2 key={index} className="text-2xl font-semibold text-green-400 mt-4">{item.texto}</h2>;
          }
          return <p key={index}>{item.texto}</p>;
        })}
      </div>

      <div className="text-center mt-8">
        <Button as={Link} to="/manutencao" variant="secondary">
          &larr; Voltar para todos os guias
        </Button>
      </div>
    </div>
  );
};

export default GuiaDetailPage;
