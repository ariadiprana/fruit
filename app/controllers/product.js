var moment = require('moment')
var helper = require('../helpers/helper.js')
var validator = require('validator')

const QUERY = {
  SELECT_ALL_PRODUCT_BY_USER_ID : "SELECT PRODUCT.id, PRODUCT.name, PRODUCT.description, PRODUCT.image_url, MT_TIPE_SATUAN.name as tipe_satuan_name, PRODUCT.price, MT_CATEGORY.NAME AS category_name, PRODUCT.min_buy, PRODUCT.status_stok, PRODUCT.dt_created, user.fullName FROM PRODUCT INNER JOIN USER on PRODUCT.created_by = USER.id INNER JOIN MT_TIPE_SATUAN ON MT_TIPE_SATUAN.ID = PRODUCT.tipe_satuan_id INNER JOIN MT_CATEGORY ON MT_CATEGORY.ID = PRODUCT.category_id WHERE USER.ID = ?",
  SELECT_PRODUCT_BY_SHOP_ID : "SELECT PRODUCT.id FROM PRODUCT WHERE SELLER_ID = ? AND NAME = ?",
  SELECT_PRODUCT_DETAIL_BY_ID : "SELECT PRODUCT.id, PRODUCT.name, PRODUCT.description, PRODUCT.image_url, MT_TIPE_SATUAN.ID as tipe_satuan_id, MT_TIPE_SATUAN.name as tipe_satuan_name, PRODUCT.price, MT_CATEGORY.ID as category_id, MT_CATEGORY.NAME AS category_name, PRODUCT.min_buy, PRODUCT.status_stok, PRODUCT.dt_created, user.fullName FROM PRODUCT INNER JOIN USER on PRODUCT.created_by = USER.id INNER JOIN MT_TIPE_SATUAN ON MT_TIPE_SATUAN.ID = PRODUCT.tipe_satuan_id INNER JOIN MT_CATEGORY ON MT_CATEGORY.ID = PRODUCT.category_id WHERE PRODUCT.ID = ?",
  ADD_NEW_PRODUCT : "INSERT INTO PRODUCT SET ?",
  DELETE_PRODUCT_BY_PRODUCT_ID : "DELETE FROM PRODUCT WHERE ID = ?",
  SELECT_SHOP_DETAIL : "SELECT SHOP.id, SHOP.name, SHOP.address, SHOP.logo, SHOP.phone_mobile, SHOP.phone_shop, SHOP.email, SHOP.dt_created, SHOP.dt_updated FROM SHOP WHERE SHOP.created_by = ?",
  SELECT_ALL_CATEGORY : "SELECT * FROM MT_CATEGORY ORDER BY NAME",
  SELECT_ALL_TIPE_SATUAN : "SELECT * FROM MT_TIPE_SATUAN ORDER BY NAME",
  UPDATE_PRODUCT_BY_ID : "UPDATE PRODUCT SET ? WHERE ID = ?"
}

module.exports = {
  getList       : getList,
  getAdd        : getAdd,
  getEdit       : getEdit,
  deleteProduct : deleteProduct,
  detailProduct : detailProduct,
  postAdd       : postAdd,
  postEdit      : postEdit
  
}

function getList(req,res,next){
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [userId], function(err, productList){
        res.render('product/productList.ejs',{
      		user : req.user,
          productList : productList,
          moment : moment,
          message : ''
      	})
    })
  })
}

function getAdd(req,res,next){
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_ALL_CATEGORY, function(err, categoryList){
      if(err)console.log(err)
      connection.query(QUERY.SELECT_ALL_TIPE_SATUAN, function(err, tipeSatuanList){
        if(err)console.log(err)
        console.log('categoryList',categoryList)
        console.log('tipeSatuanList',tipeSatuanList)
        res.render('product/productAdd.ejs',{
      		user : req.user,
          categoryList: categoryList,
          tipeSatuanList: tipeSatuanList,
          message: ''
      	})
      })
    })
  })
}

function getEdit(req,res,next){
  var productId = req.params.id
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_ALL_CATEGORY, function(err, categoryList){
      if(err)console.log(err)
      connection.query(QUERY.SELECT_ALL_TIPE_SATUAN, function(err, tipeSatuanList){
        if(err)console.log(err)
          connection.query(QUERY.SELECT_PRODUCT_DETAIL_BY_ID, [productId], function(err, productDetail){
            res.render('product/productEdit.ejs',{
              user : req.user,
              productDetail: productDetail,
              tipeSatuanList: tipeSatuanList,
              categoryList: categoryList,
              moment : moment,
              message: ''
            })
          })
      })
    })
  })
}

