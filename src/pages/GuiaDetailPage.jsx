import React, { useState, useEffect } from 'react'; // <-- Importar hooks
import { useParams, Link } from 'react-router-dom';
import { PageTitle, Button } from '../components/UIKit.jsx';
import { getGuiaById } from '../services/firestoreService.js'; // <-- Importar do Firestore

// Dados mocados (REMOVIDOS)

const GuiaDetailPage = () => {
  const { id } = useParams();
  
  // --- NOVOS ESTADOS ---
  const [guia, setGuia] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- NOVO EFEITO PARA BUSCAR DADOS ---
  useEffect(() => {
    const fetchGuia = async () => {
      try {
        setLoading(true);
        const dados = await getGuiaById(id);
        setGuia(dados);
      } catch (error) {
        console.error("Erro ao buscar guia:", error);
        // Poderíamos tratar o erro (ex: setErro(true))
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGuia();
    }
  }, [id]); // Roda sempre que o 'id' da URL mudar
  // --- FIM DA NOVA SEÇÃO ---

  // --- LÓGICA DE RENDERIZAÇÃO ATUALIZADA ---

  // Mostra "Carregando..."
  if (loading) {
    return (
      <div className="text-center">
        <PageTitle>Carregando Guia...</PageTitle>
        <p className="text-gray-400 mb-6">A buscar informações...</p>
      </div>
    );
  }

  // Se terminou de carregar e o guia não foi encontrado
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

  // Se foi encontrado, renderiza o guia
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