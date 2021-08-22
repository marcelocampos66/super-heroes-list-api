const chai = require('chai');
// const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
const { User, List } = require('../models');

const {
  validAdminCredentials,
  invalidCredentials,
  validUserToRegister,
  userToRegisterWithoutName,
  userToRegisterWithShortName,
  userToRegisterWithoutAge,
  userToRegisterWithInvalidAge,
  userToRegisterWithoutPassword,
  userToRegisterWithInvalidPassword,
  userToRegisterWithoutEmail,
  userToRegisterWithInvalidEmail,
  validUserToUpdate,
} = require('./mocks');

describe('Testa o Router de Users', () => {

  let token;
  
  before(async () => {
    token = await chai
      .request(server)
      .post('/users/login')
      .send(validAdminCredentials)
      .then((response) => response.body.token);
  });

  describe('GET /users', () => {
    let response;
  
    before(async () => {
      response = await chai
        .request(server)
        .get('/users')
    });
  
    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
  
    it('retorna um array', () => {
      expect(response.body).to.be.a('array');
    });
  
    it('retorna um array com length 1', () => {
      expect(response.body).to.has.length(1);
    });
  
    it('retorna um array de objetos', () => {
      expect(response.body[0]).to.be.a('object');
    });
  
    it('o objeto possui a propriedade "id"', () => {
      expect(response.body[0]).to.have.property('id');
    });
  
    it('o objeto possui a propriedade "name"', () => {
      expect(response.body[0]).to.have.property('name');
    });
  
    it('o objeto possui a propriedade "age"', () => {
      expect(response.body[0]).to.have.property('age');
    });
  
    it('o objeto possui a propriedade "email"', () => {
      expect(response.body[0]).to.have.property('email');
    });
  
    it('o objeto possui a propriedade "role"', () => {
      expect(response.body[0]).to.have.property('role');
    });
  
    it('o objeto possui a propriedade "image"', () => {
      expect(response.body[0]).to.have.property('image');
    });
  
    it('o objeto possui a propriedade "list"', () => {
      expect(response.body[0]).to.have.property('list');
    });
  
  });
  
  describe('POST /users/login', () => {
    
    describe('Consegue logar passando credenciais corretas', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users/login')
          .send(validAdminCredentials);
      });
  
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
    
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "token"', () => {
        expect(response.body).to.have.property('token');
      });
  
    });
  
    describe('Falha ao tentar fazer o login com credenciais incorretas', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users/login')
          .send(invalidCredentials);
      });
  
      it('retorna o código de status 404', () => {
        expect(response).to.have.status(404);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor "User or password incorrect."', () => {
        expect(response.body.error.message).to.be.equal('User or password incorrect.');
      });
  
    });
  
  });
  
  describe('POST /users', () => {
    
    describe('Falha ao tentar cadastrar um usuario sem nome', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithoutName);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "name" is required', () => {
        expect(response.body.error.message).to.be.equal('"name" is required');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario com nome menor que 3 caracteres', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithShortName);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "name" length must be at least 3 characters long', () => {
        expect(response.body.error.message)
          .to.be.equal('"name" length must be at least 3 characters long');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario sem o campo age', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithoutAge);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "age" is required', () => {
        expect(response.body.error.message).to.be.equal('"age" is required');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario com o campo age invalido', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithInvalidAge);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "age" must be greater than or equal to 1', () => {
        expect(response.body.error.message)
          .to.be.equal('"age" must be greater than or equal to 1');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario sem o campo password', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithoutPassword);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "password" is required', () => {
        expect(response.body.error.message).to.be.equal('"password" is required');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario com senha invalida', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithInvalidPassword);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "password" length must be at least 6 characters long', () => {
        expect(response.body.error.message)
          .to.be.equal('"password" length must be at least 6 characters long');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario sem o campo email', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithoutEmail);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: "email" is required', () => {
        expect(response.body.error.message).to.be.equal('"email" is required');
      });
  
    });
  
    describe('Falha ao tentar cadastrar um usuario com senha invalida', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(userToRegisterWithInvalidEmail);
      });
  
      it('retorna o código de status 422', () => {
        expect(response).to.have.status(422);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_data"', () => {
        expect(response.body.error.type).to.be.equal('invalid_data');
      });
  
      it('a propriedade "message" tem o valor: fails to match the required pattern', () => {
        expect(response.body.error.message)
          .to.be.includes('fails to match the required pattern');
      });
  
    });
  
    describe('Cadastra um novo usuario', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users')
          .send(validUserToRegister);
      });
  
      after(async () => {
        const { email } = validUserToRegister;
        await User.destroy({ where: { email } });
      });
  
      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "token"', () => {
        expect(response.body).to.have.property('token');
      });
  
    });
  
  });
  
  describe('POST /users/:heroId', () => {

    describe('Falha ao registrar um heroi na lista do usuario sem autenticacao', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users/60e8cef2849ece5d484ff618');
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.error.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor: Token not found', () => {
        expect(response.body.error.message).to.be.equal('Token not found');
      });

    });
  
    describe('Registra um heroi na lista do usuario', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .post('/users/60e8cef2849ece5d484ff618')
          .set('authorization', token);
      });

      after(async () => {
        const { body: { userId, heroId } } = response;
        await List.destroy({ where: { userId, heroId } });
      });

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('o objeto possui a propriedade "heroId"', () => {
        expect(response.body).to.have.property('heroId');
      });

    });
  
  });
  
  describe('DELETE /users/:heroId', () => {

    describe('Falha ao deletar um heroi da lista do usuario sem autenticacao', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .delete('/users/60e8cef2849ece5d484ff618');
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.error.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor: Token not found', () => {
        expect(response.body.error.message).to.be.equal('Token not found');
      });

    });

    describe('Deleta um heroi da lista do usuario', () => {
      let response;
  
      before(async () => {
        await chai
          .request(server)
          .post('/users/60e8cef2849ece5d484ff618')
          .set('authorization', token);
        response = await chai
          .request(server)
          .delete('/users/60e8cef2849ece5d484ff618')
          .set('authorization', token);
      });

      it('retorna o código de status 204', () => {
        expect(response).to.have.status(204);
      });

      it('O body da response esta vazio', () => {
        expect(response.body).to.be.empty;
      });

      it('O registro do heroi foi deletado com sucesso', async () => {
        const userId = 1;
        const heroId = '60e8cef2849ece5d484ff618';
        const registerExists = await List.findOne({ where: { userId, heroId } });
        expect(registerExists).to.be.null;
      });

    });

  });

  describe('GET /selfuser', () => {

    describe('Falha ao buscar os dados do usuario, sem autenticacao', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .get('/users/selfuser');
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.error.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor: Token not found', () => {
        expect(response.body.error.message).to.be.equal('Token not found');
      });

    });

    describe('Busca os dados do usuario autenticado', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .get('/users/selfuser')
          .set('authorization', token);
      });

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "id"', () => {
        expect(response.body).to.have.property('id');
      });

      it('o objeto possui a propriedade "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('o objeto possui a propriedade "age"', () => {
        expect(response.body).to.have.property('age');
      });

      it('o objeto possui a propriedade "email"', () => {
        expect(response.body).to.have.property('email');
      });

      it('o objeto possui a propriedade "password"', () => {
        expect(response.body).to.have.property('password');
      });

      it('o objeto possui a propriedade "role"', () => {
        expect(response.body).to.have.property('role');
      });

      it('o objeto possui a propriedade "image"', () => {
        expect(response.body).to.have.property('image');
      });

      it('o objeto possui a propriedade "list"', () => {
        expect(response.body).to.have.property('list');
      });

    });

  });

  describe('PUT /users/update-infos', () => {

    describe('Falha ao fazer update do usuario sem autenticacao', () => {
      let response;
  
      before(async () => {
        response = await chai
          .request(server)
          .put('/users/update-infos')
          .send(validUserToUpdate);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "error"', () => {
        expect(response.body).to.have.property('error');
      });
  
      it('a propriedade "error" eh um objeto', () => {
        expect(response.body.error).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body.error).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body.error).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.error.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor: Token not found', () => {
        expect(response.body.error.message).to.be.equal('Token not found');
      });
    });

    describe('Faz o update das informacoes do usuario com sucesso', () => {
      let response;
      let magniToken;
  
      before(async () => {
        const { email, password } = validUserToRegister;
        await chai
          .request(server)
          .post('/users')
          .send(validUserToRegister);

        magniToken = await chai
        .request(server)
        .post('/users/login')
        .send({ email, password })
        .then((response) => response.body.token);

        response = await chai
          .request(server)
          .put('/users/update-infos')
          .set('authorization', magniToken)
          .send(validUserToUpdate);
      });
  
      after(async () => {
        const { email } = validUserToRegister;
        await User.destroy({ where: { email } });
      });

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('o objeto possui a propriedade "age"', () => {
        expect(response.body).to.have.property('age');
      });

      it('o objeto possui a propriedade "email"', () => {
        expect(response.body).to.have.property('email');
      });

      it('o objeto possui a propriedade "password"', () => {
        expect(response.body).to.have.property('password');
      });

      it('O name foi atualizado', () => {
        expect(response.body.name).to.be.equal(validUserToUpdate.name);
      });

      it('O password foi atualizado', () => {
        expect(response.body.password).to.be.equal(validUserToUpdate.password);
      });

      it('O age foi atualizado', () => {
        expect(response.body.age).to.be.equal(validUserToUpdate.age);
      });

    });

  });

});


