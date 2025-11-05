const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("/produtos", () => {
  let authToken;
  it('GET/produtos', async () => {
    const response = await request.get("/produtos");

    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toHaveProperty("msg");
    expect(response.body.msg).toBe("Não autorizado");
  });

  it('GET/produtos', async () => {
    const tokenInvalido = "123456789";

    const response = await request.get("/produtos").set("authorization", tokenInvalido);

    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body.msg).toBe("Token inválido");
  });

  it('POST/usuarios/login', async () => {
    const credenciais = {
      email: "email@exemplo.com",
      senha: "abcd1234",
    };

    const response = await request.post('/usuarios/login').send(credenciais);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toHaveProperty("token");

    authToken = response.body.token;
  });

  it('GET/produtos', async () => {
    if (!authToken) {
      throw new Error("Token não foi obtido no teste de login.");
    }

    const response = await request
      .get("/produtos")
      .set("authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  it('POST/usuarios/renovar', async () => {
    if (!authToken) {
      throw new Error("Token não foi obtido no teste de login.");
    }

    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toHaveProperty("token");

    authToken = response.body.token;
  });

  it('GET/produtos', async () => {
    if (!authToken) {
      throw new Error("Token renovado não foi obtido no teste anterior.");
    }

    const response = await request
      .get("/produtos")
      .set("authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });
});