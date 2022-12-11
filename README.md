# Prova Web

Url de hospedagem: 

GET -> http://localhost:3000/api/petitions/ -> Requisição que traz todas as petições

GET -> http://localhost:3000/api/petitions/:id -> Requisição que traz uma petição através do ID

POST -> http://localhost:3000/api/petitions -> Requisição que inclui uma nova petição

POST -> http://localhost:3000/api/petitions/auth -> Requisição que gera um token de autenticação {email:sla1234 - password:123}

PUT ->  http://localhost:3000/api/petitions/:id -> Requisição que altera o título e a descrição da petição através do ID 

PUT ->  http://localhost:3000/api/petitions/sign/ -> Requisição que assina a petição utilizando o atual usuário autenticado

DEL -> http://localhost:3000/api/petitions/:id -> Requisição que deleta a petição através do ID, apenas o usuário que criou pode fazer isso  

DEL -> http://localhost:3000/api/petitions/sign/remove/:id -> Requisição que remove a assinatura feita pelo usuário

COLLECTION UTILIZADA: https://drive.google.com/drive/u/1/folders/1IdoAtShTyykKT4QHADpPM6ngEDE_b6LZ