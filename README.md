# Confea S4S Backend

Este repositório contém o backend do projeto Confea, desenvolvido para o Hackathon S4S.

## Funcionalidades

- Criação e gerenciamento de usuários.
- Integração com a API da OpenAI.
- Validação de dados de entrada.
- Logging com Winston.

## Requisitos

- [Node.js](https://nodejs.org/en/) >= 18.x
- [Docker](https://www.docker.com/) (opcional, para rodar o ambiente em containers)
- .env (Arquivo de configuração com variáveis de ambiente)

## Instalação

Clone o repositório:

```sh
git clone https://github.com/LuanRobson/confea-s4s-back.git
cd confea-s4s-back

```markdown
# Confea S4S Backend

Este é o repositório do backend do projeto Confea S4S, desenvolvido para o Hackathon realizado pelo Confea. O projeto é construído usando Node.js, TypeScript, e o framework NestJS, com integração ao banco de dados Prisma.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **NestJS**: Framework para construção de aplicações server-side eficientes e escaláveis.
- **Prisma**: ORM (Object-Relational Mapping) para interação com o banco de dados.
- **Jest**: Framework de testes em JavaScript.
- **ESLint**: Ferramenta de linting para identificar e reportar padrões problemáticos no código.
- **Prettier**: Formatter de código.

## Instalação

### Pré-requisitos

- Node.js (v18.x)
- npm (v9.x) ou Yarn (v1.x)

### Clonando o Repositório

```bash
git clone https://github.com/LuanRobson/confea-s4s-back.git
cd confea-s4s-back
```

### Instalando Dependências

Você pode usar tanto npm quanto Yarn para instalar as dependências do projeto.

Com npm:
```bash
npm ci
```

Com Yarn:
```bash
yarn install
```

### Variáveis de Ambiente

Para rodar o projeto, é necessário configurar as variáveis de ambiente. Entre em contato com o número **85988523560** para obter o arquivo `.env` necessário, se for julgado necessário.

### Rodando a Aplicação

#### Ambiente de Desenvolvimento

Com npm:
```bash
npm run start:dev
```

Com Yarn:
```bash
yarn start:dev
```

#### Ambiente de Produção

Primeiro, é necessário construir a aplicação:
Com npm:
```bash
npm run build
```

Com Yarn:
```bash
yarn build
```

Depois de construir a aplicação, você pode rodar o servidor em modo de produção:
Com npm:
```bash
npm run start:prod
```

Com Yarn:
```bash
yarn start:prod
```

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
- **dist/**: Contém os arquivos compilados da aplicação.
- **prisma/**: Contém os arquivos de configuração do Prisma.

## Testes

Para rodar os testes, utilize os comandos abaixo.

Com npm:
```bash
npm run test
```

Com Yarn:
```bash
yarn test
```

Para rodar os testes com coverage:
Com npm:
```bash
npm run test:cov
```

Com Yarn:
```bash
yarn test:cov
```

## Docker

O projeto também pode ser executado usando Docker. O Dockerfile está configurado para criar imagens de desenvolvimento e produção.

### Build da Imagem Docker

Para construir a imagem Docker, utilize o comando:

```bash
docker build -t confea-s4s-back .
```

### Rodando o Container

Para rodar o container em modo de desenvolvimento:

```bash
docker run -p 3000:3000 -d confea-s4s-back
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a Licença **UNLICENSED**.

## Contato

Para mais informações, entre em contato com o número **85988523560**.

```

Este README fornece uma visão abrangente do projeto, desde a instalação até a execução, além de incluir informações sobre as tecnologias utilizadas e detalhes de configuração. Certifique-se de ajustar qualquer detalhe específico do projeto conforme necessário.
