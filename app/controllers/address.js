var moment = require('moment')
var helper = require('../helpers/helper.js')
var constants = require('../helpers/constant.js')
var config = require('../../config/config.js')
var validator = require('validator')

const QUERY = {

}

module.exports = {
    addAddressByUserId : addAddressByUserId
}

function addAddressByUserId(req,res,next){
    var message     = []
    var token       = req.body.token+''

    if(validator.isEmpty(token)){
        console.log("MASUK")
        message.push('Token is mandatory') 
    }

    // if(message.length>0){res.status(400).json({message : message}).end()}
    // if(helper.isTokenValid(token)){
    //     var lat         = req.body.lat+''
    //     var lng         = req.body.lng+''
    //     var isPrimary   = req.body.isPrimary+''
    //     var note        = req.body.note+''
    //     var address     = req.body.address+''
    //     var province    = req.body.province+''
    //     var city        = req.body.city+''
    //     var district    = req.body.district+''
    //     var postalCode  = req.body.postalCode+''
    //     var userID      = req.body.userID+'' 

    //     if(validator.isEmpty(lat))          message.push("Latitude is mandatory")
    //     if(validator.isEmpty(lng))          message.push("Longitude is mandatory")
    //     if(validator.isEmpty(isPrimary))    message.push("isPrimary is mandatory")
    //     if(validator.isEmpty(address))      message.push("Address is mandatory")
    //     if(validator.isEmpty(province))     message.push("Province is mandatory")
    //     if(validator.isEmpty(city))         message.push("City is mandatory")
    //     if(validator.isEmpty(district))     message.push("District is mandatory")
    //     if(validator.isEmpty(postalCode))   message.push("Postal Code is mandatory")
    //     res.status(200).json({message : "sukses"}).end()
    // }else{
    //     message.push("Token is not valid")
    // }
}