const { authDbCli } = require("../dal/dbClient");
var bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

function Signup(reqData){
  return new Promise(async (resolve, reject) => {
    try{
      var { name, email, password } = reqData.body;
    }catch(e){
      logger.error("Invalid ReqBody", e);
      return reject({statusCode: StatusCodes.BAD_REQUEST, responseData: "Invalid Request"});
    }

    if(!password || !password.length)
      return resolve({statusCode: StatusCodes.BAD_REQUEST, responseData: "Invalid password"});

    const hash = await bcrypt.hash(password, 10);
    const values = [[name, email, hash]];
    authDbCli.query(`INSERT INTO Users(name, email, pwd) VALUES ?`, [values], (err, result) => {
      if(err){
        console.error("Error in sql Query", err);
        return reject({statusCode: StatusCodes.SERVICE_UNAVAILABLE, responseData: "Something went wrong!"});
      }
      return resolve({statusCode: StatusCodes.OK, responseData: {}});
    });
  });
} 


function Login(reqData){
  return new Promise((resolve, reject) => {
    try{
      var {email, password} = reqData.body;
    }catch(e){
      logger.ersror("Invalid ReqBody", e);
      return resolve({statusCode: StatusCodes.BAD_REQUEST, responseData: "Invalid Request"});
    }


    authDbCli.query("SELECT pwd, name, email, idx from Users where email=?", [email], (err, result) => {
      if(err){
        console.error("Error in sql Query", err);
        return reject();
      }
      try{
        var isPassCorrect = bcrypt.compareSync(password, result[0].pwd);
      }catch(e){
        console.log("SQL error", e);
      }

      if(!isPassCorrect)
        return resolve({statusCode: StatusCodes.UNAUTHORIZED, responseData: "Authentication Failed!"});
      delete result[0].pwd;
      console.log(result);
      reqData.session.idx = result[0].idx;
      reqData.session.name = result[0].name;
      reqData.session.email = result[0].email;
      reqData.session.save();

      return resolve({statusCode: StatusCodes.OK, responseData: result[0]});
    });
  });
}

function IsLoggedIn(reqData){
  return new Promise((resolve) => {
    if(reqData.session.idx)
      return resolve({statusCode: StatusCodes.OK, responseData: {idx: reqData.session.idx, mob: reqData.session.mob, name: reqData.session.name, email: reqData.session.email, isLoggedIn: true}});
    return resolve({statusCode: StatusCodes.OK, responseData: {isLoggedIn: false}});
  });
}

module.exports = {
  Signup,
  Login,
  IsLoggedIn
};
