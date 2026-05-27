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
    categoria: '', 
    descricao: '',
    cuidados: '',           
    sol: '',
    rega: '',
    pesoMedio: '', 
    co2Evitado: '', 
    beneficio: '',  
    epoca: '',              
    imageUrl: '' // Mantido como string para receber a URL colada            
  });

  // Bloqueio de segurança na renderização
  if (currentUser?.role !== 'biologicas' && currentUser?.role !== 'admin') {
    return <div className="p-10 text-center">Acesso restrito a especialistas de Biológicas.</div>;
  }

  // useEffect para carregar os dados se for uma edição
  useEffect(() => {
    if (id) {
      const carregarDados = async () => {
        try {
          const planta = await getPlantaById(id); 
          if (planta) {
            setFormData(planta);
          }
        } catch (error) {
          console.error("Erro ao carregar dados da planta para edição:", error);
        }
      };
      carregarDados();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // HIGIENIZAÇÃO DOS DADOS: Força strings numéricas virarem Numbers
      const dadosParaSalvar = {
        ...formData,
        pesoMedio: formData.pesoMedio ? Number(formData.pesoMedio) : 0,
        co2Evitado: formData.co2Evitado ? Number(formData.co2Evitado) : 0
      };

      // Proteção: Remove a propriedade interna 'id' caso ela tenha vindo do Firestore
      if (dadosParaSalvar.id) {
        delete dadosParaSalvar.id;
      }

      if (id) {
        // Modo Edição
        await atualizarPlanta(id, dadosParaSalvar); 
        alert("Espécie atualizada com sucesso!");
      } else {
        // Modo Cadastro
        await cadastrarNovaPlanta(dadosParaSalvar, currentUser.uid); 
        alert("Nova espécie publicada com sucesso!");
      }
      
      navigate('/plantas'); 
    } catch (error) {
      console.error("Erro crítico ao salvar dados no Firestore:", error);
      alert("Ocorreu um erro ao salvar as alterações. Verifique os campos de número.");
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
            placeholder="Nome Popular (ex: Boldo, Alecrim)" 
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required 
          />
          <Input 
            placeholder="Nome Científico" 
            value={formData.nomeCientifico}
            onChange={(e) => setFormData({...formData, nomeCientifico: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 ml-1">Peso Médio (kg)</label>
              <Input 
                type="number"
                step="0.001"
                placeholder="Ex: 0.03" 
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

          {/* NOVO CAMPO: Input de texto para colar a URL da Imagem */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">URL da Imagem da Planta (Pexels, Unsplash, etc.)</label>
            <Input 
              type="text"
              placeholder="Cole aqui o link direto da imagem (https://images.pexels.com/...)" 
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          {/* VISUALIZAÇÃO EM TEMPO REAL: Se houver uma URL válida colada, exibe o preview na hora */}
          {formData.imageUrl && (
            <div className="text-center p-2 border border-gray-800 rounded bg-gray-900/50">
              <p className="text-xs text-gray-400 mb-2">Visualização da Imagem:</p>
              <img 
                src={formData.imageUrl} 
                alt="Preview" 
                className="w-32 h-32 object-cover mx-auto rounded-lg shadow-md border border-gray-700"
                onError={(e) => { e.target.style.display = 'none'; }} // Esconde se o link estiver quebrado
              />
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Salvando no Firestore..." : id ? "Confirmar Alterações" : "Publicar Nova Espécie"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CadastrarPlantaPage;