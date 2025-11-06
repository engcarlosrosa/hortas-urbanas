import React from 'react';
import { Card, Input, Button } from '../components/UIKit.jsx'; // <--- CORREÇÃO AQUI
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">Aceder à sua Conta</h2>
          <Input label="Email" type="email" placeholder="seu.email@exemplo.com" />
          <Input label="Palavra-passe" type="password" placeholder="••••••••" />
          <Button variant="primary" className="w-full">Entrar</Button>
          <div className="text-center text-sm text-gray-400">
            <p>Ainda não tem uma conta? <Link to="/cadastro" className="font-medium text-green-500 hover:underline">Registe-se aqui.</Link></p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

