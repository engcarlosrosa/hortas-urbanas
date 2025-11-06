Instalação do Tailwind CSS (v3 Estável)

Este guia documenta o processo de instalação e configuração do Tailwind CSS v3, uma versão estável e compatível com o nosso ambiente Vite.

Passo 1: Limpeza do Ambiente (Se Necessário)

Se você encontrar erros persistentes, comece com uma limpeza completa. Caso contrário, pode pular para o Passo 2.

Pare o servidor (Ctrl + C).

Apague a pasta node_modules.

Apague o ficheiro package-lock.json.

Passo 2: Instalar as Dependências Estáveis

Execute o comando abaixo para instalar as versões corretas do Tailwind e das suas dependências.

npm install -D tailwindcss@^3.4.1 postcss@^8.4.38 autoprefixer@^10.4.19


Passo 3: Criar os Ficheiros de Configuração

Com as versões corretas, o comando de inicialização irá funcionar como esperado.

Execute no terminal:

npx tailwindcss init -p


Isto irá criar dois ficheiros na raiz do projeto: tailwind.config.js e postcss.config.js.

Passo 4: Configurar os Caminhos do Tailwind

Abra o ficheiro tailwind.config.js e adicione os caminhos dos seus ficheiros na propriedade content.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


Passo 5: Limpar os Estilos Padrão do Vite

Para evitar conflitos, centralizamos todos os estilos no Tailwind.

Abra o ficheiro src/index.css, apague todo o conteúdo e adicione apenas as três linhas do Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;


Apague o ficheiro src/App.css (se ele existir).

Abra o ficheiro src/App.jsx e remova a linha de importação no topo: import './App.css'.

Passo 6: Iniciar o Servidor

Com a configuração concluída, inicie o servidor de desenvolvimento.

npm run dev


A aplicação deve iniciar sem erros e com o Tailwind CSS a funcionar corretamente.