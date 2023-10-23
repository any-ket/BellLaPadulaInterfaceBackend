const { authDbCli } = require("../dal/dbClient");
const { StatusCodes } = require('http-status-codes');


function GetObject(reqData){
	return new Promise(async (resolve, reject) => {
		const user = reqData.user;
		const query = "SELECT Objects.idx, Objects.name, ACM.accessRight FROM Objects JOIN (SELECT * FROM ACM where ACM.uid=?) ON Objects.idx=ACM.oid";
		authDbCli.query(query, [user.idx], (err, res) => {
			if(err){
				console.error("Error in sql Query", err);
        		return reject();
			}

			return resolve({statusCode: StatusCodes.OK, responseData: res});
		});

	});
}


module.exports = {
	GetObject
}