const formidable = require("formidable");
const {connection} = require("../config/database_config");

exports.test = (req, res) => {
	return res.json({
		data: 'test',
	});
}

exports.productsSubCategory = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Something went wrong.'
			});
		}
		
		const {mainCatId, subCategoryId, email} = fields;
		
		if (!mainCatId || !subCategoryId) {
			return res.json({
				error: 'All fields are mandatory.'
			});
		}
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID`AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`CATEGORY_ID`=?'
			
			connection.query(womenQuery, subCategoryId, (err, womenResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					try {
						let list = [];
						womenResults.map((prod) => {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						});
						return res.json(list);
					} catch (e) {
						console.log(e)
					}
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=1 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						womenResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 2) { // Kids Category
			const kidsQuery = 'SELECT `kids`.`ID`AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `var`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`CATEGORY_ID`=?'
			
			connection.query(kidsQuery, subCategoryId, (err, kidsResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					kidsResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						kidsResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 3) { // Men Category
			const menQuery = 'SELECT `men`.`ID`AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `var`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` WHERE `men`.`CATEGORY_ID`=?'
			
			connection.query(menQuery, subCategoryId, (err, menResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					menResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						menResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
		} else {
			//Invalid Category
			res.status(404).json({
				error: 'Invalid Category',
			});
		}
	});
}

exports.productsCategory = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Something went wrong.'
			});
		}
		
		const {mainCatId, categoryId, email} = fields;
		
		if (!mainCatId || !categoryId) {
			return res.json({
				error: 'All fields are mandatory.'
			});
		}
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID`AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`SUB_CAT_ID`=?'
			
			connection.query(womenQuery, categoryId, (err, womenResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					try {
						let list = [];
						womenResults.map((prod) => {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						});
						return res.json(list);
					} catch (e) {
						console.log(e)
					}
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=1 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						womenResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 2) { // Kids Category
			const kidsQuery = 'SELECT `kids`.`ID`AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `var`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`CATEGORY_ID`=?'
			
			connection.query(kidsQuery, categoryId, (err, kidsResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					kidsResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						kidsResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 3) { // Men Category
			const menQuery = 'SELECT `men`.`ID`AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `var`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` WHERE `men`.`CATEGORY_ID`=?'
			
			connection.query(menQuery, categoryId, (err, menResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					menResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						menResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
		} else {
			//Invalid Category
			res.status(404).json({
				error: 'Invalid Category',
			});
		}
	});
}

