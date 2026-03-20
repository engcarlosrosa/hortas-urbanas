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
 */
export const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
              <span className="bg-green-600 px-2 py-1 rounded text-sm">H</span>
              Hortas Urbanas
            </Link>
          </div>
          
          {/* MENU DESKTOP */}
          <div className="hidden xl:block">
            <div className="flex items-baseline space-x-2">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/mapa">Mapa</NavItem>
              <NavItem to="/plantas">Plantas</NavItem>
              <NavItem to="/manutencao">Manutenção</NavItem>
              <NavItem to="/forum">Fórum</NavItem>
              <NavItem to="/agenda">Agenda</NavItem>
              <NavItem to="/reportar">Reportar</NavItem>
              <NavItem to="/apoie">Apoie</NavItem>
            </div>
          </div>
          
          {/* ÁREA DE USUÁRIO DESKTOP */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin/usuarios" 
                className="text-xs font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all"
              >
                Painel Admin
              </Link>
            )}

            {currentUser ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-xs text-gray-400 leading-none">Olá,</p>
                  <p className="text-sm font-medium text-white">{currentUser.nome?.split(' ')[0]}</p>
                </div>
                <Button onClick={logout} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                  Sair
                </Button>
              </div>
            ) : (
              <Button as={Link} to="/login" variant="primary" size="sm">Entrar</Button>
            )}
          </div>

          {/* BOTÃO MOBILE */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="text-gray-400 hover:text-white p-2">
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 pt-2 pb-6 space-y-1">
          <MobileNavItem to="/" onClick={toggleMenu}>Home</MobileNavItem>
          <MobileNavItem to="/mapa" onClick={toggleMenu}>Mapa</MobileNavItem>
          {currentUser?.role === 'admin' && (
            <MobileNavItem to="/admin/usuarios" onClick={toggleMenu}>
              <span className="text-yellow-500">⭐ Painel Admin</span>
            </MobileNavItem>
          )}
          <div className="pt-4 border-t border-gray-800">
            {currentUser ? (
              <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-left px-3 py-2 text-red-400 font-medium">
                Sair ({currentUser.email})
              </button>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 bg-green-600 text-white rounded-md text-center">
                Entrar
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