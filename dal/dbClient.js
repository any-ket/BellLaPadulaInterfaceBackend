const mysql = require("mysql");
const logger = require("logger");
var authDbCli;

function InitialiseSqlClients(){
  return new Promise((resolve, reject) => {
    authDbCli = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'auth',
      multipleStatements: true
    });

    authDbCli.connect((err) => {
      if(err){
        logger.error("Failed Initialising Sql Client!!", err);
        return reject(err);
      }

      logger.info("Connected to SQL Server successfully!");

      return resolve(authDbCli);
    })
  });
}


module.exports = {
  InitialiseSqlClients,
  authDbCli,
};