import React, { useState } from 'react';
import { Card, Input, Button, PageTitle, Textarea } from '../components/UIKit.jsx';
import { cadastrarNovaPlanta } from '../services/firestoreService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const CadastrarPlantaPage = () => {
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
    epoca: '',              // Campo que já existe Firestore
    imageUrl: ''            // Para as fotos aparecerem
  });

  // Bloqueio de segurança na renderização
  if (currentUser?.role !== 'biologicas' && currentUser?.role !== 'admin') {
    return <div className="p-10 text-center">Acesso restrito a especialistas de Biológicas.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cadastrarNovaPlanta(formData, currentUser.uid);
      alert("Planta cadastrada com sucesso!");
      navigate('/plantas'); // Volta para a listagem
    } catch (error) {
      console.error("Erro ao salvar planta:", error);
      alert("Erro ao cadastrar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <PageTitle>Cadastrar Nova Espécie</PageTitle>
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
            {loading ? "Salvando..." : "Publicar Planta"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CadastrarPlantaPage;