const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
const getConnection = require('./connectionMock');

const {
  validAdminCredentials,
  validAdminUser,
  mockPageOfHeroes,
} = require('./mocks');

describe('Testa o Router SHL', () => {

  let token;
  
  before(async () => {
    token = await chai
      .request(server)
      .post('/users/login')
      .send(validAdminCredentials)
      .then((response) => response.body.token);
  });

  describe('GET /heroes', () => {

    describe('Busca uma pagina de herois, com 12 herois', () => {
  
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes?page=1')
          .set('authorization', token);
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('retorna um array', () => {
        expect(response.body).to.be.a('array');
      });
  
      it('retorna um array com length 12', () => {
        expect(response.body).to.has.length(12);
      });
  
      it('retorna um array de objetos', () => {
        expect(response.body[0]).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "_id"', () => {
        expect(response.body[0]).to.have.property('_id');
      });
  
      it('o objeto possui a propriedade "name"', () => {
        expect(response.body[0]).to.have.property('name');
      });
  
      it('o objeto possui a propriedade "powerstats"', () => {
        expect(response.body[0]).to.have.property('powerstats');
      });
  
      it('o objeto possui a propriedade "appearance"', () => {
        expect(response.body[0]).to.have.property('appearance');
      });
  
      it('o objeto possui a propriedade "work"', () => {
        expect(response.body[0]).to.have.property('work');
      });
  
      it('o objeto possui a propriedade "connections"', () => {
        expect(response.body[0]).to.have.property('connections');
      });
  
      it('o objeto possui a propriedade "image"', () => {
        expect(response.body[0]).to.have.property('image');
      });
  
      it('o objeto possui a propriedade "overall"', () => {
        expect(response.body[0]).to.have.property('overall');
      });
  
    });
  
    describe('Falha ao tentar buscar uma pagina sem autenticacao', () => {
  
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes?page=1');
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor "Token not found"', () => {
        expect(response.body.message).to.be.equal('Token not found');
      });
  
    });
  
  });
  
  describe('GET /heroes/:id', () => {
  
    describe('Busca um heroi atraves do id', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/60e8cef2849ece5d484ff622')
          .set('authorization', token);
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "_id"', () => {
        expect(response.body).to.have.property('_id');
      });
  
      it('o objeto possui a propriedade "name"', () => {
        expect(response.body).to.have.property('name');
      });
  
      it('o objeto possui a propriedade "powerstats"', () => {
        expect(response.body).to.have.property('powerstats');
      });
  
      it('o objeto possui a propriedade "appearance"', () => {
        expect(response.body).to.have.property('appearance');
      });
  
      it('o objeto possui a propriedade "work"', () => {
        expect(response.body).to.have.property('work');
      });
  
      it('o objeto possui a propriedade "connections"', () => {
        expect(response.body).to.have.property('connections');
      });
  
      it('o objeto possui a propriedade "image"', () => {
        expect(response.body).to.have.property('image');
      });
  
      it('o objeto possui a propriedade "overall"', () => {
        expect(response.body).to.have.property('overall');
      });
  
    });
  
    describe('Falha ao tentar buscar um heroi sem autenticacao', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/60e8cef2849ece5d484ff622');
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor "Token not found"', () => {
        expect(response.body.message).to.be.equal('Token not found');
      });
  
    });
  
  })
  
  describe('GET /heroes/mylist', () => {
  
    describe('Busca a lista de um usuario', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/mylist')
          .set('authorization', token);
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('retorna um array', () => {
        expect(response.body).to.be.a('array');
      });
  
      it('retorna um array com length 2', () => {
        expect(response.body).to.has.length(2);
      });
  
      it('retorna um array de objetos', () => {
        expect(response.body[0]).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "_id"', () => {
        expect(response.body[0]).to.have.property('_id');
      });
  
      it('o objeto possui a propriedade "name"', () => {
        expect(response.body[0]).to.have.property('name');
      });
  
      it('o objeto possui a propriedade "powerstats"', () => {
        expect(response.body[0]).to.have.property('powerstats');
      });
  
      it('o objeto possui a propriedade "appearance"', () => {
        expect(response.body[0]).to.have.property('appearance');
      });
  
      it('o objeto possui a propriedade "work"', () => {
        expect(response.body[0]).to.have.property('work');
      });
  
      it('o objeto possui a propriedade "connections"', () => {
        expect(response.body[0]).to.have.property('connections');
      });
  
      it('o objeto possui a propriedade "image"', () => {
        expect(response.body[0]).to.have.property('image');
      });
  
      it('o objeto possui a propriedade "overall"', () => {
        expect(response.body[0]).to.have.property('overall');
      });
  
    });
  
    describe('Falha ao buscar a lista de um usuario sem autenticacao', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/mylist');
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "type"', () => {
        expect(response.body).to.have.property('type');
      });
  
      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });
  
      it('a propriedade "type" tem o valor "invalid_token"', () => {
        expect(response.body.type).to.be.equal('invalid_token');
      });
  
      it('a propriedade "message" tem o valor "Token not found"', () => {
        expect(response.body.message).to.be.equal('Token not found');
      });
    });
  
  });
  
  describe('GET /heroes/quantity', () => {
    let response;
    let connectionMock;
  
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
      await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
      response = await chai
        .request(server)
        .get('/heroes/quantity');
    });
  
    after(async () => {
      await connectionMock.db('projects').collection('heroes').deleteMany({});
      MongoClient.connect.restore();
    });
  
    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
  
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
  
    it('o objeto possui a propriedade "heroesQuantity"', () => {
      expect(response.body).to.have.property('heroesQuantity');
    });
  
    it('a propriedade "heroesQuantity" tem o valor "12"', () => {
      expect(response.body.heroesQuantity).to.be.equal(12);
    });
  
  });
  
  describe('GET /heroes/search', () => {
  
    describe('busca herois por termo, autenticado', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/search?name=Darkseid')
          .set('authorization', token);
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
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
  
      it('o objeto possui a propriedade "_id"', () => {
        expect(response.body[0]).to.have.property('_id');
      });
  
      it('o objeto possui a propriedade "name"', () => {
        expect(response.body[0]).to.have.property('name');
      });
  
      it('o objeto possui a propriedade "powerstats"', () => {
        expect(response.body[0]).to.have.property('powerstats');
      });
  
      it('o objeto possui a propriedade "appearance"', () => {
        expect(response.body[0]).to.have.property('appearance');
      });
  
      it('o objeto possui a propriedade "work"', () => {
        expect(response.body[0]).to.have.property('work');
      });
  
      it('o objeto possui a propriedade "connections"', () => {
        expect(response.body[0]).to.have.property('connections');
      });
  
      it('o objeto possui a propriedade "image"', () => {
        expect(response.body[0]).to.have.property('image');
      });
  
      it('o objeto possui a propriedade "overall"', () => {
        expect(response.body[0]).to.have.property('overall');
      });
  
    });
  
    describe('busca herois por termo, nao autenticado', () => {
      let response;
      let connectionMock;
  
      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        await connectionMock.db('projects').collection('heroes').insertMany(mockPageOfHeroes);
  
        response = await chai
          .request(server)
          .get('/heroes/search?name=Darkseid');
      });
  
      after(async () => {
        await connectionMock.db('projects').collection('heroes').deleteMany({});
        MongoClient.connect.restore();
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
  
      it('o objeto possui a propriedade "_id"', () => {
        expect(response.body[0]).to.have.property('_id');
      });
  
      it('o objeto possui a propriedade "name"', () => {
        expect(response.body[0]).to.have.property('name');
      });
  
      it('o objeto possui a propriedade "powerstats"', () => {
        expect(response.body[0]).to.have.property('powerstats');
      });
  
      it('o objeto possui a propriedade "appearance"', () => {
        expect(response.body[0]).to.have.property('appearance');
      });
  
      it('o objeto possui a propriedade "work"', () => {
        expect(response.body[0]).to.have.property('work');
      });
  
      it('o objeto possui a propriedade "connections"', () => {
        expect(response.body[0]).to.have.property('connections');
      });
  
      it('o objeto possui a propriedade "image"', () => {
        expect(response.body[0]).to.have.property('image');
      });
  
      it('o objeto possui a propriedade "overall"', () => {
        expect(response.body[0]).to.have.property('overall');
      });
  
    });
  
  });

})
