// Em: src/pages/PlantasPage.jsx

import React, { useState, useEffect } from 'react'; // <-- Importar hooks
import { Link } from 'react-router-dom';
import { Card, PageTitle } from '../components/UIKit.jsx';
import { getPlantas } from '../services/firestoreService.js'; // <-- Importar do Firestore

// Dados mocados (REMOVIDOS)

const PlantasPage = () => {
  // --- NOVOS ESTADOS ---
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVO EFEITO PARA BUSCAR DADOS ---
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

  // --- LÓGICA DINÂMICA DE AGRUPAMENTO ---
  // 1. Agrupa as plantas por categoria
  const plantasPorCategoria = plantas.reduce((acc, planta) => {
    const categoria = planta.categoria || 'Outros'; // Pega a categoria
    if (!acc[categoria]) {
      acc[categoria] = []; // Cria o array se não existir
    }
    acc[categoria].push(planta);
    return acc;
  }, {});

  // 2. Obtém os nomes das categorias ordenados
  const categoriasOrdenadas = Object.keys(plantasPorCategoria).sort();
  // --- FIM DA NOVA SEÇÃO DE LÓGICA ---

  return (
    <div>
      <PageTitle>Tipos de Plantas</PageTitle>
      <p className="text-center text-gray-400 mb-8 -mt-4">
        Explore as frutas, legumes, hortaliças e temperos que você pode cultivar.
      </p>

      {/* --- RENDERIZAÇÃO ATUALIZADA --- */}
      {loading && (
        <p className="text-gray-400 text-center">Carregando plantas...</p>
      )}

      {!loading && plantas.length === 0 && (
         <p className="text-gray-400 text-center">Nenhuma planta cadastrada.</p>
      )}

      <div className="space-y-12">
        {/* Itera sobre as CATEGORIAS encontradas */}
        {categoriasOrdenadas.map((categoriaNome) => (
          <section key={categoriaNome}>
            {/* Subtítulo da Categoria */}
            <h2 className="text-3xl font-bold text-green-400 mb-6 border-b-2 border-green-700 pb-2">
              {categoriaNome}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Itera sobre as plantas DESSA categoria */}
              {plantasPorCategoria[categoriaNome].map((planta) => (
                <Link to={`/plantas/${planta.id}`} key={planta.id}>
                  <Card className="p-0 overflow-hidden hover:bg-gray-700 transition-colors duration-200 h-full flex flex-col">
                    <img 
                      src={planta.imageUrl} 
                      alt={planta.nome}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-bold text-white">{planta.nome}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PlantasPage;