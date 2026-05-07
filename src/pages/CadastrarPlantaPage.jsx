import React, { useState, useEffect } from 'react';
import { Card, Input, Button, PageTitle, Textarea } from '../components/UIKit.jsx';
import { cadastrarNovaPlanta, 
  atualizarPlanta, 
  getPlantaById } from '../services/firestoreService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const CadastrarPlantaPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    nomeCientifico: '',
    categoria: '', // Campo que já existe Firestore
    descricao: '',
    cuidados: '',           // Campo que já existe Firestore
    sol: '',
    rega: '',
    pesoMedio: '', // Novo campo da pesquisa Bio
    co2Evitado: '', // Novo campo da pesquisa Bio
    beneficio: '',  
    epoca: '',              // Campo que já existe Firestore
    imageUrl: ''            // Para as fotos aparecerem
  });

  // Bloqueio de segurança na renderização
  if (currentUser?.role !== 'biologicas' && currentUser?.role !== 'admin') {
    return <div className="p-10 text-center">Acesso restrito a especialistas de Biológicas.</div>;
  }

  // useEffect para carregar os dados se for uma edição
  useEffect(() => {
    if (id) {
      const carregarDados = async () => {
        const planta = await getPlantaById(id); // Função que já temos no service
        setFormData(planta);
      };
      carregarDados();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Se existir um ID na URL, chamamos a função de atualizar
      if (id) {
        await atualizarPlanta(id, formData); //
        alert("Dados atualizados com sucesso!");
      } 
      // Se NÃO existir ID, seguimos com o cadastro novo
      else {
        await cadastrarNovaPlanta(formData, currentUser.uid); //
        alert("Planta cadastrada com sucesso!");
      }
      
      navigate('/plantas'); // Volta para a listagem
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar os dados. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <PageTitle>{id ? 'Editar Espécie' : 'Cadastrar Nova Espécie'}</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="Nome Popular (ex: Alecrim)" 
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required 
          />
          <Input 
            placeholder="Nome Científico" 
            value={formData.nomeCientifico}
            onChange={(e) => setFormData({...formData, nomeCientifico: e.target.value})}
          />
          {/* Campos Técnicos da Gabrielly */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 ml-1">Peso Médio (kg)</label>
              <Input 
                type="number"
                step="0.01"
                placeholder="Ex: 1.50" 
                value={formData.pesoMedio}
                onChange={(e) => setFormData({...formData, pesoMedio: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 ml-1">CO₂ Evitado (g)</label>
              <Input 
                type="number"
                placeholder="Ex: 1200" 
                value={formData.co2Evitado}
                onChange={(e) => setFormData({...formData, co2Evitado: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Seleção de Categoria para Organização Automática */}
          <select 
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            required
          >
            <option value="">Selecione a Categoria</option>
            <option value="Fruta">Fruta</option>
            <option value="Legume">Legume</option>
            <option value="Hortaliça">Hortaliça</option>
            <option value="Tempero">Tempero</option>
            <option value="PANC">PANC</option>
            <option value="Erva Medicinal">Erva Medicinal</option>
          </select>

          <Textarea 
            placeholder="Dicas de Cultivo e Curiosidades" 
            rows="4"
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Exposição ao Sol" 
              value={formData.sol}
              onChange={(e) => setFormData({...formData, sol: e.target.value})}
            />
            <Input 
              placeholder="Frequência de Rega" 
              value={formData.rega}
              onChange={(e) => setFormData({...formData, rega: e.target.value})}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : id ? "Salvar Alterações" : "Publicar Planta"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CadastrarPlantaPage;