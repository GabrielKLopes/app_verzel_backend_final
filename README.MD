
# Verzel App Back

Descrição

Backend para a aplicação verzel_app_back, desenvolvido com Node.js, Express, e TypeScript. Utiliza PostgreSQL como banco de dados, gerenciado via TypeORM, e integra a API do TMDb para consumo de informações sobre filmes. A aplicação é dockerizada para facilitar o setup e o desenvolvimento.

## Autores

- [@GabrielKLopes](https://www.github.com/GabrielKLopes)


## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- TMDb API
## Instalação



```bash
 git clone https://github.com/seu-usuario/verzel_app_back.git
 cd verzel_app_back

 npm install

 Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:


 Inicie o banco de dados PostgreSQL com Docker:
 docker-compose up -d 

 Execute as migrações do banco de dados:
 npm run migration:run
```
    
## Requisitos

`Node.js`  v18.x ou superior

`npm` v9.x ou superior

`Docker` para o banco de dados PostgreSQL

`Git` para versionamento de código
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`POSTGRES_USER=postgres.ieinhtoruxmhssnqzepg`

`POSTGRES_PASSWORD=cp1141rm1hf`

`POSTGRES_DB=postgres`

`POSTGRES_PORT=6543`

`POSTGRES_HOST=localhost`

`JWT_SECRET=sua_chave_secreta_aqui`

`PORT=4000`


## Uso

```bash
Iniciar o servidor em produção:
npm start

Iniciar o servidor em desenvolvimento:
npm run start-dev

```
## Funcionalidades

- Criar Usuário

- Obter uma lista de filmes com detalhes adicionais, incluindo elenco, equipe técnica e trailer.

- Buscar detalhes completos de um filme específico pelo seu ID, incluindo elenco, equipe técnica e trailer.

- Buscar filmes por gênero, filtrando aqueles já existentes na lista fornecida.

- Obter detalhes básicos de um filme pelo ID.

- Buscar filmes pelo nome, com paginação e limite de resultados.

- Obter a lista de gêneros disponíveis na API do TMDb.

- Adicionar um filme aos favoritos do usuário, verificando se já foi favoritado.

- Remover um filme dos favoritos do usuário.

- Obter os IDs dos filmes favoritos de um usuário.

- Obter detalhes completos dos filmes favoritos de um usuário.

- Filtrar os filmes favoritos do usuário por gênero.

- Buscar nos favoritos do usuário com base em um termo de pesquisa.

- Gerar um link para compartilhamento dos filmes favoritos do usuário.

- Obter os detalhes dos filmes favoritos compartilhados de um usuário.



## Feedback

Se você tiver algum feedback, por favor deixe saber por meio de gabrielklopes21@gmail.com

