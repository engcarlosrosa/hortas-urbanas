import React, { useState, useEffect } from "react";
import { Card, PageTitle, Button, Textarea } from "../components/UIKit.jsx";
// import { getPosts, addPost } from "../services/firestoreService.js";

// Dados mocados (substituir pelo Firestore depois)
const postsMocados = [
  { id: '1', autor: "Carlos E.", texto: "Alguém tem dicas para combater pulgões na couve? Já tentei de tudo!", data: new Date() },
  { id: '2', autor: "Maria S.", texto: "Estou a doar mudas de manjericão! Interessados, favor contactar.", data: new Date() },
];

const ForumPage = () => {
  const [posts, setPosts] = useState(postsMocados);
  const [novoPost, setNovoPost] = useState("");
  const [loading, setLoading] = useState(false);

  // Efeito para carregar os posts do Firestore (será descomentado)
  /*
  useEffect(() => {
    const carregarPosts = async () => {
      setLoading(true);
      const postsDoFirestore = await getPosts();
      setPosts(postsDoFirestore);
      setLoading(false);
    };
    carregarPosts();
  }, []);
  */

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (novoPost.trim() === "") return;

    setLoading(true);
    try {
      const postParaEnviar = {
        // O 'autor' virá do Firebase Auth (ex: auth.currentUser.displayName)
        autor: "Utilizador Anónimo", 
        texto: novoPost,
        data: new Date(),
      };
      
      // const postId = await addPost(postParaEnviar);
      // setPosts([{ ...postParaEnviar, id: postId }, ...posts]); // Adiciona o novo post localmente
      
      setNovoPost("");
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <PageTitle>Fórum da Comunidade</PageTitle>

      {/* Formulário para Novo Post */}
      <Card>
        <form onSubmit={handleSubmitPost} className="space-y-4">
          <Textarea
            placeholder="Escreva a sua dúvida ou partilhe uma dica..."
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
            rows={3}
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Publicando..." : "Publicar no Fórum"}
          </Button>
        </form>
      </Card>

      {/* Lista de Posts */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white">Últimas Publicações</h3>
        {loading && posts.length === 0 && <p className="text-gray-400">A carregar posts...</p>}
        
        {posts.map((post) => (
          <Card key={post.id}>
            <p className="text-gray-300 mb-2">{post.texto}</p>
            <small className="text-gray-500">
              Por: {post.autor} - {new Date(post.data).toLocaleString()}
            </small>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
