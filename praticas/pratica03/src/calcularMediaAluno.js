function calcularMediaAluno(a1, a2, a3) {
    return 0;
}

function calcularMediaAluno2(a1, a2) {
    if (a1 === undefined || a2 === undefined) {
        throw Error("Notas a1 ou a2 não informadas"); 
    }
    return (a1 + a2) / 2;
}

function calcularMediaAluno3(a1, a2) {
    if (a1 < 0 || a2 < 0) {
        throw Error("Notas a1 ou a2 não podem ser negativas");
    }
    return (a1 + a2) / 2;
}

function calcularMediaAluno4(a1, a2, a3) {
    if (a3 === undefined) {
        return a1 * 0.4 + a2 * 0.6;
    }

    if (a3 < 0) {
        throw Error("Nota a3 não pode ser negativa");
    }

    return Math.max(a1 * 0.4 + a3 * 0.6, a3 * 0.4 + a2 * 0.6)
}
module.exports = {calcularMediaAluno, calcularMediaAluno2, calcularMediaAluno3, calcularMediaAluno4};