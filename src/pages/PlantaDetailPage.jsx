// Em: src/pages/PlantaDetailPage.jsx

import React, { useState, useEffect } from 'react'; // <-- Importar hooks
import { useParams, Link } from 'react-router-dom';
import { PageTitle, Button } from '../components/UIKit.jsx';
import { getPlantaById } from '../services/firestoreService.js'; // <-- Importar do Firestore

// Dados mocados (REMOVIDOS)

const PlantaDetailPage = () => {
  const { id } = useParams();
  
  // --- NOVOS ESTADOS ---
  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- NOVO EFEITO PARA BUSCAR DADOS ---
  useEffect(() => {
    const fetchPlanta = async () => {
      try {
        setLoading(true);
        const dados = await getPlantaById(id);
        setPlanta(dados);
      } catch (error) {
        console.error("Erro ao buscar planta:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlanta();
    }
  }, [id]); // Roda sempre que o 'id' da URL mudar
  // --- FIM DA NOVA SEÇÃO ---

  // --- LÓGICA DE RENDERIZAÇÃO ATUALIZADA ---

  if (loading) {
    return (
      <div className="text-center">
        <PageTitle>Carregando Planta...</PageTitle>
        <p className="text-gray-400 mb-6">A buscar informações...</p>
      </div>
    );
  }

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

  // Se foi encontrado, renderiza a planta
  return (
    <div className="w-full max-w-4xl mx-auto">
      <PageTitle>{planta.nome}</PageTitle>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img 
          src={planta.imageUrl} 
          alt={planta.nome}
          className="w-full h-64 md:h-80 object-cover"
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