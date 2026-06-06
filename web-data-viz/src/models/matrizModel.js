var database = require("../database/config");

function listarPainelFiliais(idMatriz) {
    console.log("ACESSEI O MATRIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPainelFiliais():", idMatriz);

    var instrucaoSql = `
        SELECT
            f.id_filial,
            f.razao_social AS nome,
            COUNT(c.id_coleta) AS total_leituras,
            IFNULL(SUM(c.abastecido), 0) AS leituras_abastecidas,
            ROUND(IFNULL(SUM(c.abastecido) / NULLIF(COUNT(c.id_coleta), 0) * 100, 0)) AS entrada,
            ROUND(IFNULL((COUNT(c.id_coleta) - SUM(c.abastecido)) / NULLIF(COUNT(c.id_coleta), 0) * 100, 0)) AS saida
        FROM filial f
        LEFT JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
        LEFT JOIN sensor s ON v.id_vao = s.id_vao
        LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
        WHERE f.id_matriz = ${idMatriz}
        GROUP BY f.id_filial, f.razao_social;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPainelFiliais
};
