import React from "react";
// Importa NavLink para estilizar links ativos no Header
import { Link, NavLink } from "react-router-dom";

/**
 * Componente de Navegação Interno
 * Usa NavLink para aplicar estilos automaticamente se a rota estiver ativa.
 */
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-green-600 text-white" // Estilo para link ativo
          : "text-gray-300 hover:bg-gray-700 hover:text-white" // Estilo para link inativo
      }`
    }
  >
    {children}
  </NavLink>
);

// --- Componentes Principais do Layout ---

/**
 * Header (Cabeçalho)
 * Contém a navegação principal da aplicação.
 */
export const Header = () => (
  <header className="bg-gray-800 shadow-md sticky top-0 z-50">
    <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-white">
            Hortas Urbanas
          </Link>
        </div>
        
        {/* Links de Navegação (Desktop) */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/mapa">Mapa</NavItem>
            <NavItem to="/forum">Fórum</NavItem>
            <NavItem to="/agenda">Agenda</NavItem>
            <NavItem to="/reportar">Reportar Terreno</NavItem>
            <NavItem to="/apoie">Apoie uma Horta</NavItem>
          </div>
        </div>
        
        {/* Botão de Login (Desktop) */}
        <div className="hidden md:block">
          <Button as={Link} to="/login" variant="primary">
            Login
          </Button>
        </div>
        
        {/* TODO: Adicionar menu "hambúrguer" para mobile */}

      </div>
    </nav>
  </header>
);

/**
 * Footer (Rodapé)
 * Fixo na parte inferior da página.
 */
export const Footer = () => (
  <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-8 shadow-inner">
    © 2025 Hortas Urbanas. Projeto Acadêmico.
  </footer>
);

// --- Componentes de UI Reutilizáveis ---

/**
 * Card
 * Um contentor genérico com sombra e cantos arredondados.
 */
export const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

/**
 * PageTitle
 * Um H1 estilizado para títulos de página.
 */
export const PageTitle = ({ children }) => (
  <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
    {children}
  </h1>
);

/**
 * Button
 * Botão customizável com variantes de estilo.
 * Aceita a prop 'as' para se transformar num Link (ex: as={Link}).
 */
export const Button = ({ as: Component = "button", children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    ghost: "bg-transparent text-green-400 hover:bg-gray-700",
  };

  return (
    <Component className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

/**
 * Input
 * Campo de texto padrão para formulários.
 */
export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// --- NOVOS COMPONENTES (Para Semana 2) ---

/**
 * Textarea (NOVO)
 * Campo de texto de múltiplas linhas para descrições.
 */
export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

/**
 * FileInput (NOVO)
 * Campo estilizado para upload de ficheiros.
 */
export const FileInput = ({ className = "", onChange, disabled }) => (
  <input
    type="file"
    onChange={onChange}
    disabled={disabled}
    accept="image/png, image/jpeg, image/webp" // Aceita apenas imagens
    className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-50 ${className}`}
  />
);

