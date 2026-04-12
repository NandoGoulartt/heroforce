# HeroForce — Frontend

Interface web da plataforma HeroForce: autenticação, painel de missões, criação e edição de projetos com metas, tema visual escuro e layout responsivo.

## Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS 4**
- **React Router 7**
- **Axios** (cliente HTTP com interceptors de sessão)

## Scripts

| Comando | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite), com hot reload |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Serve o `dist` localmente após o build |
| `npm run lint` | ESLint |

## Variáveis de ambiente

Crie um arquivo `.env` na pasta `frontend` (pode copiar de `.env.example`):

| Variável | Descrição |
|----------|-----------|
| `VITE_API_URL` | URL base da API (ex.: `http://localhost:3000`). No Vite, variáveis expostas ao browser precisam do prefixo `VITE_`. |

Se não definir nada, o código usa `http://localhost:3000` como padrão.

## Desenvolvimento local

1. Suba o **backend** e o **PostgreSQL** (veja o README na raiz do repositório ou o README do backend).
2. Na pasta `frontend`:

```bash
npm install
npm run dev
```

A aplicação costuma ficar em **http://localhost:5173**. Ajuste `VITE_API_URL` se a API estiver em outra origem.

## Docker

A imagem é **multi-stage**: build com Node e entrega estática com **Nginx** (inclui `nginx.conf` para SPA — fallback para `index.html` nas rotas do React).

Na raiz do repositório:

```bash
docker compose up -d --build
```

O frontend fica em **http://localhost:8080**. A URL da API embutida no build é configurada em `docker-compose.yml` (`build.args.VITE_API_URL`), por padrão `http://localhost:3000` (acesso pelo navegador no host).

## Estrutura de pastas (`src/`)

| Pasta | Conteúdo |
|-------|----------|
| `api/` | Instância Axios, auth, projetos e usuários |
| `components/` | Formulários e layouts reutilizáveis |
| `pages/` | Telas por rota |
| `routes/` | Definição de rotas e rota protegida |
| `types/` | Tipos TypeScript do domínio |
| `utils/` | Helpers (sessão, progresso de metas) |

## API

O frontend espera a API documentada no backend (NestJS). Em produção, configure `VITE_API_URL` para o mesmo host/porta que o navegador usará para chamar a API.
