var moment = require('moment')
var helper = require('../helpers/helper.js')
var validator = require('validator')

const QUERY = {
  ADD_NEW_USER : "INSERT INTO T_USER SET ?"
}

module.exports = {
  addUser        : addUser
}

function addUser(req,res,next){
  var message     = []

  var fullName    = req.body.fullName
  var nickName    = req.body.nickName
  var password    = req.body.password
  var email       = req.body.email
  var phoneNumber = req.body.phoneNumber

  if((fullName==null || fullName==undefined))        message.push('Full name is mandatory')
  if((nickName==null || nickName==undefined))        message.push('Nick name is mandatory')
  if((password==null || password==undefined))        message.push('Password is mandatory')
  if((email==null || email==undefined))              message.push('Email is mandatory')
  if((phoneNumber==null || phoneNumber==undefined))  message.push('Phone number is mandatory')

  if(message.length>0){
    res.status(400).json({message : message })
  }
  else{
    var newUser = {
      full_name : fullName,
      nickname  : nickName,
      password  : password,
      email     : email,
      phone_number : phoneNumber
    }
    req.getConnection(function(err,connection){
      connection.query(QUERY.ADD_NEW_USER, newUser, function(err, rows){
        if(err)res.status(400).json({message : err})
        else{
          
          res.status(200).json({message : "sukses"})
        }
      })
    })
  }
}
