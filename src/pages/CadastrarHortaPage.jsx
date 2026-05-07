import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card, Input, Button, PageTitle } from '../components/UIKit.jsx';

const CadastrarHortaPage = () => {
  const { id } = useParams(); // Pega o ID do terreno vindo do mapa
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [terrenoInfo, setTerrenoInfo] = useState(null);
  
  const [esgData, setEsgData] = useState({
    areaM2: '',
    volColheitaKg: '',
    volCompostagemKg: '',
    tecnicaIrrigacao: '',
    familiasBeneficiadas: '',
    numeroVoluntarios: '',
    economiaCestaBasica: ''
  });

  // Carrega as informações do terreno para conferência
  useEffect(() => {
    const fetchTerreno = async () => {
      if (!id) return;
      const docRef = doc(db, "terrenos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTerrenoInfo(docSnap.data());
      }
    };
    fetchTerreno();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, "terrenos", id);
      // Atualiza o terreno existente com as novas métricas ESG
      await updateDoc(docRef, {
        metrics: esgData,
        status: "ativo", // Muda de pendente para ativo ao receber métricas
        ultimaAtualizacao: serverTimestamp()
      });
      alert("Métricas ESG vinculadas com sucesso!");
      navigate('/mapa');
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) return <div className="p-10 text-center">Por favor, selecione uma horta no mapa primeiro.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <PageTitle>Cadastro de Impacto Social e Ambiental</PageTitle>
      
      {terrenoInfo && (
        <Card className="mb-6 bg-gray-800 border-green-500/30">
          <div className="flex gap-4 items-center">
            <img src={terrenoInfo.imageUrl} alt="Horta" className="w-24 h-24 rounded-lg object-cover" />
            <div>
              <h2 className="text-xl font-bold text-white">{terrenoInfo.titulo}</h2>
              <p className="text-gray-400 text-sm">{terrenoInfo.endereco}</p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Métricas Ambientais (E)">
          <div className="space-y-4">
            <Input label="Área Cultivável (m²)" type="number" required
              onChange={(e) => setEsgData({...esgData, areaM2: e.target.value})} />
            <Input label="Volume de Colheita (kg/mês)" type="number"
              onChange={(e) => setEsgData({...esgData, volColheitaKg: e.target.value})} />
            <Input label="Compostagem (kg/mês)" type="number"
              onChange={(e) => setEsgData({...esgData, volCompostagemKg: e.target.value})} />
            <Input label="Técnica de Irrigação" placeholder="Ex: Gotejamento"
              onChange={(e) => setEsgData({...esgData, tecnicaIrrigacao: e.target.value})} />
          </div>
        </Card>

        <Card title="Impacto Social (S)">
          <div className="space-y-4">
            <Input label="Famílias Beneficiadas" type="number"
              onChange={(e) => setEsgData({...esgData, familiasBeneficiadas: e.target.value})} />
            <Input label="Número de Voluntários" type="number"
              onChange={(e) => setEsgData({...esgData, numeroVoluntarios: e.target.value})} />
            <Input label="Economia Gerada (R$)" type="number"
              onChange={(e) => setEsgData({...esgData, economiaCestaBasica: e.target.value})} />
          </div>
        </Card>

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/mapa')}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Salvando..." : "Finalizar Relatório ESG"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarHortaPage;