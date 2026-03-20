import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, PageTitle } from '../components/UIKit.jsx';
import { cadastrarUsuario } from '../services/authService.js'; 

const RegisterPage = () => {
  const [nome, setNome] = useState(''); // <-- 1. NOVO ESTADO
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('standard');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    // 2. VALIDAÇÃO DO NOME
    if (nome.trim() === '') {
      setError("Por favor, insira o seu nome.");
      return;
    }

    try {
      // 3. ENVIAR OS 4 DADOS
      await cadastrarUsuario(email, password, nome, role);
      navigate('/'); // Sucesso! Vai para a Home.
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Falha ao criar conta. Verifique o e-mail e a senha (mínimo 6 caracteres)."); 
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <PageTitle>Criar Nova Conta</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- 4. CAMPO DE NOME ATIVADO --- */}
          <Input
            type="text"
            placeholder="O seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          {/* --- FIM DA ATIVAÇÃO --- */}

          <Input
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Crie uma palavra-passe forte"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* --- 5. NOVO CAMPO DE SELEÇÃO DE ROLE --- */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Área de Atuação / Interesse:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
            >
              <option value="standard">Simpatizante (Visualizador)</option>
              <option value="cultivador">Cultivador (Hortelão)</option>
              <option value="biologicas">Especialista: Biológicas</option>
              <option value="negocios">Especialista: Negócios / ESG</option>
              <option value="direito">Especialista: Direito</option>
            </select>
            {role !== 'standard' && (
              <p className="text-xs text-yellow-400 italic">* Perfis de especialista aguardam aprovação do admin.</p>
            )}
          </div>
          
          <Button type="submit" variant="primary" className="w-full">
            Criar Conta
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-green-400 hover:underline">
            Faça o login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;