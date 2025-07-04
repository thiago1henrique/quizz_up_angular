# QuizzUp - Plataforma de Quizzes em Angular
📌 Visão Geral

<p>
backend python
https://github.com/DayvisonCavalcanti/back-quiz-python.git
</p>
<p>
https://www.youtube.com/watch?v=sfD_Oz50VDo&feature=youtu.be
</p>

QuizzUp é uma plataforma interativa de quizzes desenvolvida em Angular com:

    Sistema de autenticação

    Perfil de usuário

    Criação e realização de quizzes

    Histórico de desempenho

## 🚀 Como Executar o Projeto
Pré-requisitos

    Node.js (v18 ou superior)

    npm (v9 ou superior)

    Angular CLI (v17 ou superior)

    JSON Server (para a API mock)

## 📥 Instalação

    Clone o repositório

git clone https://github.com/thiago1henrique/quizz_up_angular.git
cd quizz_up_angular

Instale as dependências

npm install

Instale o JSON Server globalmente (se necessário)

    npm install -g json-server

## ⚙️ Configuração

    Inicie o servidor de mock API (em um terminal separado)
    bash

    json-server --watch db.json

    O servidor estará disponível em: http://localhost:3000

## 🏃 Executando a Aplicação

    Inicie o servidor de desenvolvimento
    bash

ng serve

Acesse no navegador

    http://localhost:4200

🛠 Estrutura do Projeto

```
quizz_up_angular/
├── src/
│   ├── app/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── guards/          # Guards de rota
│   │   ├── models/          # Interfaces e tipos
│   │   ├── pages/           # Páginas principais
│   │   └── services/        # Serviços e lógica de negócio
│   └── styles/              # Estilos globais
└── README.md                # Este arquivo
```
