# HeroForce API 🦸

API para gerenciamento de projetos heroicos, onde administradores criam missões e heróis acompanham e executam tarefas com base em metas dinâmicas.

---

## 🛠 Tecnologias

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Swagger

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd heroforce
```

### 2. Suba com Docker

```bash
docker compose up --build
```

### 3. Acesse

* API: [http://localhost:3000](http://localhost:3000)
* Swagger: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🔐 Usuário admin

O sistema cria automaticamente um usuário administrador ao iniciar.

* Email: [bruce@heroforce.com](mailto:bruce@heroforce.com)
* Senha: 123456

---

## 🔑 Autenticação

A API utiliza autenticação via JWT.

### Passos:

1. Faça login em `/auth/login`
2. Copie o `accessToken`
3. Utilize nas requisições:

```
Authorization: Bearer {token}
```

Você também pode usar diretamente no Swagger.

---

## 📦 Funcionalidades

* Cadastro e login de usuários (heróis)
* Autenticação com JWT
* Controle de acesso por roles (ADMIN / USER)
* CRUD completo de projetos
* Filtros por status e responsável
* Metas dinâmicas por projeto
* Atualização do progresso das metas (`current`) por administrador ou herói responsável pelo projeto
* Documentação com Swagger

---

## 🎯 Metas dos projetos

Cada projeto possui metas dinâmicas, permitindo flexibilidade para diferentes tipos de missões.

### Estrutura:

```json
[
  {
    "name": "Segurança da Cidade",
    "target": 90,
    "current": 70
  }
]
```

### Conceitos:

* **name** → nome da meta
* **target** → objetivo a ser alcançado
* **current** → valor atual

Isso permite acompanhar a evolução da missão e comparar progresso com objetivo.

### Atualizar o progresso das metas

Heróis e administradores podem atualizar apenas o campo **current** das metas existentes (o **name** deve coincidir com uma meta já cadastrada no projeto; **target** não é alterado por esta rota).

**Endpoint:** `PATCH /projects/:id/goals`

**Corpo (JSON):**

```json
{
  "goals": [
    {
      "name": "Segurança da Cidade",
      "current": 75
    }
  ]
}
```

* **goals** → lista com pelo menos um item; cada item informa o **name** da meta e o novo **current** (inteiro de 0 a 100).

---

## 🧠 Regras de acesso

### ADMIN

* Criar projetos
* Editar projetos
* Remover projetos
* Visualizar todos os projetos
* Atualizar o progresso das metas de qualquer projeto (`PATCH /projects/:id/goals`)

### USER (Herói)

* Visualizar projetos
* Visualizar apenas projetos atribuídos a ele
* Atualizar o progresso das metas (`PATCH /projects/:id/goals`) apenas nos projetos em que for o responsável

---

## 📌 Observações

* O banco é iniciado automaticamente via Docker
* O seed cria o usuário admin na inicialização
* O campo `password` não é retornado nas respostas da API

