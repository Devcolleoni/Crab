
var database = require("../database/config")

function cadastrarFilial(razaoSocialVar, cnpjVar, cepVar, idMatrizVar) {
    console.log("ACESSEI O FILIAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocialVar, cnpjVar, cepVar, idMatrizVar);

    console.log("razaoSocialVar:", razaoSocialVar)
    console.log("cnpjVar:", cnpjVar)
    console.log("cepVar:", cepVar)
    console.log("idMatrizVar:", idMatrizVar)

    var instrucaoSql = `
         INSERT INTO  filial (razao_social, cnpj, cep, id_matriz) VALUES ('${razaoSocialVar}','${cnpjVar}','${cepVar}', ${idMatrizVar});
         `;
    console.log("SQL:", instrucaoSql)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("ID MATRIZ:", idMatrizVar)
    return database.executar(instrucaoSql);
}

function cadastrarResponsavel(nomeVar, cpfVar, emailVar, senhaVar, idMatriz, idFilial) {
    console.log("ACESSEI O FILIAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeVar, cpfVar, emailVar, senhaVar);

    var instrucaoSql = `
    INSERT INTO usuario (nome, cpf, email, senha) VALUES ('${nomeVar}','${cpfVar}','${emailVar}','${senhaVar}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then((resultado) => {

            let idUsuario = resultado.insertId

            var instrucaoResponsavel = `
            INSERT INTO funcionario (id_matriz, id_filial, id_usuario, id_cargo) VALUES ('${idMatriz}', '${idFilial}', '${idUsuario}', 3);
            `
                ;

            return database.executar(instrucaoResponsavel);
        })
}

function listarFiliais(idMatriz) {

    var instrucaoSql = `
        SELECT f.id_filial, f.razao_social, f.cnpj, u.email
        FROM filial f
        LEFT JOIN funcionario func ON func.id_filial = f.id_filial
        LEFT JOIN usuario u ON u.id_usuario = func.id_usuario
        WHERE f.id_matriz = ${idMatriz};
        `

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);

}
function listarFiliaisMatriz(idMatriz) {

    var instrucaoSql = `
   SELECT 
    f.id_filial,
    f.id_matriz,
    f.razao_social,
    COUNT(v.id_vao) AS total_vaos,
    ROUND(
        IFNULL(SUM(c.abastecido), 0) / NULLIF(COUNT(v.id_vao), 0) * 100
    , 0) AS entrada,
    ROUND(
        (COUNT(v.id_vao) - IFNULL(SUM(c.abastecido), 0)) / NULLIF(COUNT(v.id_vao), 0) * 100
    , 0) AS saida,
    CASE 
        WHEN ROUND((COUNT(v.id_vao) - IFNULL(SUM(c.abastecido), 0)) / NULLIF(COUNT(v.id_vao), 0) * 100, 0) < 30 THEN 'vermelho'
        WHEN ROUND((COUNT(v.id_vao) - IFNULL(SUM(c.abastecido), 0)) / NULLIF(COUNT(v.id_vao), 0) * 100, 0) < 60 THEN 'amarelo'
        ELSE 'azul'
    END AS status
FROM filial f
LEFT JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
LEFT JOIN sensor s ON v.id_vao = s.id_vao
LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
WHERE f.id_matriz = ${idMatriz}
GROUP BY f.id_filial, f.id_matriz, f.razao_social
        `

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);

}



function listarResponsaveis(idMatriz) {

    var instrucaoSql = `
    SELECT u.id_usuario, u.nome, u.email
    FROM usuario u
    WHERE u.id_usuario IN (
    SELECT DISTINCT f.id_usuario
    FROM funcionario f
    WHERE f.id_matriz = ${idMatriz}
      AND f.id_cargo = 3); `
    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function vincularResponsavel(idUsuario, idFilial, idMatriz) {

    var instrucaoSql = `
    UPDATE funcionario 
        SET id_usuario = ${idUsuario}
        WHERE id_filial = ${idFilial} 
          AND id_matriz = ${idMatriz} 
          AND id_cargo = 3;`

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function excluirFilial(idFilial) {
    console.log("ACESSEI O FILIAL MODEL - Iniciando os delets completos da filial ID:", idFilial)



    var sqlColetas = `
    DELETE FROM coleta 
    WHERE id_sensor IN (SELECT id_sensor FROM sensor WHERE id_vao IN (
    SELECT id_vao FROM vao WHERE id_filial = ${idFilial}));`

    var sqlSensores = `
    DELETE FROM sensor 
    WHERE id_vao IN (SELECT id_vao FROM vao WHERE id_filial = ${idFilial}
    );`

    var sqlVaos = `
    DELETE FROM vao WHERE id_filial = ${idFilial};`

    var sqlFuncionarios = `
    UPDATE funcionario SET id_filial = NULL WHERE id_filial = ${idFilial};`


    var sqlFilial = `
    DELETE FROM filial WHERE id_filial = ${idFilial};`;

    return database.executar(sqlColetas)

        .then(() => {
            console.log("Coletas dos sensores apagadas.")
            return database.executar(sqlSensores)
        })
        .then(() => {
            console.log("Sensores dos vãos apagados.")
            return database.executar(sqlVaos)
        })
        .then(() => {
            console.log("Vãos da filial apagados.")
            return database.executar(sqlFuncionarios)
        })
        .then(() => {
            console.log("Vínculos de funcionários removidos.")
            return database.executar(sqlFilial)
        })
        .then(() => {
            console.log("Filial excluída com sucesso absoluto!")
        })
}

module.exports = {
    cadastrarFilial,
    cadastrarResponsavel,
    listarFiliais,
    listarFiliaisMatriz,
    listarResponsaveis,
    vincularResponsavel,
    excluirFilial
}

