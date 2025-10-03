const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

test("GET /tarefas deve retornar 200", async () => {
    const response = await request.get("/tarefas");
    expect(response.status).toBe(200).json();
})

test("POST /tarefas deve retornar 201", async () => {
    const dados = {nome: "Estudar Node", concluida: false};
    const response = await request.post("/tarefas").send(dados);
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeDefined();
    id = parseInt(response.body.id);
})

// Letra (G)
test('GET /tarefas/id deve retornar 200', async () => {
    const response = await request.get(`/tarefas/${id}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
})

// Letra (H)
test("GET /tarefas/1 retorna 404", async () => {
    const response = await request.get(`/tarefas/1`)
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);

})

// Letra (I)
test("PUT /tarefas/id deve retornar 200", async () => {
    const dados = {nome: "Estudar Node", concluida: true};
    const response = await request.put(`/tarefas/${id}`).send(dados);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.nome).toBe(dados.nome);
    expect(response.body.concluida).toBe(true);
})

// Letra (J)
test("PUT /tarefas/1 retorna 404", async () => {
    const response = await request.put(`/tarefas/1`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
})