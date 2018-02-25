CREATE SCHEMA `grandmarket` ;

CREATE TABLE `grandmarket`.`t_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(200) NULL,
  `nickname` VARCHAR(200) NULL,
  `password` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  `phone_number` VARCHAR(200) NULL,
  `shop_id` INT NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_user_INDEX` (`id` ASC, `shop_id` ASC));

  
 CREATE TABLE `grandmarket`.`t_user_address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` DECIMAL(10,6) NULL,
  `lng` DECIMAL(10,6) NULL,
  `is_primary` BIT(1) NULL,
  `note` LONGTEXT NULL,
  `address` LONGTEXT NULL,
  `country` VARCHAR(100) NULL,
  `province` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  `postal_code` VARCHAR(10) NULL,
  `user_id` INT NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_user_address_INDEX` (`id` ASC, `user_id` ASC, `is_primary` ASC));

 CREATE TABLE `grandmarket`.`t_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buyer_id` INT NULL,
  `payment_dt` DATETIME NULL,
  `total_payment` DECIMAL(12,2) NULL,
  `status` VARCHAR(45) NULL,
  `order_number` VARCHAR(100) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `t_order_INDEX` (`id` ASC, `buyer_id` ASC, `status` ASC, `order_number` ASC));

  CREATE TABLE `grandmarket`.`t_order_shop_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `shop_id` INT NULL,
  `product_id` INT NULL,
  `product_name` VARCHAR(200) NULL,
  `weight` DECIMAL(6,2) NULL,
  `weight_unit` VARCHAR(45) NULL,
  `order_delivery_id` INT NULL,
  `qty` INT NULL,
  `price` DECIMAL(12,2) NULL,
  `image_url` VARCHAR(200) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_order_shop_product_INDEX` (`id` ASC, `order_id` ASC, `shop_id` ASC, `order_delivery_id` ASC));

  
  CREATE TABLE `grandmarket`.`t_order_delivery` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `delivery_fee` DECIMAL(12,2) NULL,
  `total_weight` DECIMAL(6,2) NULL,
  `status` VARCHAR(45) NULL,
  `awb_no` VARCHAR(45) NULL,
  `courier_name` VARCHAR(45) NULL,
  `lat` DECIMAL(10,6) NULL,
  `lng` DECIMAL(10,6) NULL,
  `note` LONGTEXT NULL,
  `address` LONGTEXT NULL,
  `country` VARCHAR(100) NULL,
  `province` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  `postal_code` VARCHAR(10) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_order_delivery_INDEX` (`id` ASC, `order_id` ASC));

CREATE TABLE `grandmarket`.`t_shop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `total_order` INT NULL,
  `shop_image_url` VARCHAR(200) NULL,
  `name` VARCHAR(100) NULL,
  `domain` VARCHAR(100) NULL,
  `address` LONGTEXT NULL,
  `status` VARCHAR(45) NULL,
  `note` VARCHAR(200) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_shop_INDEX` (`id` ASC, `user_id` ASC, `name` ASC, `domain` ASC, `status` ASC));

 CREATE TABLE `grandmarket`.`t_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shop_id` INT NULL,
  `status` VARCHAR(45) NULL,
  `qty` INT NULL,
  `price` DECIMAL(16,2) NULL,
  `description` LONGTEXT NULL,
  `view_count` INT NULL,
  `weight` DECIMAL(6,2) NULL,
  `weight_unit` VARCHAR(45) NULL,
  `category_name` VARCHAR(45) NULL,
  `name` VARCHAR(200) NULL,
  `total_trx` INT NULL,
  `domain` VARCHAR(200) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_product_INDEX` (`id` ASC, `shop_id` ASC, `status` ASC, `domain` ASC));


 CREATE TABLE `grandmarket`.`t_product_img` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NULL,
  `image_url` VARCHAR(200) NULL,
  `dt_created` DATETIME NULL DEFAULT NOW(),
  `dt_modified` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `t_product_img_INDEX` (`id` ASC, `product_id` ASC));
