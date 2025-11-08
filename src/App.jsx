import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout e UI
import { Header, Footer } from "./components/UIKit.jsx";

// Páginas Principais (Semana 1)
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MapPage from "./pages/MapPage.jsx"; // <-- Rota do Abel

// Páginas (Semana 2 - Formulários e Comunidade)
import ReportarTerrenoPage from "./pages/ReportarTerrenoPage.jsx";
import ApoieUmaHortaPage from "./pages/ApoieUmaHortaPage.jsx";
import AgendaPage from "./pages/AgendaPage.jsx";
import ForumPage from "./pages/ForumPage.jsx";

// Páginas (Semana 2 - Conteúdo e Guias)
import ManutencaoPage from './pages/ManutencaoPage.jsx';
import GuiaDetailPage from './pages/GuiaDetailPage.jsx';
import PlantasPage from './pages/PlantasPage.jsx';
import PlantaDetailPage from './pages/PlantaDetailPage.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* Estrutura de layout principal */}
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />

        {/* O conteúdo principal da página é renderizado aqui */}
        <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Rotas da Semana 1 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/mapa" element={<MapPage />} /> {/* <-- Rota do Abel INCLUÍDA */}

            {/* Rotas da Semana 2 (Formulários e Comunidade) */}
            <Route path="/reportar" element={<ReportarTerrenoPage />} />
            <Route path="/apoie" element={<ApoieUmaHortaPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/forum" element={<ForumPage />} />
            
            {/* Rotas de Conteúdo e Guias (Suas rotas INCLUÍDAS) */}
            <Route path="/manutencao" element={<ManutencaoPage />} />
            <Route path="/manutencao/:id" element={<GuiaDetailPage />} />
            <Route path="/plantas" element={<PlantasPage />} />
            <Route path="/plantas/:id" element={<PlantaDetailPage />} />
            
            {/* TODO: Adicionar uma página 404 (NotFoundPage) */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;