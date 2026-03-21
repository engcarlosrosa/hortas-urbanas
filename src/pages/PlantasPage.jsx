import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, PageTitle } from '../components/UIKit.jsx';
import { getPlantas, excluirPlanta } from '../services/firestoreService.js';
import { useAuth } from '../context/AuthContext.jsx';

const PlantasPage = () => {
  // --- 1. HOOKS E ESTADOS ---
  const { currentUser } = useAuth(); // Agora dentro do componente
  const navigate = useNavigate();
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. BUSCA DE DADOS ---
  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        setLoading(true);
        const dados = await getPlantas();
        setPlantas(dados);
      } catch (error) {
        console.error("Erro ao buscar plantas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlantas();
  }, []);

  // --- 3. AÇÕES DO CRUD ---
  const handleExcluir = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a planta "${nome}"?`)) {
      try {
        await excluirPlanta(id); // Função importada do service
        setPlantas(plantas.filter(p => p.id !== id)); // Atualiza a lista na tela
      } catch (error) {
        alert("Erro ao excluir planta.");
      }
    }
  };

  // --- 4. LÓGICA DE AGRUPAMENTO ---
  const plantasPorCategoria = plantas.reduce((acc, planta) => {
    const categoria = planta.categoria || 'Outros'; 
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(planta);
    return acc;
  }, {});

  const categoriasOrdenadas = Object.keys(plantasPorCategoria).sort();

  return (
    <div className="max-w-7xl mx-auto">
      {/* CABEÇALHO COM BOTÃO DE CADASTRO CONDICIONAL */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <PageTitle>Tipos de Plantas</PageTitle>
          <p className="text-gray-400 -mt-4">
            Explore as espécies e aprenda como cultivar.
          </p>
        </div>

        {(currentUser?.role === 'admin' || currentUser?.role === 'biologicas') && (
          <Button as={Link} to="/plantas/novo" variant="primary" className="shadow-green-900/20 shadow-lg">
            + Cadastrar Nova Espécie
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-green-500 animate-pulse font-medium">Carregando catálogo...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categoriasOrdenadas.length === 0 && (
            <p className="text-center text-gray-500 py-10">Nenhuma planta encontrada no banco de dados.</p>
          )}

          {categoriasOrdenadas.map((categoriaNome) => (
            <section key={categoriaNome}>
              <h2 className="text-2xl font-bold text-green-400 mb-6 border-l-4 border-green-600 pl-4 bg-gray-800/30 py-2">
                {categoriaNome}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {plantasPorCategoria[categoriaNome].map((planta) => (
                  <div key={planta.id} className="relative group">
                    <Link to={`/plantas/${planta.id}`}>
                      <Card className="p-0 overflow-hidden hover:ring-2 hover:ring-green-500 transition-all duration-300 h-full flex flex-col bg-gray-800/50">
                        <img 
                          src={planta.imageUrl || 'https://via.placeholder.com/400x300?text=Sem+Foto'} 
                          alt={planta.nome}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex-grow">
                          <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                            {planta.nome}
                          </h3>
                          {planta.nomeCientifico && (
                            <p className="text-xs text-gray-400 italic mt-1">{planta.nomeCientifico}</p>
                          )}
                        </div>
                      </Card>
                    </Link>

                    {/* BOTÕES DE GESTÃO (CRUD) - Visíveis apenas para quem tem permissão */}
                    {(currentUser?.role === 'admin' || currentUser?.role === 'biologicas') && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <Button 
                          onClick={() => navigate(`/plantas/editar/${planta.id}`)} 
                          variant="secondary" 
                          className="bg-blue-600/90 hover:bg-blue-500 py-1 px-2 text-xs backdrop-blur-sm"
                        >
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleExcluir(planta.id, planta.nome)} 
                          variant="secondary" 
                          className="bg-red-600/90 hover:bg-red-500 py-1 px-2 text-xs backdrop-blur-sm"
                        >
                          Excluir
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantasPage;