const { authDbCli } = require("../dal/dbClient");
const { StatusCodes } = require('http-status-codes');


function GetObject(reqData){
	return new Promise(async (resolve, reject) => {
		const user = reqData.user;
		const query = "SELECT Objects.idx, Objects.name, UACM.accessRight FROM Objects JOIN (SELECT * FROM ACM where ACM.uid=?) as UACM ON Objects.idx=UACM.oid";
		authDbCli.query(query, [user.idx], (err, res) => {
			if(err){
				console.error("Error in sql Query", err);
        		return reject();
			}

			return resolve({statusCode: StatusCodes.OK, responseData: res});
		});

	});
}

function CreateObject(reqData){
	return new Promise(async (resolve, reject) => {
		const user = reqData.user;

		try{
			var {objectName} = reqData.body;
		}catch(e){
			console.error("CreateObject", e);
			return resolve({statusCode: StatusCodes.BAD_REQUEST, responseData: "Missing mandatory parameters!"});
		}
		const query = "Insert INTO Objects(name) VALUES(?)";
		authDbCli.query(query, [objectName], (err, res) => {
			if(err){
				console.error("Error in sql Query", err);
        		return reject();
			}

			const oid = res.insertId;
			let accessRights = [1, 2, 3];

			let values = [];

			accessRights.forEach(right => {
				values.push([oid, user.idx, right]);
			}) 
			const acmQuery = "INSERT INTO ACM(oid, uid, accessRight) VALUES ?";
			authDbCli.query(acmQuery, [values],(err) => {
				if(err){
					console.error("Error in sql Query", err);
	        		return reject();
				}
				return resolve({statusCode: StatusCodes.OK, responseData: res});
			});	
		});

	});
}


module.exports = {
	GetObject,
	CreateObject
}