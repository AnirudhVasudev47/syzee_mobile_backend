const {connection} = require("../config/database_config");

exports.test = (req, res) => {
  res.json({
    test: 'works',
  });
}

exports.homeTabBanner = (req, res) => {
  const query = 'SELECT `BANNER_IMAGE` FROM `banner_list` WHERE `APPROVE_STATUS` = 1';
  connection.query(query, (err, results,) => {
    return res.json(results);
  });
}

exports.homeTabCategories = (req, res) => {
  const query = 'SELECT * FROM `categories_cover_page` WHERE `STATUS`= 1';
  connection.query(query, (err, results,) => {
    let list = [];
    results.map((category) => {
      list.push({
        image: `https://saraiexim.net/syzee/images/product_images/${category.IMAGE}`,
        heading: category.HEADING
      });
    });
    // console.log(list)
    return res.json(list);
  });
}

exports.homeTabBrands = (req, res) => {
  const query = 'SELECT `NAME`, `IMAGE`, `ID` FROM `brands` WHERE `STATUS`= 1';
  connection.query(query, (err, results,) => {
    return res.json(results);
  });
}

exports.homeTabMostWanted = (req, res) => {
  const query = 'SELECT * FROM `most_wanted` WHERE `STATUS`= 1';
  connection.query(query, (err, results) => {
    return res.json(results);
  });
}

exports.homeTabMostPopular = (req, res) => {
  const query = 'SELECT * FROM `most_wanted` WHERE `STATUS`= 1';
  connection.query(query, (err, results,) => {
    return res.json(results);
  });
}