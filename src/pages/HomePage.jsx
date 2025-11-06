import React from 'react';
import { Card } from '../components/UIKit.jsx'; // <--- CORREÇÃO AQUI

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Bem-vindo ao Hortas Urbanas</h1>
        <p className="text-gray-300">
          Esta é a página inicial. A partir daqui, os utilizadores poderão ver as principais novidades e aceder a todas as funcionalidades da aplicação.
        </p>
      </Card>
    </div>
  );
};

export default HomePage;

