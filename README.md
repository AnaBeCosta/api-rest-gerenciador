## 🚀 Gerenciador de Projetos - API REST 🚀

Este projeto consiste em desenvolver uma API REST para gerenciar um banco de projetos.

### 📋 Requisitos

A API foi projetada para atender três grupos de usuários com diferentes níveis de acesso:

#### 👤 Administrador:

- Pode cadastrar, listar, editar e excluir pessoas.

#### 🏢 Responsável Pelo Projeto:

- Pode cadastrar, editar e excluir projetos.
- Pode solicitar listas de projetos cadastrados por ele mesmo.
- Pode selecionar candidatos para atuar nos projetos.

#### 🙋‍♂️ Candidato:

- Pode listar todos os projetos.
- Pode se candidatar para participar de um projeto.
- Pode ver a lista de pessoas que foram selecionadas para cada projeto.
- Pode consultar a popularidade de um projeto ou de todos os projetos. A popularidade é definida pela quantidade de candidaturas recebidas para um projeto.

A API armazena informações sobre projetos, incluindo Nome, Descrição do Projeto, Ano de Início e Ano de Término. Além disso, ela também registra informações de pessoas, como Nome, Idade, CPF e E-mail.

### 🛣️ Rotas da API:

1. **POST cadastrarPessoa:** O administrador pode cadastrar Responsáveis e/ou Candidatos no banco de dados.
2. **PUT editarPessoa:** O administrador pode editar Responsáveis e/ou Candidatos no banco de dados.
3. **DELETE deletarPessoa:** O administrador pode deletar Responsáveis e/ou Candidatos no banco de dados.
4. **GET candidatos:** O administrador pode listar todas as pessoas cadastradas no banco de dados.
5. **POST cadastrarProjeto:** O Responsável pode cadastrar Projetos no banco de dados.
6. **PUT editarProjeto:** O Responsável pode editar seus Projetos no banco de dados.
7. **DELETE deletarProjeto:** O Responsável pode deletar seus Projetos no banco de dados (caso não tenha interessados ainda).
8. **GET projetos:** Qualquer usuário pode listar todos os projetos do banco de dados (essa rota deve retornar todos os dados do projeto, incluindo sua popularidade).
9. **GET candidatosInteressados:** O Responsável pode listar todas as pessoas que se interessaram pelos seus projetos.
10. **POST candidatar:** O Candidato pode se candidatar a um projeto.
11. **POST selecionaCandidato:** O Responsável pode selecionar um interessado para atuar no seu projeto.
12. **GET candidatosSelecionados:** Qualquer usuário pode listar os candidatos selecionados para um determinado projeto.

### 🚀 Desenvolvimento

Este projeto foi desenvolvido na disciplina de Programação para Web 2.

#### 👩‍💻 Colaboradoras
- Ana Beatriz Faria  | ✉️ anacost.a@outlook.com
- Julia Stahl

