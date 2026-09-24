# 🎓 Sistema Vocacional & Quiz UTFPR-CM

![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black)
![Express](https://img.shields.io/badge/Backend-Express.js_TS-blue)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_15-blue)
![Docker](https://img.shields.io/badge/Container-Docker_Compose-blue)

Uma aplicação web moderna, responsiva e performática desenvolvida para auxiliar estudantes do ensino médio e a comunidade na Feira de Profissões, mapeando afinidades vocacionais com os **10 cursos de graduação ofertados pela UTFPR — Câmpus Campo Mourão** e testando conhecimentos institucionais.

O sistema oferece uma experiência gamificada de **duelos de preferências**, um **quiz interativo de conhecimentos sobre a UTFPR**, relatórios visuais de compatibilidade e um **painel administrativo protegido com métricas e exportações de dados**.

---

## 📸 Funcionalidades

### 🌐 Área do Estudante
* **Identificação Personalizada:** Coleta simplificada de dados (Nome, Série e Escola) com seleção unificada das instituições parceiras de Campo Mourão e região.
* **Duelos Vocacionais (Pareamento Ponderado):**
  * 30 duelos de preferências aleatorizados dinamicamente.
  * Navegação por clique ou atalhos de teclado (`A`, `B`, setas e `S` para pular).
  * **Pulo Limitado:** Destaque visual limitado a **33% das questões** (até 10 pulos).
* **Quiz de Conhecimentos UTFPR (`/quiz-utfpr`):**
  * Tela inicial de apresentação com informações do quiz.
  * Banco de dados com 39 questões sobre a história da UTFPR, cursos, modalidade gratuita, vestibular/SiSU e novos cursos em IA.
  * **Sorteio Dinâmico:** Seleção aleatória de **10 perguntas por rodada**.
  * **Temporizador Regressivo:** Limite de **30 segundos por questão** com barra de progresso visual.
  * **Seleção Silenciosa:** Destaque neutro para uso na Feira de Profissões (evita cópia entre colegas ao lado).
* **Resultado em Tempo Real:**
  * Apresentação do curso ideal (Top Match) com percentual de compatibilidade.
  * Detalhes acadêmicos (duração, turno, vagas) e atalhos para a matriz curricular.
  * **Encaminhamento Direto:** Botão em destaque para realizar o Quiz de Conhecimentos ao finalizar o Teste Vocacional.

### 📊 Painel Administrativo de BI (`/administracao`)
* **Autenticação Segura:** Proteção de rotas via **JWT em cookies HTTP-Only** com suporte a acessos via rede local (LAN - `192.168.x.x`).
* **KPIs & Mapeamento:** Volume de testes, taxas de conclusão e rankings visuais de participação por escolas e afinidade por cursos.
* **Gestão de Respostas:** Tabela paginada (10 itens/página), busca rápida, filtros combinados, criação/edição manual de registros, **modais de confirmação de exclusão** (individual e em massa) e **notificações temporárias (toasts) de sucesso**.
* **Exportação de Relatórios:**
  * **CSV:** Download tabulado com acentuação correta e cruzamento de IDs de escolas/séries.
  * **PDF:** Documento de impressão contendo a lista completa de estudantes com resolução dos nomes legíveis das instituições.

---

## 🏗️ Arquitetura e Tecnologias

O projeto é estruturado como um **Monorepo** totalmente containerizado usando **Docker** e **Docker Compose**.

```text
utfpr-vocacional/
├── backend/            # API RESTful em Node.js + Express + Prisma
├── frontend/           # Web App em Next.js 14 (App Router) + Tailwind CSS
├── docker-compose.yml  # Orquestração dos containers (DB, Backend, Frontend)
├── DESIGN.md           # Arquivo com detalhes de design do projeto
├── LICENSE
└── README.md
```

### 🖥️ Frontend
* **Framework:** Next.js 14 (App Router & React Server Components).
* **Estilização:** Tailwind CSS (Design System customizado para temas escuro/claro e tokens institucionais).
* **Segurança:** Middleware do Next.js interceptando e protegendo rotas administrativas.

### ⚙️ Backend
* **Runtime & Framework:** Node.js, Express.js.
* **ORM & Banco:** Prisma ORM v5 e PostgreSQL 15 (Alpine).
* **Autenticação:** JWT (jsonwebtoken), cookie-parser, bcryptjs e suporte a CORS configurado para origens locais e LAN.

---

## 🛠️ Configuração e Instalação Local (Docker)

### Pré-requisitos
* [Git](https://git-scm.com/)
* [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

---

### Passo a Passo

#### 1. Clonar o Repositório
```bash
git clone https://github.com/MatheusoliveiraT/teste-vocacional-utfpr.git
cd teste-vocacional-utfpr
```

2. Configurar Arquivos de Ambiente (.env)

Garanta que o arquivo backend/.env contenha a URL de conexão do PostgreSQL (container db):
Fragmento do código

```
# backend/.env
DATABASE_URL="postgresql://postgres:postgrespassword@db:5432/teste_vocacional?schema=public"
PORT=4000
NODE_ENV=development
JWT_SECRET="sua_chave_secreta_jwt"
ADMIN_USER="admin@utfpr.edu.br"
```

(Opcional) Crie o arquivo frontend/.env.local para personalizar as portas do servidor:
Fragmento do código

```
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
API_INTERNAL_URL=http://backend:4000
```

3. Subir os Containers Docker

Construa e inicialize os containers em segundo plano:

```bash
docker compose up -d --build
```

4. Criar as Tabelas no Banco de Dados (Prisma)

Suba a estrutura do esquema no PostgreSQL dentro do container backend:

```bash
docker compose exec backend npx prisma db push
```

5. Popular o Banco com Dados Iniciais (Seeder)

Execute o script de população automática para cadastrar os 10 cursos da UTFPR-CM (com metadados acadêmicos), as 23 escolas de Campo Mourão e as 30 questões/duelos aleatorizados:

```bash
docker compose exec backend npx prisma db seed
```

📍 URLs de Acesso e Credenciais

    Área Principal (Estudante): http://localhost:3000

    Quiz de Conhecimentos UTFPR: http://localhost:3000/quiz-utfpr

    Painel Administrativo: http://localhost:3000/administracao

        Usuário: admin@utfpr.edu.br

        Senha: utfpr2026

    API REST Backend: http://localhost:4000


📄 Licença de Uso

Este projeto está licenciado sob a Creative Commons Zero v1.0 Universal (CC0 1.0) - Dedicação ao Domínio Público.

Você pode copiar, modificar, distribuir e executar o trabalho, mesmo para fins comerciais, tudo sem pedir permissão. Para mais detalhes, consulte o texto oficial da licença em https://creativecommons.org/publicdomain/zero/1.0/.
