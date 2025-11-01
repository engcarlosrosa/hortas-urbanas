import React, { useState } from "react";
import { Card, Input, Button, Textarea, PageTitle } from "../components/UIKit.jsx";
// import { submitVolunteering } from "../services/firestoreService.js";

const ApoieUmaHortaPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagemVoluntario, setMensagemVoluntario] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email || !mensagemVoluntario) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    setMensagem("Enviando...");

    try {
      const formulario = {
        nome,
        email,
        mensagem: mensagemVoluntario,
        tipo: 'voluntariado',
        criadoEm: new Date(),
      };

      // await submitVolunteering(formulario);

      setMensagem("Inscrição enviada com sucesso! Entraremos em contacto.");
      setNome("");
      setEmail("");
      setMensagemVoluntario("");
      e.target.reset();

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setMensagem("Erro ao enviar. Tente novamente.");
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
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Textarea
          placeholder="Porque quer ser voluntário? (disponibilidade, interesses, etc.)"
          value={mensagemVoluntario}
          onChange={(e) => setMensagemVoluntario(e.target.value)}
          rows={4}
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Quero ser Voluntário"}
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

export default ApoieUmaHortaPage;
