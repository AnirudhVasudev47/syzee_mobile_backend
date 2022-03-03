const {connection} = require("../config/database_config");

exports.getWomenCategories = (req, res) => {
  const mainCatQuery = 'SELECT * FROM `main_category` WHERE `id`=1';
  const subCatQuery = 'SELECT `id`, `name`, `image` FROM `sub_category` WHERE `status`=1'
  connection.query(mainCatQuery, (err, results) => {
    let list = [];
    JSON.parse(results[0].sub_category_id).map((catId) => {
      list.push(parseInt(catId));
    })
    connection.query(subCatQuery, (err, subResult) => {
      if (err)
        return res.status(500).json({
          error: 'Something went wrong'
        })
      let resList = [];
      subResult.forEach((row) => {
        if (list.includes(row.id)) {
          resList.push(row);
        }
      })
      return res.json(resList);
    })
  })
}

exports.getMenCategories = (req, res) => {
  const mainCatQuery = 'SELECT * FROM `main_category` WHERE `id`=3';
  const subCatQuery = 'SELECT * FROM `sub_category`'
  connection.query(mainCatQuery, (err, results) => {
    let list = [];
    JSON.parse(results[0].sub_category_id).map((catId) => {
      list.push(parseInt(catId));
    })
    connection.query(subCatQuery, (err, subResult) => {
      if (err)
        return res.status(500).json({
          error: 'Something went wrong'
        })
      let resList = [];
      subResult.forEach((row) => {
        if (list.includes(row.id)) {
          resList.push(row);
        }
      })
      return res.json(resList);
    })
  })
}

exports.getKidsCategories = (req, res) => {
  const mainCatQuery = 'SELECT * FROM `main_category` WHERE `id`=2';
  const subCatQuery = 'SELECT * FROM `sub_category`'
  connection.query(mainCatQuery, (err, results) => {
    let list = [];
    JSON.parse(results[0].sub_category_id).map((catId) => {
      list.push(parseInt(catId));
    })
    connection.query(subCatQuery, (err, subResult) => {
      if (err)
        return res.status(500).json({
          error: 'Something went wrong'
        })
      let resList = [];
      subResult.forEach((row) => {
        if (list.includes(row.id)) {
          resList.push(row);
        }
      })
      return res.json(resList);
    })
  })
}