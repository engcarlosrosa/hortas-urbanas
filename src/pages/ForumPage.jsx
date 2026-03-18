import React, { useState, useEffect } from "react";
import { Card, PageTitle, Button, Textarea } from "../components/UIKit.jsx";
import { useAuth } from "../context/AuthContext.jsx"; 
// 1. Importar o 'deletePost'
import { criarPost, getPostsSnapshot, deletePost } from "../services/firestoreService.js";

const ForumPage = () => {
  const { currentUser } = useAuth(); 
  
  const [posts, setPosts] = useState([]); 
  const [novoPost, setNovoPost] = useState("");
  const [loading, setLoading] = useState(false); 
  const [loadingPosts, setLoadingPosts] = useState(true); 
  const [error, setError] = useState(null);

  // Efeito para carregar os posts (sem mudanças)
  useEffect(() => {
    setLoadingPosts(true);
    const unsubscribe = getPostsSnapshot((novosPosts) => {
      setPosts(novosPosts); 
      setLoadingPosts(false);
    });
    return () => unsubscribe();
  }, []); 

  // Função de criar post (sem mudanças)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (novoPost.trim() === "") {
      setError("Escreva algo antes de publicar.");
      return;
    }
    if (!currentUser) {
      setError("Você precisa estar logado para publicar.");
      return;
    }
    setLoading(true); 
    try {
      await criarPost(currentUser.uid, currentUser.email, novoPost);
      setNovoPost(''); 
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setError("Não foi possível publicar o seu post. Tente novamente.");
    } finally {
      setLoading(false); 
    }
  };

  // --- 2. NOVA FUNÇÃO DE DELETE ---
  const handleDelete = async (postId) => {
    // Confirmação (opcional, mas recomendado)
    if (!window.confirm("Tem certeza que quer apagar este post?")) {
      return;
    }

    try {
      await deletePost(postId);
      // O post vai sumir automaticamente por causa do 'onSnapshot'
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      setError("Não foi possível apagar o post. Tente novamente.");
    }
  };
  // --- FIM DA NOVA FUNÇÃO ---

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <PageTitle>Fórum da Comunidade</PageTitle>

      {/* Formulário para Novo Post (sem mudanças) */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Escreva a sua dúvida ou partilhe uma dica..."
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
            rows={3}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Publicando..." : "Publicar no Fórum"}
          </Button>
        </form>
      </Card>

      {/* Lista de Posts */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white">Últimas Publicações</h3>
        
        {loadingPosts && <p className="text-gray-400">A carregar publicações...</p>}
        
        {!loadingPosts && posts.length === 0 && (
          <p className="text-gray-400">Nenhuma publicação ainda. Seja o primeiro!</p>
        )}

        {posts.map((post) => (
          // --- 3. ATUALIZAÇÃO NO CARD ---
          <Card key={post.id} className="relative"> {/* Adiciona 'relative' */}
            
            {/* --- BOTÃO DE DELETE --- */}
            {currentUser && currentUser.uid === post.uid && (
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Apagar post"
              >
                {/* Ícone de Lixeira (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.576 0c.342.052.682.107 1.022.166m0 0l-2.24 13.882a2.25 2.25 0 0 0 2.244 2.077H18.084a2.25 2.25 0 0 0 2.244-2.077L19.27 5.79M18.88 5.79l-1.447-.397A1.5 1.5 0 0 0 16.026 4H7.974a1.5 1.5 0 0 0-1.407 1.393L5.12 5.79m13.76 0-1.447-.397m-12.576 0l-1.447-.397" />
                </svg>
              </button>
            )}
            {/* --- FIM DO BOTÃO --- */}

            <p className="text-gray-300 mb-2 pr-6">{/* Adiciona 'pr-6' (padding) */}
              {post.texto}
            </p>
            <small className="text-gray-500">
              Por: {post.autorEmail} - 
              {post.criadoEm ? post.criadoEm.toDate().toLocaleString('pt-BR') : '...'}
            </small>
          </Card>
          // --- FIM DA ATUALIZAÇÃO ---
        ))}
      </div>
    </div>
  );
};

export default ForumPage;