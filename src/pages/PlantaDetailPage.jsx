import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlantaById } from '../services/firestoreService.js';
import { Card, PageTitle, Button } from '../components/UIKit.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const PlantaDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanta = async () => {
      try {
        const dados = await getPlantaById(id);
        setPlanta(dados);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanta();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-green-500">Carregando...</div>;
  if (!planta) return <div className="p-10 text-center">Planta não encontrada.</div>;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Cabeçalho de Navegação */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/plantas" className="text-green-500 hover:underline">← Voltar ao Catálogo</Link>
        
        {/* Atalho rápido para edição se for Admin/Bio */}
        {(currentUser?.role === 'admin' || currentUser?.role === 'biologicas') && (
          <Button onClick={() => navigate(`/plantas/editar/${id}`)} variant="secondary" className="text-xs">
            Editar Informações
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA 1: Imagem e Dados Principais */}
        <div className="lg:col-span-1 space-y-6">
          <img src={planta.imageUrl} alt={planta.nome} className="rounded-2xl w-full h-80 object-cover border border-gray-800 shadow-2xl" />
          
          <Card className="bg-gray-800/50 border-green-500/20">
            <h4 className="text-green-400 font-bold text-xs uppercase mb-3 tracking-widest">Identificação</h4>
            <div className="space-y-2">
              <p className="text-white font-bold">{planta.nome}</p>
              <p className="text-gray-400 italic text-sm">{planta.nomeCientifico || 'Nome científico não informado'}</p>
              <span className="inline-block bg-green-900/40 text-green-400 px-2 py-1 rounded text-[10px] font-bold mt-2">
                {planta.categoria}
              </span>
            </div>
          </Card>
        </div>

        {/* COLUNA 2 e 3: Detalhes Técnicos e ESG */}
        <div className="lg:col-span-2 space-y-6">
          <PageTitle>{planta.nome}</PageTitle>
          <p className="text-gray-300 text-lg leading-relaxed">{planta.descricao}</p>

          {/* GRID DE MÉTRICAS ESG (A base do seu projeto) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-green-500">
              <span className="text-[10px] text-gray-400 uppercase">CO₂ Evitado</span>
              <p className="text-2xl font-black text-white">{planta.co2Evitado}g</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-blue-500">
              <span className="text-[10px] text-gray-400 uppercase">Peso Médio</span>
              <p className="text-2xl font-black text-white">{planta.pesoMedio}kg</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-yellow-500">
              <span className="text-[10px] text-gray-400 uppercase">Época</span>
              <p className="text-lg font-bold text-white">{planta.epoca}</p>
            </div>
          </div>

          {/* GUIA DE MANUTENÇÃO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-900/40">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">☀️ Necessidade de Sol</h4>
              <p className="text-gray-400 text-sm">{planta.sol}</p>
            </Card>
            <Card className="bg-gray-900/40">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">💧 Frequência de Rega</h4>
              <p className="text-gray-400 text-sm">{planta.rega}</p>
            </Card>
          </div>

          {/* CUIDADOS ESPECÍFICOS */}
          <div className="bg-green-900/10 p-6 rounded-2xl border border-green-900/30">
            <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-tighter">Dicas de Especialista (Biológicas)</h4>
            <p className="text-gray-300 leading-relaxed italic">"{planta.cuidados}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantaDetailPage;