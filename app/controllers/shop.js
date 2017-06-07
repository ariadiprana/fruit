var moment = require('moment')
var helper = require('../helpers/helper.js')
var validator = require('validator')

const QUERY = {
  SELECT_SHOP_DETAIL : "SELECT SHOP.id, SHOP.name, SHOP.address, SHOP.logo, SHOP.phone_mobile, SHOP.phone_shop, SHOP.email, SHOP.dt_created, SHOP.dt_updated FROM SHOP WHERE SHOP.created_by = ?",
  SELECT_SHOP_BY_NAME : "SELECT SHOP.name FROM SHOP WHERE name = ?",
  ADD_NEW_SHOP: "INSERT INTO SHOP SET ?",
  UPDATE_SHOP_BY_CREATED_BY: "UPDATE SHOP SET ? WHERE created_by = ?"
}

module.exports = {
  getDetail      : getDetail,
  getEdit        : getEdit,
  postEdit       : postEdit,
  postAdd        : postAdd
}

function postAdd(req,res,next){
  //validation
  var message = []
  var name = req.body.name
  var address = req.body.address
  var phone_mobile = req.body.phone_mobile
  var phone_shop = req.body.phone_shop
  var email = req.body.email


  if(validator.isEmpty(name))message.push('Name is mandatory field')
  if(validator.isEmpty(address))message.push('Address is mandatory field')
  if(validator.isEmpty(email))message.push('Email is mandatory field')

  if(message.length>0){
    res.render('shop/shopAdd.ejs',{
      user : req.user,
      message : message
    })
  }
  else{
    //pass mandatory check . will continue to duplicate check
    req.getConnection(function(err,connection){
      connection.query(QUERY.SELECT_SHOP_BY_NAME,[name], function(err, shop){
        if(err)console.log(err)
        if(shop.length>0){
          message.push("Data is duplicated")
          res.render('shop/shopAdd.ejs',{
            user : req.user,
            message : message
          })
        }
        //pass duplicate check, continue to adding new record
        else{
          var newShop = {
              id: helper.generateUUID(),
              name: name,
              address: address,
              phone_mobile: phone_mobile,
              phone_shop: phone_shop,
              email: email, 
              dt_created: new Date(),
              created_by: req.user.id
          }
          req.getConnection(function(err,connection){
            connection.query(QUERY.ADD_NEW_SHOP, newShop, function(err, rows){
              if(err)console.log(err)
              req.getConnection(function(err,connection){
                connection.query(QUERY.SELECT_SHOP_DETAIL, [userId], function(err, shopDetail){
                    //render getList with message
                    res.render('shop/shopDetail.ejs',{
                      user : req.user,
                      shopDetail : shopDetail,
                      moment : moment,
                      message : `Shop has been successfully added`
                    })
                })
              })
            })
          })
        }
      })
    })
  }
}

function getDetail(req,res,next){
  userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_SHOP_DETAIL, [userId], function(err, shopDetail){
      console.log('shopDetail', shopDetail)
      if(shopDetail.length>0){
        res.render('shop/shopDetail.ejs',{
      		user : req.user,
          shopDetail : shopDetail,
          moment : moment,
          message : ''
      	})
      }
      else{
       res.render('shop/shopAdd.ejs',{
          user : req.user,
          moment : moment,
          message : ''
        }) 
      }
    })
  })
}


function getEdit(req,res,next){
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_SHOP_DETAIL, [userId], function(err, shopDetail){
      console.log('shopDetail', shopDetail)
      res.render('shop/shopEdit.ejs',{
          user : req.user,
          shopDetail : shopDetail,
          moment : moment,
          message : ''
        })
    })
  })
}

function postEdit(req,res,next){
  var userId = req.user.id
  //validation
  var message = []
  var name = req.body.name
  var address = req.body.address
  var phone_mobile = req.body.phone_mobile
  var phone_shop = req.body.phone_shop
  var email = req.body.email


  if(validator.isEmpty(name))message.push('Name is mandatory field')
  if(validator.isEmpty(address))message.push('Address is mandatory field')
  if(validator.isEmpty(email))message.push('Email is mandatory field')

  if(message.length>0){
    res.render('shop/shopAdd.ejs',{
      user : req.user,
      message : message
    })
  }
  else{
        //update 
          var newShop = {
              id: helper.generateUUID(),
              name: name,
              address: address,
              phone_mobile: phone_mobile,
              phone_shop: phone_shop,
              email: email, 
              dt_created: new Date(),
              created_by: req.user.id
          }
          req.getConnection(function(err,connection){
            connection.query(QUERY.UPDATE_SHOP_BY_CREATED_BY, [newShop,userId], function(err, rows){
              if(err)console.log(err)
              req.getConnection(function(err,connection){
                connection.query(QUERY.SELECT_SHOP_DETAIL, [userId], function(err, shopDetail){
                    //render getList with message
                    res.render('shop/shopDetail.ejs',{
                      user : req.user,
                      shopDetail : shopDetail,
                      moment : moment,
                      message : `Shop has been successfully updated`
                    })
                })
              })
            })
          })
  }
}





