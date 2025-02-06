# ina-root

## Description

O aplicativo da INA é uma solução de software moderna e eficiente, projetada para fornecer uma experiência de usuário superior e funciorootdes avançadas.

Este é um monorepositório para o aplicativo root, um projeto robusto construído com Next.js e Nest.js.

Este projeto está em constante desenvolvimento, com novas funciorootdes e melhorias sendo adicionadas regularmente.

## Built With

![image info](https://img.shields.io/badge/node-%3E20-blue?logo=nodedotjs&logoColor=white)
![image info](https://img.shields.io/badge/npm-%3E4-blue?logo=npm&logoColor=white)
![image info](https://img.shields.io/badge/lerna-%3E8-blue?logo=lerna&logoColor=white)
![image info](https://img.shields.io/badge/docker-%3E4-blue?logo=docker&logoColor=white)

![image info](https://img.shields.io/badge/-HTML-black?logo=html5&logoColor=white)
![image info](https://img.shields.io/badge/-CSS-black?logo=css3&logoColor=white)
![image info](https://img.shields.io/badge/-JavaScript-black?logo=javascript&logoColor=white)
![image info](https://img.shields.io/badge/-TypeScript-black?logo=typescript&logoColor=white)
![image info](https://img.shields.io/badge/-React-black?logo=react&logoColor=white)
![image info](https://img.shields.io/badge/-NextJS-black?logo=nextdotjs&logoColor=white)
![image info](https://img.shields.io/badge/-Node-black?logo=nodedotjs&logoColor=white)
![image info](https://img.shields.io/badge/-NestJs-black?logo=nestjs&logoColor=white)
![image info](https://img.shields.io/badge/-Mongo-black?logo=mongodb&logoColor=white)
![image info](https://img.shields.io/badge/-Jest-black?logo=jest&logoColor=white)
![image info](https://img.shields.io/badge/-Cypress-black?logo=cypress&logoColor=white)
![image info](https://img.shields.io/badge/-git-black?logo=git&logoColor=white)
![image info](https://img.shields.io/badge/-Lerna-black?logo=lerna&logoColor=white)
![image info](https://img.shields.io/badge/-Github-black?logo=github&logoColor=white)
![image info](https://img.shields.io/badge/-Github_Actions-black?logo=githubactions&logoColor=white)
![image info](https://img.shields.io/badge/-Docker-black?logo=docker&logoColor=white)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisitos

A maneira mais fácil para usar o projeto e manter uma integração e compatibilidade entre as dependências é usando o npm.

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/rootApp/root-app-monorepo.git
   ```
2. Instale as dependências
   ```sh
   npm i
   ```
3. Configure suas variáveis de ambiente em env.local

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### Ambiente de desenvolvimento

Você precisará do docker instalado para emular todos os serviços e dependências externas da aplicação em seu ambiente de desenvolvimento.

1. Inicie o banco de dados com o docker
   ```sh
   npm run docker
   ```
2. Finalmente inicie a aplicação
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Convenção Git

Este projeto adota uma convenção simplificada para nomear branches e commits no Git, facilitando a colaboração entre desenvolvedores. A seguir estão as diretrizes para seguir ao criar branches e realizar commits.

### Convenção de nomenclatura de branches

Ela facilita a compreensão rápida do propósito de cada branch, promove consistência na nomenclatura e ajuda os desenvolvedores a identificar, de maneira clara, o contexto e a firootde de cada ramificação no repositório.

#### Categoria

Um branch do Git deve começar com uma categoria para indicar o propósito da alteração. Escolha uma das seguintes categorias:  `feat`, `fix` ou `chore`.

- `feat`: Adição, refatoração ou remoção de um recurso.
- `fix`: Correção de um bug.
- `chore`: atualizando tarefas pesadas, ci, performance, refactor, tests, etc; nenhuma alteração no código de produção.

#### Referência

Após a categoria, adicione um "`/`" seguido da referência do issue/ticket em que está trabalhando. Se não houver referência, use `no-ref`.

#### Descrição

Após a referência, adicione outro "/" seguido de uma descrição curta e "kebab-cased" que resuma o propósito deste branch.

**Padrão ao ramificar:**

```sh
git branch <category/reference/description-in-kebab-case>
```

#### Exemplos:

- Você precisa adicionar, refatorar ou remover um recurso: `git branch feat/issue-42/create-new-button-component`
- Você precisa corrigir um bug: `git branch fix/issue-342/button-overlap-form-on-mobile`
- Você precisa fazer uma atualização de ci: `git branch chore/no-ref/deploy-components-with-atomic-design`

### Convenção de Mensagens de Commit

Para commits, você deve usar as especificações de mensagem de [Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) e/ou [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

#### Categoria

Uma mensagem de commit deve começar com uma categoria de mudança. Utilize as seguintes categorias:  `feat`, `fix`, `refactore` e `chore`.

- `feat` Adição de um novo recurso.
- `fix` Correção de um bug.
- `refactor` Alteração de código para desempenho ou conveniência (por exemplo, legibilidade).
- `chore` Outras tarefas, como escrever documentação, formatação, adição de testes, limpeza de código inútil, etc.

Após a categoria, deverá haver um "`:`" anunciando a descrição do commit.

#### Descrição

Após os dois pontos, a descrição do commit deve consistir em declarações curtas descrevendo as alterações.

Cada afirmação deve começar com um verbo conjugado de forma imperativa. As declarações devem ser separadas delas mesmas por um "`;`".

**Padrão ao confirmar:**

```sh
git commit -m '<category: do something; do some other things>'
```

#### Exemplos:

- `git commit -m 'feat: add new button component; add new button components to templates'`
- `git commit -m 'fix: add the stop directive to button component to prevent propagation'`
- `git commit -m 'refactor: rewrite button component in TypeScript'`
- `git commit -m 'chore: write button documentation'`

Ao seguir essas diretrizes, facilitamos a compreensão e rastreamento das mudanças, promovendo uma colaboração mais eficiente entre os desenvolvedores.
