var moment = require('moment')
var helper = require('../helpers/helper.js')
var constants = require('../helpers/constant.js')
var config = require('../../config/config.js')
var validator = require('validator')


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var JWTSecretKey = config.JWTSecret

const QUERY = {
  ADD_NEW_USER : "INSERT INTO T_USER SET ?",
  SELECT_USER_BY_EMAIL : "SELECT ID, PASSWORD, FULL_NAME, NICKNAME, EMAIL, PHONE_NUMBER, SHOP_ID FROM T_USER WHERE EMAIL = ?",
}

module.exports = {
  signup        : signup,
  checkToken    : checkToken,
  signin        : signin
}

function signup(req,res,next){
  var message     = []

  var fullName    = req.body.fullName+''
  var nickName    = req.body.nickName+''
  var password    = req.body.password+''
  var email       = req.body.email+''
  var phoneNumber = req.body.phoneNumber+''
  var type        = constants.USER_TYPE.BUYER

  if(validator.isEmpty(fullName))       message.push('Full name is mandatory')
  if(validator.isEmpty(nickName))       message.push('Nick name is mandatory')
  if(validator.isEmpty(password))       message.push('Password is mandatory')
  if(validator.isEmpty(email))          message.push('Email is mandatory')
  if(validator.isEmpty(phoneNumber))    message.push('Phone number is mandatory')
  if(!validator.isEmail(email))         message.push("Email format is not correct")
  if(!validator.isNumeric(phoneNumber)) message.push("Phone number format is not correct")
  
  if(message.length>0){res.status(400).json({message : message}).end()}

  var newUser = {
    full_name     : fullName,
    nickname      : nickName,
    password      : bcrypt.hashSync(password, 8),
    email         : email,
    phone_number  : phoneNumber,
    type          : type
  }
  req.getConnection(function(err,connection){
    // check duplicate email
    connection.query(QUERY.SELECT_USER_BY_EMAIL, email, function(err, rows){
      if(err)res.status(400).json({message : err}).end()
      if(rows.length>0){
        message.push("Email is already registered")
        res.status(400).json({message : message}).end()
      }else{
        connection.query(QUERY.ADD_NEW_USER, newUser, function(err, rows){
          if(err)res.status(400).json({message : err}).end()
          else{
            var token = jwt.sign({ id: rows.insertId }, JWTSecretKey)
            res.status(200).json({ id: rows.insertId, token: token }).end()
          }
        })
      }
    })
  })
}

function checkToken(req,res,next){
  var message = []
  var token   = req.body.token+''
  
  if(validator.isEmpty(token)) message.push('Token is mandatory')
  if(message.length>0){res.status(400).json({message : message}).end()}
  
  jwt.verify(token, JWTSecretKey, function(err,decoded){
    if(err)res.status(400).json(err).end()
    message.push("Token is valid")
    res.status(200).json({message : message}).end()
  })
}

function signin(req,res,next){
  var message     = []
  var email       = req.body.email+''
  var password    = req.body.password+''

  if(validator.isEmpty(email))    message.push('Email is mandatory')
  if(validator.isEmpty(password)) message.push('Password is mandatory')

  if(message.length>0)res.status(400).json({message : message}).end()

  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_USER_BY_EMAIL, [email], function(err,user){
      if(err)res.status(400).json(err).end()
      else if(user.length==0){
        message.push("Email is not registered")
        res.status(400).json({message : message}).end()
      }
      else if(user.length>0){
        console.log('PASSWORD :',user[0].PASSWORD)
        var passwordIsValid = bcrypt.compareSync(password, user[0].PASSWORD)
        console.log('passwordIsValid : ', passwordIsValid)
        if(!passwordIsValid){
          message.push("Password is not correct")
          console.log(res.status)
          res.status(400).json({message : message}).send()
        }
        else{
          var token = jwt.sign({ id: user.ID }, JWTSecretKey)
          res.status(200).json({ id: user[0].ID, token: token }).end()
        }
      }
      else{
        res.status(400).json({message : "something weird in user.js-signin()"}).end()
      }
    })
  })
}