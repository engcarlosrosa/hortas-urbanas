import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, PageTitle } from '../components/UIKit.jsx'; // Mudei aqui para incluir o PageTitle
import { logarUsuario } from '../services/authService.js'; // 1. Importar o serviço

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await logarUsuario(email, password);
      navigate('/'); // 3. Sucesso! Vai para a Home.
    } catch (error) {
      console.error("Erro ao logar:", error);
      setError("E-mail ou senha inválidos."); // 4. Mostra erro
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <PageTitle>Aceder à sua Conta</PageTitle> {/* Mudei aqui para usar o PageTitle */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 2. Ligar o estado
            required
          />
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 2. Ligar o estado
            required
          />
          
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            Entrar
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-6 space-y-2">
          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="font-medium text-green-400 hover:underline">
              Registe-se aqui.
            </Link>
          </p>
          {/* TODO: Ligar a página de Recuperar Senha */}
          <p>
            <Link to="/recuperar-senha" className="hover:underline">
              Esqueceu-se da senha?
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;