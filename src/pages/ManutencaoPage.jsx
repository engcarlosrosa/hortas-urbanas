import React, { useState, useEffect } from 'react'; // <-- Importar hooks
import { Link } from 'react-router-dom';
import { Card, PageTitle } from '../components/UIKit.jsx';
import { getGuias } from '../services/firestoreService.js'; // <-- Importar do Firestore

// Dados mocados (REMOVIDOS)

const ManutencaoPage = () => {
  // --- NOVOS ESTADOS ---
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVO EFEITO PARA BUSCAR DADOS ---
  useEffect(() => {
    const fetchGuias = async () => {
      try {
        setLoading(true);
        const dados = await getGuias();
        setGuias(dados);
      } catch (error) {
        console.error("Erro ao buscar guias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuias();
  }, []); // Array vazio [] significa que roda 1x
  // --- FIM DA NOVA SEÇÃO ---

  return (
    <div className="w-full max-w-4xl mx-auto">
      <PageTitle>Manutenção de Hortas</PageTitle>
      <p className="text-center text-gray-400 mb-8 -mt-4">
        Guias e tutoriais para ajudar a cuidar da sua horta urbana.
      </p>
      
      <div className="space-y-6">
        {/* --- LÓGICA DE RENDERIZAÇÃO ATUALIZADA --- */}
        {loading && (
          <p className="text-gray-400 text-center">Carregando guias...</p>
        )}
        
        {!loading && guias.length === 0 && (
           <p className="text-gray-400 text-center">Nenhum guia encontrado.</p>
        )}

        {guias.map((guia) => (
          <Link to={`/manutencao/${guia.id}`} key={guia.id} className="block hover:shadow-lg transition-shadow duration-200">
            <Card className="hover:bg-gray-700 transition-colors duration-200">
              {/* Usar os nomes dos campos do Firestore */}
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