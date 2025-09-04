const { calcularMediaAluno3 } = require('../src/calcularMediaAluno');
const { calcularMediaAluno4 } = require('../src/calcularMediaAluno');
const { calcularMediaAluno2 } = require('../src/calcularMediaAluno');
const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test("6 + 7 + 8 / 3", () => {
    expect(calcularMediaAluno).toBeDefined();
})

test("se a1 || b2 = undefined entao Notas a1 ou a2 não informadas", () => {
    expect(() => calcularMediaAluno2(8, undefined)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno2(undefined, 7)).toThrow("Notas a1 ou a2 não informadas");
})

test("se a1 || a2 = negativos", () => {
    expect(() => calcularMediaAluno3(-1, 4)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno3(7, -3)).toThrow("Notas a1 ou a2 não podem ser negativas");
})

test("aplicacao da a3", () => {
    expect(calcularMediaAluno4(7, 9)).toBeCloseTo(8.2);
    expect(() => calcularMediaAluno4(6, 8, -2)).toThrow("Nota a3 não pode ser negativa");
})