import React, { useState } from "react";
// Importa NavLink para estilizar links ativos no Header
import { Link, NavLink } from "react-router-dom";
// IMPORTANTE: Importa o hook de autenticação
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Componente de Navegação Interno (Desktop)
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

/**
 * Componente de Navegação Interno (Mobile)
 * Botões maiores para facilitar o toque.
 */
const MobileNavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick} // Fecha o menu ao clicar
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "bg-green-800 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`
    }
  >
    {children}
  </NavLink>
);

// --- Componentes Principais do Layout ---

/**
 * Header (Cabeçalho)
 * Agora com suporte a Menu Mobile (Hambúrguer).
 */
export const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Hortas Urbanas
            </Link>
          </div>
          
          {/* --- MENU DESKTOP (Escondido em telas pequenas) --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/mapa">Mapa</NavItem>
              <NavItem to="/plantas">Plantas</NavItem>
              <NavItem to="/manutencao">Manutenção</NavItem>
              <NavItem to="/forum">Fórum</NavItem>
              <NavItem to="/agenda">Agenda</NavItem>
              <NavItem to="/reportar">Reportar Terreno</NavItem>
              <NavItem to="/apoie">Apoie uma Horta</NavItem>
            </div>
          </div>
          
          {/* Botão de Login Desktop */}
          <div className="hidden md:block">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">{currentUser.email}</span>
                <Button onClick={logout} variant="secondary">Sair</Button>
              </div>
            ) : (
              <Button as={Link} to="/login" variant="primary">Login</Button>
            )}
          </div>

          {/* --- BOTÃO MENU MOBILE (Hambúrguer) --- */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Ícone do Menu: Muda se estiver aberto ou fechado */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE (Dropdown) --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 pb-4 shadow-xl border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavItem to="/" onClick={toggleMenu}>Home</MobileNavItem>
            <MobileNavItem to="/mapa" onClick={toggleMenu}>Mapa</MobileNavItem>
            <MobileNavItem to="/plantas" onClick={toggleMenu}>Plantas</MobileNavItem>
            <MobileNavItem to="/manutencao" onClick={toggleMenu}>Manutenção</MobileNavItem>
            <MobileNavItem to="/forum" onClick={toggleMenu}>Fórum</MobileNavItem>
            <MobileNavItem to="/agenda" onClick={toggleMenu}>Agenda</MobileNavItem>
            <MobileNavItem to="/reportar" onClick={toggleMenu}>Reportar Terreno</MobileNavItem>
            <MobileNavItem to="/apoie" onClick={toggleMenu}>Apoie uma Horta</MobileNavItem>
          </div>
          
          {/* Área de Login Mobile */}
          <div className="pt-4 pb-3 border-t border-gray-700 px-4">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="text-base font-medium leading-none text-white">{currentUser.email}</div>
                <button onClick={() => { logout(); toggleMenu(); }} className="bg-red-600 px-3 py-1 rounded text-white text-sm">
                  Sair
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={toggleMenu} 
                className="block w-full text-center bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Fazer Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * Footer (Rodapé)
 */
export const Footer = () => (
  <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-8 shadow-inner">
    © 2025 Hortas Urbanas. Projeto Acadêmico.
  </footer>
);

// --- Componentes de UI Reutilizáveis (O resto continua igual) ---

export const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

export const PageTitle = ({ children }) => (
  <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
    {children}
  </h1>
);

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

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

export const FileInput = ({ className = "", onChange, disabled }) => (
  <input
    type="file"
    onChange={onChange}
    disabled={disabled}
    accept="image/png, image/jpeg, image/webp" 
    className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-50 ${className}`}
  />
);