import React, { useState } from "react";
import { Card, Input, Button, Textarea, FileInput, PageTitle } from "../components/UIKit.jsx";
// Importaremos os serviços quando estiverem prontos
// import { submitReport } from "../services/firestoreService.js";
// import { uploadImage } from "../services/storageService.js";

const ReportarTerrenoPage = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !endereco || !imagem) {
      setMensagem("Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }
    setLoading(true);
    setMensagem("Enviando...");

    try {
      // 1. Fazer o upload da imagem para o Storage
      // const imageUrl = await uploadImage(imagem);

      // 2. Criar o objeto do relatório
      const relatorio = {
        titulo,
        descricao,
        endereco,
        // imageUrl,
        status: 'pendente',
        criadoEm: new Date(),
      };

      // 3. Enviar o relatório para o Firestore
      // await submitReport(relatorio);

      // 4. Limpar o formulário e dar feedback
      setMensagem("Relatório enviado com sucesso! Obrigado por contribuir.");
      setTitulo("");
      setDescricao("");
      setEndereco("");
      setImagem(null);
      // Limpar o input de ficheiro (isto é complexo, pode ser feito com uma 'key')
      e.target.reset(); 

    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      setMensagem("Erro ao enviar o seu relatório. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  return (
    <Card>
      <PageTitle>Reportar Terreno Baldio</PageTitle>
      <p className="text-gray-400 mb-6 text-center">
        Encontrou um terreno que poderia ser uma horta? Envie-nos os detalhes e uma foto.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Título (ex: Terreno na Rua das Flores)"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={loading}
        />
        <Input
          type="text"
          placeholder="Endereço ou Ponto de Referência"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          disabled={loading}
        />
        <Textarea
          placeholder="Descreva o terreno (tamanho aproximado, condições, etc.)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          disabled={loading}
        />
        <FileInput
          onChange={handleImageChange}
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Relatório"}
        </Button>
      </form>

      {mensagem && (
        <p className={`mt-4 text-center ${mensagem.includes("sucesso") ? "text-green-400" : "text-red-400"}`}>
          {mensagem}
        </p>
      )}
    </Card>
  );
};

export default ReportarTerrenoPage;
