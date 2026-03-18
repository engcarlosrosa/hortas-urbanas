import React, { useState } from "react";
import { Card, Input, Button, Textarea, PageTitle } from "../components/UIKit.jsx";
// --- NOSSAS IMPORTAÇÕES ---
import { useAuth } from "../context/AuthContext.jsx";
import { enviarVoluntariado } from "../services/firestoreService.js";

const ApoieUmaHortaPage = () => {
  const { currentUser } = useAuth(); // Pega o usuário logado

  // Estados do Formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState(""); // Mudei para 'motivo' para bater com o service
  
  const [loading, setLoading] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Mensagem de sucesso
  const [mensagemErro, setMensagemErro] = useState(""); // Mensagem de erro

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemSucesso("");
    setMensagemErro("");

    // 1. Validações
    if (!currentUser) {
      setMensagemErro("Você precisa estar logado para se voluntariar.");
      return;
    }
    if (!nome || !email || !motivo) {
      setMensagemErro("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // 2. Criar o objeto de dados
      const dadosVoluntario = {
        nome,
        email,
        motivo, // Nome da variável local
      };

      // 3. Enviar para o Firestore
      await enviarVoluntariado(currentUser.uid, dadosVoluntario);

      // 4. Limpar o formulário e dar feedback
      setMensagemSucesso("Recebemos seu pedido! Entraremos em contato em breve. Obrigado!");
      setNome("");
      setEmail("");
      setMotivo("");
      // e.target.reset(); // Limpar o formulário assim também funciona

    } catch (error) {
      console.error("Erro ao enviar voluntariado:", error);
      setMensagemErro("Erro ao enviar seu pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <PageTitle>Apoie uma Horta</PageTitle>
      <p className="text-gray-400 mb-6 text-center">
        Quer ser voluntário? Preencha o formulário abaixo e entraremos em contacto.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="O seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
        />
        <Input
          type="email"
          placeholder="O seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.g.etvalue)}
          disabled={loading}
        />
        <Textarea
          placeholder="Porque quer ser voluntário? (disponibilidade, interesses, etc.)"
          value={motivo} // Mudei aqui
          onChange={(e) => setMotivo(e.target.value)} // Mudei aqui
          rows={4}
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Quero ser Voluntário"}
        </Button>
      </form>

      {/* Mensagens de Feedback Separadas */}
      {mensagemSucesso && (
        <p className="mt-4 text-center text-green-400">
          {mensagemSucesso}
        </p>
      )}
      {mensagemErro && (
        <p className="mt-4 text-center text-red-400">
          {mensagemErro}
        </p>
      )}
    </Card>
  );
};

export default ApoieUmaHortaPage;