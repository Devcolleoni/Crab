var database = require("../database/config")


function entrada(filial, qtdVao, qtdVaoAbastecido) {

    const sql = `
    SELECT * FROM vw_tx_abastecimento;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}
function entrada2(total_sensores, id_sensor, abastecido, hora, dia_coleta ) {

    const sql = `
    SELECT * FROM vw_ociosidade;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}

module.exports = {
    entrada,
    entrada2

};
