const formidable = require("formidable");
const {connection} = require("../config/database_config");


exports.getProductById = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: 'Bad request'
      });
    }
    
    const {mainCatId, productStyle} = fields;
    
    if (!mainCatId || !productStyle) {
      return res.status(400).json({
        error: 'All fields are mandatory.'
      });
    }
    
    const womenProductQuery = 'SELECT `women`.`NAME`, `women`.`SELLER_ID`, `women`.`PRODUCT_ID`, `women`.`TAG_LINE`, `women`.`DESCRIPTION`, `women`.`ID`, `women`.`COLOUR`, `women`.`COLOUR_CODE`, `women`.`IMAGE`, `women`.`VARIANTS`, `brands`.`NAME` AS `BRAND` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`PRODUCT_ID` = ? AND `women`.`SELLER_STATUS` = 1';
    const menProductQuery = 'SELECT `men`.`NAME`, `men`.`SELLER_ID`, `men`.`PRODUCT_ID`, `men`.`TAG_LINE`, `men`.`DESCRIPTION`, `men`.`ID`, `men`.`COLOUR`, `men`.`COLOUR_CODE`, `men`.`IMAGE`, `men`.`VARIANTS`, `brands`.`NAME` AS `BRAND` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` WHERE `men`.`PRODUCT_ID` = ? AND `men`.`SELLER_STATUS` = 1';
    const kidsProductQuery = 'SELECT `kids`.`NAME`, `kids`.`SELLER_ID`, `kids`.`PRODUCT_ID`, `kids`.`TAG_LINE`, `kids`.`DESCRIPTION`, `kids`.`ID`, `kids`.`COLOUR`, `kids`.`COLOUR_CODE`, `kids`.`IMAGE`, `kids`.`VARIANTS`, `brands`.`NAME` AS `BRAND` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`PRODUCT_ID` = ? AND `kids`.`SELLER_STATUS` = 1';
    
    if (mainCatId == 1) {
      
      connection.query(womenProductQuery, productStyle, (err, womenRes) => {
        if (err) {
          return res.status(500).json({
            error: 'Something went wrong.'
          });
        }
        
        let finalRes = {}
        finalRes.name = womenRes[0].NAME;
        finalRes.brand = womenRes[0].BRAND;
        finalRes.sellerId = womenRes[0].SELLER_ID;
        finalRes.productId = womenRes[0].PRODUCT_ID;
        finalRes.tagLine = womenRes[0].TAG_LINE;
        let descData = JSON.parse(womenRes[0].DESCRIPTION);
        let finDesc = ''
        descData.map((desc) => {
          finDesc = finDesc + desc.toString() + '\n'
        });
        finalRes.description = finDesc;
        finalRes.variants = [];
        
        womenRes.map((prod) => {
          let finalObj = {};
          
          finalObj.id = prod.ID;
          finalObj.color = prod.COLOUR_CODE;
          finalObj.colorName = prod.COLOUR;
          finalObj.images = JSON.parse(prod.IMAGE);
          finalObj.sizeVariants = [];
          let data = JSON.parse(prod.VARIANTS);
          data.map((size) => {
            finalObj.sizeVariants.push({
              size: size.OTHER_SIZE,
              stock: size.QTY,
              price: size.RETAILED_PRICE,
              discount: size.DISCOUNT_PRICE
            });
          });
          
          finalRes.variants.push(finalObj);
          
        });
        
        return res.json(finalRes);
        
      });
      
    } else if (mainCatId == 2) {
  
      connection.query(kidsProductQuery, productStyle, (err, kidsRes) => {
        if (err) {
          return res.status(500).json({
            error: 'Something went wrong.'
          });
        }
    
        let finalRes = {}
        finalRes.name = kidsRes[0].NAME;
        finalRes.brand = kidsRes[0].BRAND;
        finalRes.sellerId = kidsRes[0].SELLER_ID;
        finalRes.productId = kidsRes[0].PRODUCT_ID;
        finalRes.tagLine = kidsRes[0].TAG_LINE;
        let descData = JSON.parse(kidsRes[0].DESCRIPTION);
        let finDesc = ''
        descData.map((desc) => {
          finDesc = finDesc + desc.toString() + '\n'
        });
        finalRes.description = finDesc;
        finalRes.variants = [];
    
        kidsRes.map((prod) => {
          let finalObj = {};
      
          finalObj.id = prod.ID;
          finalObj.color = prod.COLOUR_CODE;
          finalObj.colorName = prod.COLOUR;
          finalObj.images = JSON.parse(prod.IMAGE);
          finalObj.sizeVariants = [];
          let data = JSON.parse(prod.VARIANTS);
          data.map((size) => {
            finalObj.sizeVariants.push({
              size: size.OTHER_SIZE,
              stock: size.QTY,
              price: size.RETAILED_PRICE,
              discount: size.DISCOUNT_PRICE
            });
          });
      
          finalRes.variants.push(finalObj);
      
        });
    
        return res.json(finalRes);
    
      });
  
    } else {
  
      connection.query(menProductQuery, productStyle, (err, menRes) => {
        if (err) {
          return res.status(500).json({
            error: 'Something went wrong.'
          });
        }
    
        let finalRes = {}
        finalRes.name = menRes[0].NAME;
        finalRes.brand = menRes[0].BRAND;
        finalRes.sellerId = menRes[0].SELLER_ID;
        finalRes.productId = menRes[0].PRODUCT_ID;
        finalRes.tagLine = menRes[0].TAG_LINE;
        let descData = JSON.parse(menRes[0].DESCRIPTION);
        let finDesc = ''
        descData.map((desc) => {
          finDesc = finDesc + desc.toString() + '\n'
        });
        finalRes.description = finDesc;
        finalRes.variants = [];
    
        menRes.map((prod) => {
          let finalObj = {};
      
          finalObj.id = prod.ID;
          finalObj.colorName = prod.COLOUR;
          finalObj.color = prod.COLOUR_CODE;
          finalObj.images = JSON.parse(prod.IMAGE);
          finalObj.sizeVariants = [];
          let data = JSON.parse(prod.VARIANTS);
          data.map((size) => {
            finalObj.sizeVariants.push({
              size: size.OTHER_SIZE,
              stock: size.QTY,
              price: size.RETAILED_PRICE,
              discount: size.DISCOUNT_PRICE === '' ? "0" : size.DISCOUNT_PRICE
            });
          });
          console.log(finalObj);
          finalRes.variants.push(finalObj);
      
        });
    
        return res.json(finalRes);
    
      });
  
    }
    
  });
}

