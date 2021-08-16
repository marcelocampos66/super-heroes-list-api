<h1 align="center">Super Heroes List Api - 🚧 Em desenvolvimento 🚧<h1>

[![Generic badge](https://img.shields.io/badge/Status-In%20Progress-yellow?style=for-the-badge&logo=appveyor)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Integration-MongoDB%20PostgreSQL-blue?style=for-the-badge&logo=appveyor)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Develop-NodeJs-green?style=for-the-badge&logo=appveyor)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Develop-Express-yellow?style=for-the-badge&logo=appveyor)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Develop-REST%20RESTful-red?style=for-the-badge&logo=appveyor)](https://shields.io/)
 
<h3>A aplicação consiste em uma API que comunica com dois bancos de dados, um relacional (de usuários) e outro não relacional (de super heróis), realizando operações de CRUD.</h3>
  
  (Gif da aplicação aqui)
  
<br>
  
<h2>Desafio proposto</h2>

<p>A proposta por trás deste projeto foi desafiar os conhecimentos de programação full stack, por isso foi decidido que os padrões de código e desenvolvimento deveriam seguir as melhores práticas de mercado.</p>

<p>Utilizando essa API, o FrontEnd terá acesso a uma base de mais de 700 personsagens para consulta, cadastro, atualização e exclusão dos mesmos, e com a opção de criação de uma lista personalizada com seus heróis favoritos.</p>
<br>

<h2>Decisões técnicas</h2>
  
<p>Considerando o desafio proposto foram tomadas as seguintes decisões técnicas:</p>

  
<h3>Controle e planejamento</h3>

<li>Trello</li>
<li>DM às 9h</li>
<li>Design via Figma</li>
<li>Fluxogramas: De navegação e de fluxo de dados</li>
<li>Documentação do código</>
<br>
<br>

<h2>Rotas</h2>
<p>Basicamente, a aplicação é dividida em dois Routers principais:</p>
<p> - Router de users, que comunica com um banco relacional PostgreSQL e é responsável por todas as operações com usuários e seus registros dentro da aplicação.</p>
<p> - Router de heróis, que comunica com um banco não relacional MongoDB e é responsável por todas as operações com personagens da aplicação.</p>

<h4>Users:<h4>
<li>'GET /users' - Esse endpoint traz todos os usuários cadastrados no banco com suas respectivas listas de super heróis favoritos.</li>
<li>'POST /users/login' - Esse endpoint recebe as credenciais de login do usuário e retorna um token gerado via JWT, que será utilizado para autenticação do usuário durante a utilização da aplicação.</li>
<li>'POST /users' - Esse endpoint recebe dados de cadastro, que se forem validados e caso não exista nenhum outro usuário cadastrado com o mesmo e-mail, realiza o cadastro de um novo usuário no banco de dados.</li>
<li>'POST /users/:heroId' - Esse endpoint recebe como parametro o Id do herói que será registrado na lista do usuário.</li>
<li>'DELETE /users/:heroId' - Esse endpoint recebe como parametro o Id do herói que será excluido da lista do usuário.</li>
<li>'GET /users/selfuser' - Esse endpoint traz todos os dados de cadastro do usuário autenticado na aplicação.</li>
<li>'PUT /users/update-infos' - Esse endpoint é utilizado para a atualização dos dados cadastrais do usuário, ele recebe no corpo da requisição todos os dados atualizados, que se for validados, realiza a atualização no banco de dados.</li>

<br>

<h4>Super Heroes:<h4>
<li></li

<br>
<br>
 
<h2>Aplicação em produção</h2>
  
<p>É possível verificar o vídeo da aplicação em produção neste "link" (Em desenvolvimento)</p>

<p>Há possibilidade de rodar localmente a aplicação por meio dos seguintes passos: (Em desenvolvimento)</p>
 <br>

<hr>
  
<h3 align=center>Equipe</h3>

<table align=center>
  <tr>
    <td align="center">
      <a href="https://github.com/jiarguello">
        <img width='100px' src='https://avatars.githubusercontent.com/u/72360446?v=4' Alt= Jhonatan Perfil>
      </a>
    </td>  
    <td align="center">
      <a href="https://github.com/marcelocampos66"> 
        <img width='100px' src='https://avatars.githubusercontent.com/u/31359152?s=60&v=4' Alt= Marcelo Perfil>
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/jiarguello">
        Jhonatan Arguello
      </a>   
    </td>
    <td>
      <a href="https://github.com/marcelocampos66"> 
        Marcelo Campos
      </a>
    </td>
  </tr>
</table>
