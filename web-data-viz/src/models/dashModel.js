var database = require("../database/config")


function entrada(filial, qtdVao, qtdVaoAbastecido) {

    const sql = `
    SELECT * FROM vw_tx_abastecimento;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}
function entrada2(dt_coleta, horas, minutos) {

    const sql = `
    SELECT 
	DATE_FORMAT(dt_coleta, '%d/%m/%Y') dt_coleta,
	DATE_FORMAT(dt_coleta, '%H') horas,
	DATE_FORMAT(dt_coleta, '%i') minutos
	FROM coleta 
	WHERE id_sensor = 1 
	AND abastecido = 1 
    ORDER BY dt_coleta 
    DESC LIMIT 10;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}

module.exports = {
    entrada,
    entrada2

};
