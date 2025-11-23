const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const mongoose = require('mongoose');

describe('/usuarios', () => {

    let token;
    let userId;

    beforeAll(async () => {
        const dados = { email: "usuario@email.com", senha: "abcd1234" };
        const response = await request.post('/usuarios').send(dados);
        userId = response.body._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /usuarios', async () => {
        const dados = {  email: "usuario@email.com", senha: "abcd1234" };
        const response = await request.post('/usuarios').send(dados);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        userId = response.body._id;
        expect(response.body.email).toBe(dados.email);
    });

    test('POST /usuarios', async () => {
        const response = await request.post('/usuarios').send({});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Email e Senha são obrigatórios");
    });

    test('POST /usuarios/login', async () => {
        const dados = { usuario: "usuario@email.com", senha: "abcd1234" };
        const response = await request.post('/usuarios/login').send(dados);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('POST /usuarios/login', async () => {
        const dados = { email: "usuario@email.com", senha: "senhaerrada" };
        const response = await request.post('/usuarios/login').send(dados);
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Credenciais inválidas");
    });

    test('POST /usuarios/renovar', async () => {
        const response = await request.post("/usuarios/renovar").set("authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /usuarios/renovar', async () => {
        const response = await request.post("/usuarios/renovar").set("authorization", "Bearer 123456789");
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Token invalido");
    });

    test('DELETE /usuarios/:id', async () => {
        const response = await request.delete(`/usuarios/${userId}`).set("authorization", `Bearer ${token}`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });
});