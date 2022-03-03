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
				image: category.IMAGE,
				heading: category.HEADING,
        subCatId: category.SUB_CATEGORY_ID,
        mainCatId: category.MAIN_CATEGORY_ID
			});
		});
		// console.log(list)
		return res.json(list);
	});
}

exports.homeTabBrands = (req, res) => {
	const query = 'SELECT * FROM `brands` WHERE `STATUS`= 1';
	connection.query(query, (err, results,) => {
		return res.json({data: results});
	});
}

exports.homeTabMostPopular = (req, res) => {
	const query = 'SELECT * FROM `most_wanted` WHERE `STATUS`= 1';
	connection.query(query, (err, results,) => {
		return res.json(results);
	});
}

exports.getLookOfTheDay = (req, res) => {
	
	const womenLook = 'SELECT `IMAGE`, `PRODUCT_ID`, `NAME`, `VARIANTS` FROM `women` WHERE `LOOK_OF_THE_DAY_STATUS`=1'
	const kidsLook = 'SELECT `IMAGE`, `NAME`, `VARIANTS`, `PRODUCT_ID` FROM `kids` WHERE `LOOK_OF_THE_DAY_STATUS`=1'
	
	connection.query(womenLook, (err, womenRes) => {
		if (err) {
			return res.status(500).json({
				error: 'Something went wrong.'
			});
		}
		
		let list = [];
		womenRes.map((prod) => {
			try {
				let obj = {};
				obj.image = JSON.parse(prod.IMAGE)[0];
				obj.name = prod.NAME;
				let data = JSON.parse(prod.VARIANTS);
				obj.price = parseInt(data[0].DISCOUNT_PRICE) ?? parseInt(data[0].RETAILED_PRICE);
				obj.mainCatId = 1;
				obj.prodId = prod.PRODUCT_ID;
				list.push(obj);
			} catch (e) {
				console.log('women: ', e);
			}
		})
		
		connection.query(kidsLook, (err, kidsRes) => {
			if (err) {
				return res.status(500).json({
					error: 'Something went wrong.'
				});
			}
			
			kidsRes.map((prod) => {
				try {
					let obj = {};
					let img = JSON.parse(prod.IMAGE);
					obj.image = img[0];
					let data = JSON.parse(prod.VARIANTS);
					obj.price = parseInt(data[0].DISCOUNT_PRICE) ?? parseInt(data[0].RETAILED_PRICE);
					obj.name = prod.NAME;
					obj.prodId = prod.PRODUCT_ID;
					obj.mainCatId = 2;
					
					list.push(obj);
				} catch (e) {
					console.log('kids: ', e)
				}
			});
			return res.json({
				data: list,
			});
		})
	})
	
}

exports.getWeeksHighlights = (req, res) => {
	
	const weekQuery = 'SELECT * FROM `week_highlights`';
	
	connection.query(weekQuery, (err, weekRes) => {
		if (err) {
			return res.status(500).json({
				error: 'Something went wrong.'
			});
		}
		return res.json({
			data: weekRes,
		});
	});
	
}

exports.getMostWanted = (req, res) => {
	
	const weekQuery = 'SELECT * FROM `most_wanted`';
	
	connection.query(weekQuery, (err, mostRes) => {
		if (err) {
			return res.status(500).json({
				error: 'Something went wrong.'
			});
		}
		let temp = [];
		mostRes.map((most) => {
			try {
				most.IMAGE = JSON.parse(most.IMAGE)[0];
        temp.push(most);
			} catch (e) {
				console.log(e);
			}
		});
  
		return res.json({
			data: temp,
		});
	});
	
}