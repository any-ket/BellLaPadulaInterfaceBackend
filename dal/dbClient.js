const mysql = require("mysql");
const logger = require("logger");
const authDbCli = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'current password',
  database: 'auth',
  multipleStatements: true
});

function InitialiseSqlClients(){
  return new Promise((resolve, reject) => {
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