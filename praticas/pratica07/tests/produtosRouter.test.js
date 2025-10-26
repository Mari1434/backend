const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

const url = "/produtos";

let id;

describe("Testes para o recurso /produtos", () => {
    
    test("POST /produtos - Cria um produto com sucesso", async () => {
        const response = await request.post(url).send({ "nome": "Laranja", "preco": 10.0 });
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja");
        expect(response.body.preco).toBe(10.0);
        
        id = response.body._id;
    });

    test("POST /produtos - Deve falhar (422) se não enviar dados", async () => {
        const response = await request.post(url).send({});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
    });

    test("GET /produtos - Deve listar todos os produtos", async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Array));
    });

    test("GET /produtos/:id - Deve buscar o produto criado", async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBe(id);
        expect(response.body.nome).toBe("Laranja");
    });

    test("GET /produtos/:id - Deve falhar (400) com ID inválido", async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test("GET /produtos/:id - Deve falhar (404) com ID inexistente", async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });

    test("PUT /produtos/:id - Deve atualizar o produto criado", async () => {
        const dadosAtualizados = { "nome": "Laranja Pera", "preco": 18.00 };
        const response = await request.put(`${url}/${id}`).send(dadosAtualizados);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.nome).toBe("Laranja Pera");
        expect(response.body.preco).toBe(18.00);
    });

    test("PUT /produtos/:id - Deve falhar (422) se não enviar dados", async () => {
        const response = await request.put(`${url}/${id}`).send({}); 
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
    });

    test("PUT /produtos/:id - Deve falhar (400) com ID inválido", async () => {
        const response = await request.put(`${url}/0`).send({ "nome": "a", "preco": 1 });
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test("PUT /produtos/:id - Deve falhar (404) com ID inexistente", async () => {
        const dados = { "nome": "Laranja Pera", "preco": 18.00 };
        const response = await request.put(`${url}/000000000000000000000000`).send(dados);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });

    test("DELETE /produtos/:id - Deve deletar o produto criado", async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(204);
    });

    test("DELETE /produtos/:id - Deve falhar (400) com ID inválido", async () => {
        const response = await request.delete(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test("DELETE /produtos/:id - Deve falhar (404) com ID inexistente", async () => {
        const response = await request.delete(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });
});