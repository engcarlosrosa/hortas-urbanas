import React from 'react';
import { Card, Input, Button } from '../components/UIKit.jsx'; // <--- CORREÇÃO AQUI
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">Criar Nova Conta</h2>
          <Input label="Nome Completo" type="text" placeholder="Insira o seu nome" />
          <Input label="Email" type="email" placeholder="seu.email@exemplo.com" />
          <Input label="Palavra-passe" type="password" placeholder="Crie uma palavra-passe forte" />
          <Button variant="primary" className="w-full">Criar Conta</Button>
          <div className="text-center text-sm text-gray-400">
            <p>Já tem uma conta? <Link to="/login" className="font-medium text-green-500 hover:underline">Faça o login.</Link></p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;

