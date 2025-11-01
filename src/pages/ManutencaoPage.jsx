import React from 'react';
import { Link } from 'react-router-dom';
import { Card, PageTitle } from '../components/UIKit.jsx';

// Dados mocados (substituir pelo Firestore depois)
const mockGuias = [
  {
    id: 'principios-basicos',
    titulo: 'Princípios Básicos de Cultivo',
    descricaoCurta: 'Aprenda sobre solo, iluminação e rega para começar sua horta com o pé direito.',
  },
  {
    id: 'compostagem-caseira',
    titulo: 'Compostagem Caseira',
    descricaoCurta: 'Descubra como transformar seus resíduos orgânicos em adubo rico para suas plantas.',
  },
  {
    id: 'controle-pragas',
    titulo: 'Controle Natural de Pragas',
    descricaoCurta: 'Mantenha sua horta saudável sem usar químicos, usando receitas caseiras e defensivos naturais.',
  },
];

const ManutencaoPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <PageTitle>Manutenção de Hortas</PageTitle>
      <p className="text-center text-gray-400 mb-8 -mt-4">
        Guias e tutoriais para ajudar a cuidar da sua horta urbana.
      </p>
      
      <div className="space-y-6">
        {mockGuias.map((guia) => (
          <Link to={`/manutencao/${guia.id}`} key={guia.id} className="block hover:shadow-lg transition-shadow duration-200">
            <Card className="hover:bg-gray-700 transition-colors duration-200">
              <h3 className="text-xl font-bold text-green-400 mb-2">{guia.titulo}</h3>
              <p className="text-gray-300">{guia.descricaoCurta}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManutencaoPage;
