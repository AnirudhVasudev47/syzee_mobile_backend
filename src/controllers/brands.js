const {connection} = require("../config/database_config");
const {response} = require("express");


exports.getAllBrandsList = (req, res) => {

  const allBrandsQuery = 'SELECT * FROM `brands`';
  
  connection.query(allBrandsQuery, (err, brandRes) => {
    if (err) {
      return res.status(500).json({
        error: 'Something went wrong.'
      });
    }
    return res.json({
      data: brandRes
    });
  });
}

exports.getAllBrandProducts = (req, res) => {

  const {brandId} = req.params;
  
  const womenQuery = 'SELECT `women`.`ID`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`BRAND_ID`=?';
  const kidsQuery = 'SELECT `kids`.`ID` AS `id`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `var`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`BRAND_ID`=?'
  
  connection.query(womenQuery, brandId, (err, womenRes) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  
    let list = [];
    womenRes.map((prod) => {
      try {
        prod.wishlist = false;
        let img = JSON.parse(prod.image);
        prod.image = img[0];
        let data = JSON.parse(prod.price);
        prod.price = parseInt(data[0].RETAILED_PRICE);
        prod.ID = undefined;
        prod.mainCatId = 1;
        list.push(prod);
      } catch (e) {
        console.log('women: ', e)
      }
    });
    connection.query(kidsQuery, brandId, (err, kidsRes) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
      }
      kidsRes.map((prod) => {
        try {
          prod.wishlist = false;
          let img = JSON.parse(prod.image);
          prod.image = img[0];
          let data = JSON.parse(prod.var);
          prod.price = parseInt(data[0].RETAILED_PRICE);
          prod.ID = undefined;
          prod.var = undefined;
          prod.mainCatId = 2;
          list.push(prod);
        } catch (e) {
          console.log('kids: ', e)
        }
      });
      return res.json({
        data: list
      });
      
    });
    
  })

}
