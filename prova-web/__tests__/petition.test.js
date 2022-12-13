const app = require("../index");
const supertest = require('supertest');

const baseUrl = "/api/petitions";
const authUrl = "/api/petitions/auth";

//TESTE DE AUTENTICAÇÃO

describe('auth', () =>{
    describe('auth user', () =>{
        it('should return a 200', async () =>{
            await supertest(app).post("/api/petitions/auth").send({email: "sla1234", password: "123"}).expect(200);
        })
    });
});

describe('auth invalid' , () =>{
  describe('invalid auth user', () =>{
      it('should return a 500', async () =>{
          await supertest(app).post("/api/petitions/auth").send({email: "1", password: "123"}).expect(401);
      })
  });
});

//TESTE DE CONSULTA
describe('get peticao route', () => {
    describe('get all peticoes', () => {
      it('should return a 200', async () => {
        await supertest(app).get(baseUrl).expect(200);
      });
    });
});

describe('get peticao route', () => {
    describe('get peticao by id', () => {
      it('should return a 200', async () => {
        await supertest(app).get(`${baseUrl}/`+"639520802c547db1a6c2bd79").expect(200);
      });
    });
});

describe('invalid get peticao by id route', () => {
  describe('get peticao by id', () => {
    it('should return a 200', async () => {
      await supertest(app).get(`${baseUrl}/`+"1").expect(404);
    });
  });
});