exports.getGifts = (req, res) => {
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {mainCatId, email} = fields;
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID` AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`GIFTS`= 1 ORDER BY `women`.`NA_DATE` DESC'
			
			connection.query(womenQuery, (err, womenResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					try {
						let list = [];
						womenResults.map((prod) => {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						});
						return res.json(list);
					} catch (e) {
						console.log(e)
					}
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=1 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						womenResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
			
		} else if (mainCatId == 2) { // Kids Category
			const kidsQuery = 'SELECT `kids`.`ID` AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `price`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`GIFTS`=1 ORDER BY `kids`.`NA_DATE` DESC'
			
			connection.query(kidsQuery, (err, kidsResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					kidsResults.map((prod) => {
						try {
							prod.wishlist = false;
							// console.log(prod.image);
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						kidsResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								// console.log(prod.price);
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 3) { // Men Category
			const menQuery = 'SELECT `men`.`ID` AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `price`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brand`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` ORDER BY `men`.`NA_DATE` DESC'
			
			connection.query(menQuery, (err, menResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					menResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						menResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
		} else {
			//Invalid Category
			res.status(404).json({
				error: 'Invalid Category',
			});
		}
		
	})
}

exports.getWomenNewIn = (req, res) => {
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {mainCatId, email} = fields;
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID` AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`NA_STATUS`= 1 ORDER BY `women`.`NA_DATE` DESC'
			
			connection.query(womenQuery, (err, womenResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					try {
						let list = [];
						womenResults.map((prod) => {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						});
						return res.json(list);
					} catch (e) {
						console.log(e)
					}
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=1 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						womenResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
			
		} else if (mainCatId == 2) { // Kids Category
			const kidsQuery = 'SELECT `kids`.`ID` AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `price`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`NA_STATUS`=1 ORDER BY `kids`.`NA_DATE` DESC'
			
			connection.query(kidsQuery, (err, kidsResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					kidsResults.map((prod) => {
						try {
							prod.wishlist = false;
							// console.log(prod.image);
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						kidsResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								// console.log(prod.price);
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 3) { // Men Category
			const menQuery = 'SELECT `men`.`ID` AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `price`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brand`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` ORDER BY `men`.`NA_DATE` DESC'
			
			connection.query(menQuery, (err, menResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					menResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						menResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
		} else {
			//Invalid Category
			res.status(404).json({
				error: 'Invalid Category',
			});
		}
		
	})
}

exports.searchProducts = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {searchText} = fields;
		
		if (!searchText) {
			return res.json({
				error: 'All fields are mandatory.'
			});
		}
		
		const womenSearchQuery = 'SELECT `NAME`, `PRODUCT_ID` FROM `women` WHERE `NAME` LIKE ? LIMIT 7';
		const menSearchQuery = 'SELECT `NAME`, `PRODUCT_ID` FROM `men` WHERE `NAME` LIKE ? LIMIT 7';
		const kidsSearchQuery = 'SELECT `NAME`, `PRODUCT_ID` FROM `kids` WHERE `NAME` LIKE ? LIMIT 7';
		
		connection.query(womenSearchQuery, `%${searchText}%`, (err, womenRes) => {
			if (err)
				return res.status(500).json({
					error: err,
				});
			
			let womenResArr = [];
			womenRes.map((women) => {
				womenResArr.push({
					name: women.NAME,
					mainCatId: 1,
					productId: women.PRODUCT_ID,
				});
			});
			
			connection.query(kidsSearchQuery, `%${searchText}%`, (err, kidRes) => {
				if (err)
					return res.status(500).json({
						error: err,
					});
				
				let kidResArr = [];
				kidRes.map((women) => {
					kidResArr.push({
						name: women.NAME,
						mainCatId: 1,
						productId: women.PRODUCT_ID,
					});
				});
				
				let searchResult = {
					data: {
						womenSearch: womenResArr,
						kidsSearch: kidResArr,
					}
				};
				
				return res.json(searchResult);
				
			});
			
		});
	});
}

exports.getAllClothing = (req, res) => {
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {mainCatId, email} = fields;
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID` AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` ORDER BY `women`.`NA_DATE` DESC'
			
			connection.query(womenQuery, (err, womenResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					try {
						let list = [];
						womenResults.map((prod) => {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						});
						return res.json(list);
					} catch (e) {
						console.log(e)
					}
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=1 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						womenResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
			
		} else if (mainCatId == 2) { // Kids Category
			const kidsQuery = 'SELECT `kids`.`ID` AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `price`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` ORDER BY `kids`.`NA_DATE` DESC'
			
			connection.query(kidsQuery, (err, kidsResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					kidsResults.map((prod) => {
						try {
							prod.wishlist = false;
							// console.log(prod.image);
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						kidsResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								// console.log(prod.price);
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
			
		} else if (mainCatId == 3) { // Men Category
			const menQuery = 'SELECT `men`.`ID` AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `price`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brand`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` ORDER BY `men`.`NA_DATE` DESC'
			
			connection.query(menQuery, (err, menResults) => {
				if (err)
					return res.status(500).json({
						error: 'Something went wrong'
					});
				if (!email) {
					let list = [];
					menResults.map((prod) => {
						try {
							prod.wishlist = false;
							let img = JSON.parse(prod.image);
							prod.image = img[0];
							let data = JSON.parse(prod.price);
							prod.price = parseInt(data[0].RETAILED_PRICE);
							prod.size = data[0].OTHER_SIZE;
							prod.ID = undefined;
							list.push(prod);
						} catch (e) {
							console.log(e)
						}
					});
					return res.json(list);
				} else {
					const wishlistQuery = 'SELECT `PRODUCT_ID` FROM `wishlist` WHERE `MAIN_ID`=2 AND `EMAIL`=?';
					connection.query(wishlistQuery, email, (err, wishRes) => {
						if (err)
							return res.status(500).json({
								error: err,
							});
						let list = [];
						menResults.map((prod) => {
							try {
								const checkProdId = obj => obj.PRODUCT_ID === prod.productId;
								prod.wishlist = wishRes.some(checkProdId);
								let img = JSON.parse(prod.image);
								prod.image = img[0];
								let data = JSON.parse(prod.price);
								prod.price = parseInt(data[0].RETAILED_PRICE);
								prod.size = data[0].OTHER_SIZE;
								prod.ID = undefined;
								list.push(prod);
							} catch (e) {
								console.log(e)
							}
						});
						return res.json(list);
					});
				}
			});
		} else {
			//Invalid Category
			res.status(404).json({
				error: 'Invalid Category',
			});
		}
		
	})
}