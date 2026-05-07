import React, { useState } from "react";
import { Card, Input, Button, Textarea, FileInput, PageTitle } from "../components/UIKit.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { criarRelatorioTerreno } from "../services/firestoreService.js";
import { uploadImage } from "../services/storageService.js";
import { useNavigate } from "react-router-dom";

const ReportarTerrenoPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [areaM2, setAreaM2] = useState("");
  const [familias, setFamilias] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return setError("Você precisa estar logado.");
    if (!titulo || !endereco || !imagem) return setError("Preencha os campos obrigatórios.");

    setLoading(true);
    try {
      const urlImagem = await uploadImage(imagem);
      
      const dadosHorta = {
        titulo,
        descricao,
        endereco,
        imageUrl: urlImagem,
        areaM2: Number(areaM2),
        familiasAtendidas: Number(familias),
        status: "pendente",
        criadoEm: new Date(),
        autorUid: currentUser.uid,
        latitude: -23.5505, // O ideal é capturar via GPS ou busca de endereço
        longitude: -46.6333
      };

      await criarRelatorioTerreno(dadosHorta);
      setMensagem("Terreno reportado com sucesso!");
      setTimeout(() => navigate('/mapa'), 2000);
    } catch (err) {
      setError("Erro ao enviar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <PageTitle>Reportar Novo Terreno</PageTitle>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Título" value={titulo} onChange={(e)=>setTitulo(e.target.value)} />
          <Input placeholder="Endereço" value={endereco} onChange={(e)=>setEndereco(e.target.value)} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Área (m²)" value={areaM2} onChange={(e)=>setAreaM2(e.target.value)} />
            <Input type="number" placeholder="Famílias Estimadas" value={familias} onChange={(e)=>setFamilias(e.target.value)} />
          </div>

          <Textarea placeholder="Descrição" value={descricao} onChange={(e)=>setDescricao(e.target.value)} rows={3} />
          <FileInput onChange={(e) => setImagem(e.target.files[0])} />
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Relatório ESG"}
          </Button>
          {mensagem && <p className="text-green-400 text-center">{mensagem}</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ReportarTerrenoPage;