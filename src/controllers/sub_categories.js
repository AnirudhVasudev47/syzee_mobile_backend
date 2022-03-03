const formidable = require("formidable");
const {connection} = require("../config/database_config");

exports.getSubCategories = (req, res) => {
  
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(500).json({
        error: 'Something went wrong.'
      });
    }
    const {categoryId, mainCatId} = fields;
    if (!categoryId || !mainCatId) {
      return res.status(404).json({
        error: 'Invalid category ID',
      });
    }
    
    const catQuery = 'SELECT `sub_category_id` FROM `main_category` WHERE `id` = ?';
    
    connection.query(catQuery, mainCatId, (err, catRes) => {
      if (err)
        return res.status(500).json({
          error: 'Something went wrong'
        })
      const data = JSON.parse(catRes[0].sub_category_id);
      // console.log(data.length);
      let temp = data.findIndex((cate) => {
        return cate == categoryId;
      });
      // console.log(temp);
      if (temp === -1) {
        return res.json({
          data: 'no/sub-categories',
        });
      }
      const subCatQuery = 'SELECT `category_id` FROM `main_category` WHERE `id` = ?';
      connection.query(subCatQuery, mainCatId, (err, subCatRes) => {
        if (err)
          return res.status(500).json({
            error: 'Something went wrong'
          });
        
        let subCatArr = JSON.parse(subCatRes[0].category_id);
        // console.log(subCatArr);
        
        if (subCatArr[temp] == '' || subCatArr[temp] == null || subCatArr[temp] == 'null') {
          return res.json({
            data: 'no/sub-categories',
          });
        }
        
        let subCatTableQuery = 'SELECT `id`, `name` FROM `category` /* WHERE `status` = 1 */';
        
        connection.query(subCatTableQuery, (err, tableRes) => {
          if (err)
            return res.status(500).json({
              error: 'Something went wrong'
            });
          
          let finalArr = [];
  
          // console.log(tableRes)
          tableRes.map((row) => {
            if(subCatArr[temp].includes(`${row.id}`)){
              console.log(row)
              finalArr.push(row);
            }
          });
          
          return res.json(finalArr);
          
        });
        
      })
    });
    
  })
  
}


exports.checkSubCategory = (req, res) => {
  
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(500).json({
        error: 'Something went wrong.'
      });
    }
    const {categoryId, mainCatId} = fields;
    if (!categoryId || !mainCatId) {
      return res.status(404).json({
        error: 'Invalid category ID',
      });
    }
    
    const catQuery = 'SELECT `sub_category_id` FROM `main_category` WHERE `id` = ?';
    
    connection.query(catQuery, mainCatId, (err, catRes) => {
      if (err)
        return res.status(500).json({
          error: 'Something went wrong'
        })
      const data = JSON.parse(catRes[0].sub_category_id);
      // console.log(data.length);
      let temp = data.findIndex((cate) => {
        return cate == categoryId;
      });
      // console.log(temp);
      if (temp === -1) {
        return res.json({
          data: 'no/sub-categories',
        });
      }
      const subCatQuery = 'SELECT `category_id` FROM `main_category` WHERE `id` = ?';
      connection.query(subCatQuery, mainCatId, (err, subCatRes) => {
        if (err)
          return res.status(500).json({
            error: 'Something went wrong'
          });
        
        let subCatArr = JSON.parse(subCatRes[0].category_id);
        // console.log(subCatArr);
        
        if (subCatArr[temp] == '' || subCatArr[temp] == null || subCatArr[temp] == 'null') {
          return res.json({
            data: 'no/sub-categories',
          });
        }
        return res.json({
          data: 'present/sub-categories'
        });
        
      })
    });
    
  })
  
}

/*

      
      let ind = data.indexOf(parseInt(categoryId));
      
      if (ind !== -1) {
        return res.json({
          data: 'present/sub-categories'
        })
      } else {
        return res.json({
          data: 'no/sub-categories',
        })
      }
      
 */