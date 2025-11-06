Projeto Hortas Urbanas - Guia de Configuração do Ambiente
Bem-vindo(a) ao projeto Hortas Urbanas! Este documento é um guia passo a passo para configurar seu ambiente de desenvolvimento e começar a contribuir.

Stack de Tecnologias:

Frontend: React.js (usando Vite para a estrutura do projeto)

Backend: Google Firebase (Arquitetura BaaS - Backend-as-a-Service)

Controle de Versão: Git e GitHub

Pré-requisitos
Antes de começar, garanta que você tenha os seguintes softwares instalados:

Node.js (versão LTS recomendada)

Git

Visual Studio Code

Passo a Passo para Configuração
Siga estes passos para clonar o projeto e configurá-lo corretamente em sua máquina.

Passo 1: Clonar o Repositório do GitHub
Primeiro, clone o repositório do projeto para o seu computador.

# Navegue no terminal até a pasta onde você guarda seus projetos
cd Documentos/Projetos

# Clone o repositório 
git clone https://github.com/hortas-urbanas/hortas-urbanas.git

# Entre na pasta do projeto que acabou de ser criada
cd hortas-urbanas

Passo 2: Configurar a Identidade Git (MUITO IMPORTANTE)
Para garantir que suas contribuições neste projeto sejam associadas ao seu e-mail acadêmico (e não ao profissional), vamos configurar uma identidade local do Git, que só terá efeito dentro deste diretório.

# DENTRO da pasta 'hortas-urbanas', execute os comandos abaixo:

# Configure seu nome de usuário para este projeto
git config --local user.name "Seu Nome Completo (Acadêmico)"

# Configure seu e-mail para este projeto (use seu e-mail da faculdade)
git config --local user.email "seu-email@faculdade.edu.br"

# Verifique se a configuração foi aplicada corretamente
# Estes comandos devem retornar o nome e e-mail que você acabou de inserir
git config user.name
git config user.email

Esta configuração local sobrescreve sua configuração global do Git apenas para este projeto, mantendo seus projetos profissionais intactos.

Passo 3: Criar e Instalar o Projeto React
Agora vamos criar a estrutura inicial do React com Vite dentro do diretório que já está conectado ao Git.

# Certifique-se de que você ainda está na pasta 'hortas-urbanas'

# Crie o projeto Vite no diretório ATUAL (.)
# O ponto no final é importante para não criar uma subpasta
npm create vite@latest . -- --template react

# Após a criação, o terminal perguntará se pode instalar as dependências.
# Se não, instale manualmente:
npm install

Passo 4: Rodar o Projeto Localmente
Com tudo instalado, inicie o servidor de desenvolvimento:

npm run dev

Abra o navegador e acesse o endereço que aparecer no terminal (geralmente http://localhost:5173). Você deverá ver a página inicial do React.

Passo 5: Fazendo o Primeiro Commit e Enviando para o GitHub
Agora que o projeto foi criado, vamos enviar a estrutura inicial para o repositório no GitHub.

# Certifique-se de estar na pasta 'hortas-urbanas'
# Se o servidor estiver rodando (npm run dev), pare-o com Ctrl + C

# 1. Adicione todos os novos arquivos para serem monitorados pelo Git
git add .

# 2. Crie um "commit", que é um pacote de alterações com uma mensagem
git commit -m "Initial commit: Setup project structure with Vite"

# 3. Envie o commit para o repositório remoto no GitHub
# (Pode ser necessário fazer login com seu GitHub pessoal na primeira vez)
git push -u origin main

Após executar esses comandos, se você atualizar a página do seu repositório no GitHub, verá todos os arquivos do projeto lá.

Estrutura de Pastas Sugerida
Para manter o projeto organizado desde o início, sugerimos a seguinte estrutura dentro da pasta src/:

src/
|-- assets/         # Imagens, fontes e outros arquivos estáticos
|-- components/     # Componentes reutilizáveis (Botão, Card, Input, etc.)
|-- context/        # Contextos da aplicação (Autenticação, Tema, etc.)
|-- pages/          # Componentes que representam páginas (Login, Home, Mapa, etc.)
|-- services/       # Lógica de comunicação com APIs externas (ex: firebase.js)
|-- styles/         # Arquivos de estilo globais (opcional)
|-- App.jsx
|-- main.jsx

Parabéns! Seu ambiente está pronto. Agora você pode começar a desenvolver as funcionalidades e enviar suas alterações (commit e push) para o repositório do GitHub com a identidade correta.