function deleteProduct(req,res,next){
  var productId = req.params.id
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.DELETE_PRODUCT_BY_PRODUCT_ID,[productId], function(err, rows){
      if(err)console.log(err)
      connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [userId], function(err, productList){
          res.render('product/productList.ejs',{
            user : req.user,
            productList : productList,
            moment : moment,
            message : 'Record has been successfully deleted'
          })
      })
    })
  })
}

function detailProduct(req,res,next){
  var productId = req.params.id
  var userId = req.user.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_ALL_CATEGORY, function(err, categoryList){
      if(err)console.log(err)
      connection.query(QUERY.SELECT_ALL_TIPE_SATUAN, function(err, tipeSatuanList){
        if(err)console.log(err)
          connection.query(QUERY.SELECT_PRODUCT_DETAIL_BY_ID, [productId], function(err, productDetail){
            res.render('product/productDetail.ejs',{
              user : req.user,
              productDetail: productDetail,
              tipeSatuanList: tipeSatuanList,
              categoryList: categoryList,
              moment : moment,
              message: ''
            })
          })
      })
    })
  })
}

function postEdit(req,res,next){
  //validation
  var userId = req.user.id
  console.log('userId',userId)
  var message = []
  var name = req.body.name
  var description = req.body.description
  var tipe_satuan_id = req.body.tipe_satuan_id
  var price = req.body.price
  var category_id = req.body.category_id
  var min_buy = req.body.min_buy
  var status_stok = req.body.status_stok
  var productId = req.body.productId
  if(validator.isEmpty(name))message.push('Name is mandatory field')
  if(!validator.isInt(price))message.push('Price must be numeric')
  if(!validator.isInt(min_buy))message.push('Minimum Buy must be numeric')
  if(name.length>100)message.push('Name length is exceeded')
  if(message.length>0){
    req.getConnection(function(err,connection){
      connection.query(QUERY.SELECT_ALL_CATEGORY, function(err, categoryList){
        if(err)console.log(err)
        connection.query(QUERY.SELECT_ALL_TIPE_SATUAN, function(err, tipeSatuanList){
          if(err)console.log(err)
            connection.query(QUERY.SELECT_PRODUCT_DETAIL_BY_ID, [productId], function(err, productDetail){
            if(err)console.log(err)
              res.render('product/productEdit.ejs',{
                user : req.user,
                tipeSatuanList: tipeSatuanList,
                categoryList: categoryList,
                productDetail: productDetail,
                message : message
              })
            })
        })
      })
    })
  }
  else{
    //take shopId
    req.getConnection(function(err,connection){
      connection.query(QUERY.SELECT_SHOP_DETAIL,[req.user.id], function(err, shopDetail){
        console.log('shopDetail',shopDetail)
        //check if shop is registered ?
        if(shopDetail.length>0)
        {
          var newProduct = {
            name: name,
            description: description,
            tipe_satuan_id: tipe_satuan_id,
            price: price,
            category_id: category_id,
            min_buy: min_buy,
            status_stok: status_stok,
            dt_created: new Date(),
            created_by: req.user.id
          }
          req.getConnection(function(err,connection){
            console.log('newProduct',newProduct)
            connection.query(QUERY.UPDATE_PRODUCT_BY_ID, [newProduct,productId], function(err, rows){
              if(err)console.log(err)
              req.getConnection(function(err,connection){
                connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [req.user.id], function(err, productList){
                    //render getList with message
                    res.render('product/productList.ejs',{
                      user : req.user,
                      productList : productList,
                      moment : moment,
                      message : `Product ${name} has been successfully added`
                    })
                })
              })
            })
          })
        }

        //if shop is not yet registered
        else{
          var userId = req.user.id
          req.getConnection(function(err,connection){
            connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [userId], function(err, productList){
                res.render('product/productList.ejs',{
                  user : req.user,
                  productList : productList,
                  moment : moment,
                  message : 'Please update shop information before adding new product'
                })
            })
          })
        }
      })
    })
  }
}



