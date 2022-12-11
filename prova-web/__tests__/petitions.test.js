const app = require("../index");
const supertest = require('supertest');
const client = require("../../config/dbConnection");


const baseUrl = "/api/petitions";
const authUrl = "/api/petitions/auth";
const signUrl = "/api/petitions/sign" 
const removeSignUrl = "/api/petitions/sign/remove"

//TESTE DE AUTENTICAÇÃO

describe('auth', () =>{
    describe('auth user', () =>{
        it('should return a 200', async () =>{
            await supertest(app).post(authUrl).send({email: "sla1234", password: "123"}).expect(200);
        })
    });
});

describe('invalid authentication', () => {
    it('should return a 404', async () => {
      await supertest(app).post(apiAuth).send({email: 'beltrano@souza.com', pass: 'beltrano124'}).expect(404)
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
        await supertest(app).get(`${baseUrl}/`+1).expect(200);
      });
    });
});

//TESTE DE INCLUSÃO 

describe('post peticao route', () => {
    describe('Post peticao', () => {
        it('should return a 200', async () => {
            await supertest(app).post(baseUrl).set('Authorization', 'sla1234').send({
                "titulo": "Teste título",
                "descricao": "Teste descição",
                "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Cabanel-L%27ange_d%C3%A9chu.JPG/250px-Cabanel-L%27ange_d%C3%A9chu.JPG"
            }).expect(200);
        });
    });
});


describe('post peticao route', () => {
    it('should return a 404', async () => {
        await supertest(app).post(baseUrl).set('Authorization', 'sla1234').send({
            "titulo": "Ajuda as plantas",
            "descricao": "",
            "foto": ""
        }).expect(404);
    });
});

describe('given the peticoes does not exist', () => {
    it('should return a 404', async () => {
      await supertest(app).get(`${baseUrl}/637641fd812566f758852115`).expect(404);
    })
});
//TESTE DE ALTERAÇÃO 

describe('put peticao route', () => {
    describe('update one peticao', () => {
      it('should return a 200', async () => {
        await supertest(app).put(`${baseUrl}/`+1).set('x-access-token', token).send({titulo: 'Teste 2', descricao: 'Teste 2'}).expect(200);
      });
    });
  });
  
  describe('put peticao route', () => {
    it('should return a 404', async () => {
      await supertest(app).put(`${baseUrl}/637641fd812566f758852115`).set('x-access-token', token).send({titulo: 'Teste', descricao: 'Teste'}).expect(404);
    });
  });

//TESTE DE DELEÇÃO

describe('delete peticao route', () => {
    it('should return a 401', async () => {
      await supertest(app).delete(`${api}/`+peticao).expect(401);
    });
  });
  
  describe('delete peticao route', () => {
    it('should return a 404', async () => {
      await supertest(app).delete(`${baseUrl}/637641fd812566f758852115`).set('x-access-token', token).expect(404);
    });
  });
  
  describe('delete peticao route', () => {
    describe('delete one peticao', () => {
      it('should return a 200', async () => {
        await supertest(app).delete(`${baseUrl}/`+1).set('x-access-token', token).expect(200);
      });
    });
  });

  describe('remove sign petition', () => {
    describe('remove sign petition with authentication ', () => {
      it('should return a 200', async () => {
        await supertest(app).delete(`${removeSignUrl}/`+1).set('x-access-token', token).expect(200);
      });
    });
  });

  describe('invalid authentication', () => {
    it('should return a 401', async () => {
      await supertest(app).delete(`${removeSignUrl}/`+1).expect(401);
  }); 
  });
  
  describe('invalid peticao', () => {
    it('should return a 404', async () => {
      await supertest(app).delete(`${removeSignUrl}/637641fd812566f758852115`).set('x-access-token', token).expect(404);
    });
  });