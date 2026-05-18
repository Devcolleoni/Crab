var database = require("../database/config")


function entrada(params) {
    
    var sql = `
   select abastecido from coleta;
    
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}

module.exports = {
    entrada
};
