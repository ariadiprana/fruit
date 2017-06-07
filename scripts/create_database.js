/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);
console.log('Success: Database Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'USER' + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(50) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `fullName` VARCHAR(300) NOT NULL, \
    `phone` VARCHAR(300), \
    `email` VARCHAR(300), \
    `address` TEXT, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Table USER is Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'SHOP' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `name` VARCHAR(100) NOT NULL, \
    `address` TEXT, \
    `logo` TEXT, \
    `phone_mobile` VARCHAR(300), \
    `phone_shop` VARCHAR(300), \
    `email` VARCHAR(300), \
    `dt_created` DATETIME NOT NULL, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) \
)');

console.log('Success: Table SHOP is Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'MT_CATEGORY' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `name` VARCHAR(300), \
    `desc` VARCHAR(300), \
    `dt_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: TABLE MT_CATEGORY is Created!')


connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'MT_TIPE_SATUAN' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `name` VARCHAR(300), \
    `desc` VARCHAR(300), \
    `dt_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: TABLE MT_TIPE_SATUAN is Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'PRODUCT' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `name` VARCHAR(200) NOT NULL, \
    `description` TEXT, \
    `shop_id` VARCHAR(50) NOT NULL, \
    `seller_id` INT UNSIGNED NOT NULL, \
    `image_url` VARCHAR(300), \
    `tipe_satuan_id` VARCHAR(50), \
    `price` INT UNSIGNED, \
    `category_id` VARCHAR(50), \
    `min_buy` INT UNSIGNED, \
    `status_stok` VARCHAR(300), \
    `dt_created` DATETIME NOT NULL, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    FOREIGN KEY (`category_id`) REFERENCES FRUIT.MT_CATEGORY(`id`), \
    FOREIGN KEY (`tipe_satuan_id`) REFERENCES FRUIT.MT_TIPE_SATUAN(`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: TABLE PRODUCT is Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'PROMOSI' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `product_id` VARCHAR(50) NOT NULL, \
    `start_dt` DATETIME, \
    `expired_dt` DATETIME, \
    `discount_type` VARCHAR(300), \
    `minimum_qty` INT UNSIGNED, \
    `value` INT UNSIGNED, \
    `dt_created` DATETIME NOT NULL, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    FOREIGN KEY (`product_id`) REFERENCES FRUIT.PRODUCT(`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: TABLE PROMOSI is Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'ORDER' + '` ( \
    `id` VARCHAR(50) NOT NULL, \
    `buyer_user_id` VARCHAR(50) NOT NULL, \
    `seller_user_id` VARCHAR(50) NOT NULL, \
    `shipping_address` TEXT, \
    `products` TEXT, \
    `total_payment` INT UNSIGNED, \
    `order_status` VARCHAR(300), \
    `confirmation_code` VARCHAR(300), \
    `dt_created` DATETIME NOT NULL, \
    `created_by` INT UNSIGNED NOT NULL, \
    `dt_updated` DATETIME, \
    `updated_by` INT UNSIGNED, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: TABLE ORDER is Created!')

connection.query("INSERT INTO `fruit`.`user`(`id`,`username`,`password`,`fullName`, `phone`)VALUES('1','a','$2a$10$qJcRyPSQJ1XWHgY9H6yZyeufYnhWJnTCYt/ldltSx63a4uY8Xg35S','Ari Adiprana','081932377341');");
console.log('Success: INSERT INTO TABLE USER!')

connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('01','Fresh Fruit','Buah Segar',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('02','Fresh Vegetable','Sayuran Segar',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('03','Fresh Herbs','Bumbu Segar',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('04','Meat','Aneka Daging',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('05','Seafood','Boga Bahari',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('06','Egg & Diary','Telur & Susu',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('07','Pantry','Bahan Dapur',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('08','Frozen','Makanan Beku',1);");
connection.query("INSERT INTO `fruit`.`mt_category`(`id`,`name`,`desc`,`created_by`)VALUES('09','Bakery','Roti',1);");
console.log('Success: INSERT INTO TABLE MT_CATEGORY!')

connection.query("INSERT INTO `fruit`.`mt_tipe_satuan`(`id`,`name`,`desc`,`created_by`)VALUES('01','Kg','Kilogram',1);");
connection.query("INSERT INTO `fruit`.`mt_tipe_satuan`(`id`,`name`,`desc`,`created_by`)VALUES('02','Kardus','Kardus',1);");
connection.query("INSERT INTO `fruit`.`mt_tipe_satuan`(`id`,`name`,`desc`,`created_by`)VALUES('03','Peti','Peti',1);");
connection.query("INSERT INTO `fruit`.`mt_tipe_satuan`(`id`,`name`,`desc`,`created_by`)VALUES('04','Bungkus','Bungkus',1);");
connection.query("INSERT INTO `fruit`.`mt_tipe_satuan`(`id`,`name`,`desc`,`created_by`)VALUES('05','Ekor','Ekor',1);");

console.log('Success: INSERT INTO TABLE MT_TIPE_SATUAN!')


connection.end();