function postAdd(req,res,next){
  //validation
  var userId = req.user.id
  console.log('userId',userId)
  var message = []
  var name = req.body.name
  var description = req.body.description
  var tipe_satuan_id = req.body.tipe_satuan_id
  var price = req.body.price
  var category_id = req.body.category_id
  var min_buy = req.body.min_buy
  var status_stok = req.body.status_stok


  if(validator.isEmpty(name))message.push('Name is mandatory field')
  if(!validator.isInt(price))message.push('Price must be numeric')
  if(!validator.isInt(min_buy))message.push('Minimum Buy must be numeric')
  if(name.length>100)message.push('Name length is exceeded')
  if(message.length>0){
    req.getConnection(function(err,connection){
      connection.query(QUERY.SELECT_ALL_CATEGORY, function(err, categoryList){
        if(err)console.log(err)
        connection.query(QUERY.SELECT_ALL_TIPE_SATUAN, function(err, tipeSatuanList){
          if(err)console.log(err)
            res.render('product/productAdd.ejs',{
              user : req.user,
              tipeSatuanList: tipeSatuanList,
              categoryList: categoryList,
              message : message
            })
        })
      })
    })
  }
  else{
    //pass mandatory check . will continue to duplicate check
    req.getConnection(function(err,connection){
      connection.query(QUERY.SELECT_PRODUCT_BY_SHOP_ID,[req.user.id,name], function(err, product){
        if(err)console.log(err)
        if(product.length>0){
          message.push("Data is duplicated")
          res.render('product/productAdd.ejs',{
            user : req.user,
            message : message
          })
        }
        //pass duplicate check, continue to adding new record
        else{
          //take shopId
          req.getConnection(function(err,connection){
            connection.query(QUERY.SELECT_SHOP_DETAIL,[req.user.id], function(err, shopDetail){
              console.log('shopDetail',shopDetail)
              if(shopDetail.length>0)
              {
                var newProduct = {
                  id: helper.generateUUID(),
                  shop_id: shopDetail[0].id,
                  seller_id: req.user.id,
                  name: name,
                  description: description,
                  tipe_satuan_id: tipe_satuan_id,
                  price: price,
                  category_id: category_id,
                  min_buy: min_buy,
                  status_stok: status_stok,
                  dt_created: new Date(),
                  created_by: req.user.id
                }
                req.getConnection(function(err,connection){
                  console.log('newProduct',newProduct)
                  connection.query(QUERY.ADD_NEW_PRODUCT, newProduct, function(err, rows){
                    if(err)console.log(err)
                    req.getConnection(function(err,connection){
                      connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [req.user.id], function(err, productList){
                          //render getList with message
                          res.render('product/productList.ejs',{
                            user : req.user,
                            productList : productList,
                            moment : moment,
                            message : `Product ${name} has been successfully added`
                          })
                      })
                    })
                  })
                })
              }

              //if shop is not yet registered
              else{
                var userId = req.user.id
                req.getConnection(function(err,connection){
                  connection.query(QUERY.SELECT_ALL_PRODUCT_BY_USER_ID, [userId], function(err, productList){
                      res.render('product/productList.ejs',{
                        user : req.user,
                        productList : productList,
                        moment : moment,
                        message : 'Please update shop information before adding new product'
                      })
                  })
                })
              }
            })
          })
        }
      })
    })
  }
}

function deleteCorp(req,res,next){
  var corpId = req.params.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.DELETE_CORPORATE_PROJECT_BY_CORP_ID, [corpId], function(err, rows){
      if(err)console.log(err)
      connection.query(QUERY.DELETE_CORPORATE_USER_BY_CORP_ID, [corpId], function(err, rows){
        if(err)console.log(err)
        connection.query(QUERY.DELETE_CORPORATE, [corpId], function(err, rows){
          if(err)console.log(err)
          connection.query(QUERY.SELECT_ALL_CORPORATE, function(err, corporateList){
            if(err)console.log(err)
            res.render('corporate/corporateList.ejs',{
          		user : req.user,
              corporateList : corporateList,
              moment : moment,
              message : 'Record has been successfully deleted'
          	})
          })
        })
      })
    })
  })
}

function detailCorp(req,res,next){
  var corpId = req.params.id
  req.getConnection(function(err,connection){
    connection.query(QUERY.SELECT_CORPORATE_BY_ID,[corpId], function(err, corporateDetail){
      if(err)console.log(err)
      connection.query(QUERY.SELECT_CORPORATE_USER_BY_CORP_ID,[corpId], function(err, corporateUserList){
        if(err)console.log(err)
        connection.query(QUERY.SELECT_ALL_PROJECT_BY_CORP_ID,[corpId], function(err, projectList){
          if(err)console.log(err)
          console.log(projectList);
          res.render('corporate/corporateDetail.ejs',{
            user : req.user,
            corporateDetail : corporateDetail,
            corporateUserList : corporateUserList,
            projectList : projectList,
            moment : moment,
            message : ''
            })
        })
      })
    })
  })
}
