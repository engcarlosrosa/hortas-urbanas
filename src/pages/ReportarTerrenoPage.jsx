import React, { useState } from "react";
import { Card, Input, Button, Textarea, FileInput, PageTitle } from "../components/UIKit.jsx";
// --- NOVAS IMPORTAÇÕES ---
import { useAuth } from "../context/AuthContext.jsx";
import { criarRelatorioTerreno } from "../services/firestoreService.js";
import { uploadImage } from "../services/storageService.js";
// --- FIM DAS NOVAS IMPORTAÇÕES ---

const ReportarTerrenoPage = () => {
  const { currentUser } = useAuth(); // Pega o usuário logado
  
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [imagem, setImagem] = useState(null); // Vai guardar o ARQUIVO
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState(""); // Estado de erro separado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setError("");

    // 1. Validações
    if (!currentUser) {
      setError("Você precisa estar logado para reportar um terreno.");
      return;
    }
    if (!titulo || !descricao || !endereco || !imagem) {
      setError("Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }

    setLoading(true);
    setMensagem("Enviando...");

    try {
      // 2. Fazer o upload da imagem para o Storage
      setMensagem("A fazer upload da imagem...");
      const imageUrl = await uploadImage(imagem, 'terrenos'); // Salva na pasta 'terrenos'

      // 3. Criar o objeto do relatório
      const relatorio = {
        titulo,
        descricao,
        endereco,
        imageUrl, // A URL que o Storage nos deu
      };

      // 4. Enviar o relatório para o Firestore
      setMensagem("A salvar o relatório...");
      await criarRelatorioTerreno(currentUser.uid, relatorio);

      // 5. Limpar o formulário e dar feedback
      setMensagem("Relatório enviado com sucesso! Obrigado por contribuir.");
      setTitulo("");
      setDescricao("");
      setEndereco("");
      setImagem(null);
      e.target.reset(); // Limpa o input de ficheiro

    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      setError("Erro ao enviar o seu relatório. Tente novamente.");
      setMensagem(""); // Limpa a mensagem de "Enviando..."
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagem(e.target.files[0]);
      setError(""); // Limpa o erro se o usuário corrigir
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

      {/* Mensagens de Feedback */}
      {mensagem && (
        <p className="mt-4 text-center text-green-400">
          {mensagem}
        </p>
      )}
      {error && (
         <p className="mt-4 text-center text-red-400">
          {error}
        </p>
      )}
    </Card>
  );
};

export default ReportarTerrenoPage;