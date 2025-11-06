# **Guia de Setup Rápido para Colaboradores - Hortas Urbanas**

Olá, equipe!

A configuração inicial do projeto (Firebase, Tailwind, Roteamento, etc.) já está **concluída e disponível no GitHub**.

Para que vocês possam começar a desenvolver as tarefas de vocês, só precisam de seguir estes passos para "clonar" o projeto e executá-lo na máquina de vocês, **tudo dentro do VS Code**.

### **Passo 0: Pré-requisitos (Instalar 1x)**

Como vocês já programam, provavelmente já têm isto. Se não, precisam vão instalar:

1. **Node.js (LTS):** Essencial para executar o React. [Baixar aqui](https://nodejs.org/en)  
2. **Git:** O sistema que usamos para controlar as versões do código. [Baixar aqui](https://git-scm.com/downloads)  
3. **VS Code:** O nosso editor de código. [Baixar aqui](https://code.visualstudio.com/)

### **Passo 1: Clonar o Projeto (Dentro do VS Code)**

1. Abra o VS Code.  
2. Vá para a pasta onde você guarda os seus projetos (ex: cd Documentos/Projetos).  
3. Abra o terminal integrado no VS Code (**Ver > Terminal** ou Ctrl+').  
4. Clone o projeto:  
   `git clone https://github.com/hortas-urbanas/hortas-urbanas.git`  
5. Abra a pasta que acabou de ser criada no VS Code:  
   `cd hortas-urbanas`  
   `code .`

### **Passo 2: Instalar as Dependências**

Com o projeto aberto no VS Code, no terminal integrado.

Execute o comando abaixo. Ele vai ler o package.json e baixar todas as "peças" que o projeto precisa (React, Firebase, Tailwind, etc.):

`npm install`

*(Isto pode demorar alguns minutos.)*

### **Passo 3: Configurar Variáveis de Ambiente (Firebase)**

**MUITO IMPORTANTE:** O nosso projeto usa o Firebase para funcionalidades como banco de dados e autenticação. Para que a aplicação consiga se conectar ao Firebase, você precisa fornecer as chaves de API.

O projeto espera que estas chaves estejam em um arquivo chamado `.env` na raiz do projeto.

**O que fazer:**

1.  Na raiz do projeto (na mesma pasta onde está o `package.json`), crie um novo arquivo chamado **`.env`**.
2.  Copie e cole o bloco de texto abaixo dentro do seu arquivo `.env`:

    ```
    VITE_API_KEY=
    VITE_AUTH_DOMAIN=
    VITE_PROJECT_ID=
    VITE_STORAGE_BUCKET=
    VITE_MESSAGING_SENDER_ID=
    VITE_APP_ID=
    VITE_MEASUREMENT_ID=
    ```

3.  **Peça as chaves de API** ao líder técnico ou a quem gerencia o projeto no Firebase e preencha os valores após o sinal de `=`.

**Atenção:** Sem este arquivo e as chaves corretas, o comando `npm run dev` resultará em uma **tela em branco** e erros no console do navegador. Este passo é obrigatório para que a aplicação funcione.

### **Passo 4: Executar o Projeto!**

No mesmo terminal, execute o comando para iniciar o servidor:

`npm run dev`

Abra o seu navegador no endereço `http://localhost:5173` que aparecer no terminal. Se você configurou o arquivo `.env` corretamente, deverá ver o site completo, com o Header, Footer e a navegação a funcionar.

### **Passo 5: COMO COMEÇAR A TRABALHAR (MUITO IMPORTANTE)**

Para evitar conflitos, **NUNCA trabalhem diretamente na branch `main`**.

Ainda no terminal do VS Code, antes de começar a sua tarefa, crie um "branch" (ramificação) novo:

1. **Crie o seu branch:**  
   `# Substitua "nome-da-sua-tarefa" por algo descritivo`  
   `# Ex: "feature/tela-mapa" ou "fix/login-bug"`  
   `git checkout -b nome-da-sua-tarefa`

2. **Trabalhe na sua tarefa:** Crie e edite os seus arquivos no VS Code.  
3. **Quando terminar (ou ao fim do dia), envie o seu progresso:**  
   `git add .`  
   `git commit -m "Mensagem do que você fez"`  
   `git push origin nome-da-sua-tarefa`

Depois de fazer o `push`, vá ao GitHub e abra um "Pull Request" para que o seu código possa ser revisto e integrado ao projeto principal.