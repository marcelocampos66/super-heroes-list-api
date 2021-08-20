const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
// const { User } = require('../models');

const {
  validAdminCredentials,
  invalidCredentials,
} = require('./mocks');

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