exports.getProductId = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    const {id, mainCatId} = fields;
    
    if (err) {
      return res.status(400).json({
        error: 'Bad request'
      });
    }
    
    const womenQuery = 'SELECT `PRODUCT_ID` FROM `women` WHERE `ID`=?';
    const kidsQuery = 'SELECT `PRODUCT_ID` FROM `kids` WHERE `ID`=?';
    const menQuery = 'SELECT `PRODUCT_ID` FROM `men` WHERE `ID`=?';
    
    if (mainCatId == 1) {
      connection.query(womenQuery, id, (err, womenRes) => {
        if (err) {
          return res.status(400).json({
            error: 'Bad request'
          });
        }
    
        return res.json({
          productId: womenRes[0].PRODUCT_ID,
        });
    
      });
    } else if (mainCatId == 2) {
      connection.query(kidsQuery, id, (err, kidsRes) => {
        if (err) {
          return res.status(400).json({
            error: 'Bad request'
          });
        }
    
        return res.json({
          productId: kidsRes[0].PRODUCT_ID,
        });
    
      });
    } else {
      connection.query(menQuery, id, (err, menRes) => {
        if (err) {
          return res.status(400).json({
            error: 'Bad request'
          });
        }
    
        return res.json({
          productId: menRes[0].PRODUCT_ID,
        });
    
      });
    }
    
  });
}