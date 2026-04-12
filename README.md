# HeroForce

Plataforma de gestão de **missões heroicas**: administradores criam e administram missões com metas; heróis acompanham o progresso e atualizam metas. Este repositório reúne **API (NestJS)**, **banco PostgreSQL** e **interface web (React)**.

## O que tem aqui

| Pasta | Descrição |
|-------|-----------|
| `backend/` | API REST, autenticação JWT, Swagger |
| `frontend/` | React + Vite |
| `docker-compose.yml` | Orquestra Postgres, API e frontend |

Documentação mais detalhada:

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## Pré-requisitos

- **Docker** e **Docker Compose** (recomendado para subir tudo)
- Ou **Node.js 22+** e **PostgreSQL 16+** se for rodar backend e frontend na máquina sem Docker

## Subir o projeto com Docker

Na raiz do repositório:

```bash
docker compose up -d --build
```

Na primeira execução as imagens são construídas; depois pode usar `docker compose up -d`.

### URLs (host local)

| Serviço | URL |
|---------|-----|
| Aplicação web | http://localhost:8080 |
| API | http://localhost:3000 |
| Swagger | http://localhost:3000/api |
| PostgreSQL | `localhost:5432` (usuário/senha/db definidos no `docker-compose.yml`) |

Variáveis do backend no Compose (JWT, banco, CORS) estão definidas no próprio `docker-compose.yml`.

### Parar os containers

```bash
docker compose down
```

Para remover também o volume do Postgres (apaga dados locais):

```bash
docker compose down -v
```
