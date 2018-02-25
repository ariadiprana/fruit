
var uuidV1 = require('uuid/v1');
var uuid = require('small-uuid');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js')
var validator = require('validator')

var JWTSecretKey = config.JWTSecret

module.exports = {
  generateUUID: generateUUID,
  generateShortUUID: generateShortUUID,
  isTokenValid: isTokenValid
}

function generateUUID(){
  var UUID = uuidV1()
  return UUID.replace(/-/g,"")
};

function generateShortUUID(){
  var id = uuid.create();
  return(id)
}

function isTokenValid(token){
  var isTokenValid = false
  if(validator.isEmpty(token)){
    return isTokenValid
  }
  jwt.verify(token, JWTSecretKey, function(err,decoded){
      isTokenValid = true
      console.log('decoded : ',decoded)
      return isTokenValid
  })
  return isTokenValid
}
