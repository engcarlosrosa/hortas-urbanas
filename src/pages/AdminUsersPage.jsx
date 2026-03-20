import React, { useEffect, useState } from 'react';
import { Card, PageTitle, Button } from '../components/UIKit.jsx';
import { getTodosUsuarios, atualizarStatusUsuario } from '../services/firestoreService.js';
import { useAuth } from '../context/AuthContext.jsx';

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const carregarUsuarios = async () => {
      const lista = await getTodosUsuarios();
      setUsuarios(lista);
    };
    carregarUsuarios();
  }, []);

  const handleAprovar = async (uid) => {
    await atualizarStatusUsuario(uid, 'aprovado');
    // Atualiza a lista localmente
    setUsuarios(usuarios.map(u => u.id === uid ? { ...u, status: 'aprovado' } : u));
  };

  // Segurança: Só renderiza se VOCÊ for o admin
  if (currentUser?.role !== 'admin') {
    return <div className="p-10 text-center">Acesso Negado.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <PageTitle>Gerenciamento de Usuários</PageTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3">Nome</th>
                <th className="py-3">Papel (Role)</th>
                <th className="py-3">Status</th>
                <th className="py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-gray-800">
                  <td className="py-4">{u.nome}</td>
                  <td className="py-4 capitalize">{u.role}</td>
                  <td className="py-4">
                    <span className={u.status === 'pendente' ? 'text-yellow-400' : 'text-green-400'}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4">
                    {u.status === 'pendente' && (
                      <Button variant="primary" onClick={() => handleAprovar(u.id)}>
                        Aprovar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsersPage;