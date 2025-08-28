import { soma, subtracao, multiplicacao, divisao } from "./index.js";

console.log('Teste da função soma()');
if (soma(2,2) === 4) console.log("Passou 1º!")
    else console.log("Falhou 1º!");

if (soma(-1, 2) === 1) console.log("Passou 2º!")
    else console.log("Falhou 2º!");

if (soma(2, 0) === 2) console.log("Passou 3º!")
    else console.log("Falhou 3º!");

console.log('Teste da função subtração()');
if (subtracao(10, 6) === 4) console.log("Passou 1º!")
    else console.log("Falhou 1º!");

if (subtracao(2, 1) === 1) console.log("Passou 2º!")
    else console.log("Falhou 2º!");

if (subtracao(2, 0) === 2) console.log("Passou 3º!")
    else console.log("Falhou 3º!");

console.log('Teste da função multiplicação()');
if (multiplicacao(10, 6) === 60) console.log("Passou 1º!")
    else console.log("Falhou 1º!");

if (multiplicacao(-2, 1) === -2) console.log("Passou 2º!")
    else console.log("Falhou 2º!");

if (multiplicacao(-4, 0) === 0) console.log("Passou 3º!")
    else console.log("Falhou 3º!");

if (multiplicacao(-5, -5) === 25) console.log("Passou 4º!")
    else console.log('Falhou 4º!');

console.log('Teste da função divisao()');
if (divisao(10, 2) === 5) console.log("Passou 1º!")
    else console.log("Falhou 1º!");

if (divisao(4, -2) === -2) console.log("Passou 2º!")
    else console.log("Falhou 2º!");

if (divisao(20, 0) === undefined) console.log("Passou 3º!")
    else console.log("Falhou 3º!");