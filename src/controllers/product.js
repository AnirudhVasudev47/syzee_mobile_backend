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
		
		const womenProductQuery = 'SELECT `women`.`NAME`, `women`.`SELLER_ID`, `women`.`PRODUCT_ID`, `women`.`TAG_LINE`, `women`.`DESCRIPTION`, `women`.`ID`, `women`.`COLOUR`, `women`.`COLOUR_CODE`, `women`.`IMAGE`, `women`.`VARIANTS`, `women`.`TAILOR_ASSIST`, `women`.`SIZE_CHART_STATUS`, `brands`.`NAME` AS `BRAND` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`PRODUCT_ID` = ? AND `women`.`SELLER_STATUS` = 1';
		const menProductQuery = 'SELECT `men`.`NAME`, `men`.`SELLER_ID`, `men`.`PRODUCT_ID`, `men`.`TAG_LINE`, `men`.`DESCRIPTION`, `men`.`ID`, `men`.`COLOUR`, `men`.`COLOUR_CODE`, `men`.`IMAGE`, `men`.`VARIANTS`, `men`.`TAILOR_ASSIST`, `men`.`SIZE_CHART_STATUS`, `brands`.`NAME` AS `BRAND` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` WHERE `men`.`PRODUCT_ID` = ? AND `men`.`SELLER_STATUS` = 1';
		const kidsProductQuery = 'SELECT `kids`.`NAME`, `kids`.`SELLER_ID`, `kids`.`PRODUCT_ID`, `kids`.`TAG_LINE`, `kids`.`DESCRIPTION`, `kids`.`ID`, `kids`.`COLOUR`, `kids`.`COLOUR_CODE`, `kids`.`IMAGE`, `kids`.`VARIANTS`, `kids`.`TAILOR_ASSIST`, `kids`.`SIZE_CHART_STATUS`, `brands`.`NAME` AS `BRAND` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`PRODUCT_ID` = ? AND `kids`.`SELLER_STATUS` = 1';
		
		if (mainCatId == 1) {
			
			connection.query(womenProductQuery, productStyle, (err, womenRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				if (womenRes.length !== 0) {
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
						console.log(prod);
						let finalObj = {};
						
						finalObj.id = prod.ID;
						finalObj.tailorAssist = prod.TAILOR_ASSIST;
						finalObj.chartStatus = prod.SIZE_CHART_STATUS;
						finalObj.color = prod.COLOUR_CODE;
						finalObj.colorName = prod.COLOUR;
						finalObj.images = JSON.parse(prod.IMAGE);
						finalObj.sizeVariants = [];
						let data = JSON.parse(prod.VARIANTS);
						data.map((size) => {
							finalObj.sizeVariants.push({
								size: size.OTHER_SIZE,
								stock: parseInt(size.QTY),
								price: size.RETAILED_PRICE,
								discount: size.DISCOUNT_PRICE
							});
						});
						
						finalRes.variants.push(finalObj);
						
					});
					
					return res.json(finalRes);
				} else {
					return res.json({
						data: 'no/product',
					});
				}
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
					finalObj.tailorAssist = prod.TAILOR_ASSIST;
					finalObj.chartStatus = prod.SIZE_CHART_STATUS;
					finalObj.colorName = prod.COLOUR;
					finalObj.images = JSON.parse(prod.IMAGE);
					finalObj.sizeVariants = [];
					let data = JSON.parse(prod.VARIANTS);
					data.map((size) => {
						finalObj.sizeVariants.push({
							size: size.OTHER_SIZE,
							stock: parseInt(size.QTY),
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
					finalObj.tailorAssist = prod.TAILOR_ASSIST;
					finalObj.chartStatus = prod.SIZE_CHART_STATUS;
					finalObj.color = prod.COLOUR_CODE;
					finalObj.images = JSON.parse(prod.IMAGE);
					finalObj.sizeVariants = [];
					let data = JSON.parse(prod.VARIANTS);
					data.map((size) => {
						finalObj.sizeVariants.push({
							size: size.OTHER_SIZE,
							stock: parseInt(size.QTY),
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

exports.getProductTable = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Bad request'
			});
		}
		
		const {mainCatId, productId} = fields;
		
		if (!mainCatId || !productId) {
			return res.status(400).json({
				error: 'All fields are mandatory.'
			});
		}
		
		const womenProductQuery = 'SELECT * FROM `women` WHERE `ID` = ?';
		const menProductQuery = 'SELECT * FROM `women` WHERE `ID` = ?';
		const kidsProductQuery = 'SELECT * FROM `women` WHERE `ID` = ?';
		
		if (mainCatId == 1) {
			connection.query(womenProductQuery, productId, (err, prodRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					obj.tableHeader = JSON.parse(prodRes[0].SIZE_CHART_TABLE_HEADING);
					obj.tableRows = JSON.parse(prodRes[0].SIZE_CHART_TABLE_ROW);
					obj.sizeImage = prodRes[0].SIZE_CHART_IMAGE;
					obj.modelSize = prodRes[0].MODAL_SIZE;
					obj.modelHeight = prodRes[0].MODAL_HEIGHT_MEAUREMENT;
					obj.modelChest = prodRes[0].MODAL_CHEST_MEAUREMENT;
					
					return res.json({
						result: obj,
					});
				} catch (e) {
					console.log(e);
					return res.status(500).json({
						message: 'Something went wrong.',
					});
				}
			});
		}
		if (mainCatId == 2) {
			connection.query(kidsProductQuery, productId, (err, prodRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					obj.tableHeader = JSON.parse(prodRes[0].SIZE_CHART_TABLE_HEADING);
					obj.tableRows = JSON.parse(prodRes[0].SIZE_CHART_TABLE_ROW);
					obj.sizeImage = prodRes[0].SIZE_CHART_IMAGE;
					obj.modelSize = prodRes[0].MODAL_SIZE;
					obj.modelHeight = prodRes[0].MODAL_HEIGHT_MEAUREMENT;
					obj.modelChest = prodRes[0].MODAL_CHEST_MEAUREMENT;
					
					return res.json({
						result: obj,
					});
				} catch (e) {
					console.log(e);
					return res.status(500).json({
						message: 'Something went wrong.',
					});
				}
			});
		}
		if (mainCatId == 3) {
			connection.query(menProductQuery, productId, (err, prodRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					obj.tableHeader = JSON.parse(prodRes[0].SIZE_CHART_TABLE_HEADING);
					obj.tableRows = JSON.parse(prodRes[0].SIZE_CHART_TABLE_ROW);
					obj.sizeImage = prodRes[0].SIZE_CHART_IMAGE;
					obj.modelSize = prodRes[0].MODAL_SIZE;
					obj.modelHeight = prodRes[0].MODAL_HEIGHT_MEAUREMENT;
					obj.modelChest = prodRes[0].MODAL_CHEST_MEAUREMENT;
					return res.json({
						result: obj,
					});
				} catch (e) {
					console.log(e);
					return res.status(500).json({
						message: 'Something went wrong.',
					});
				}
			});
		}
	});
}

exports.getCompleteLook = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Bad request'
			});
		}
		
		const {mainCatId, productStyle, sellerId, email} = fields;
		
		if (!mainCatId || !productStyle || !sellerId) {
			return res.status(400).json({
				error: 'All fields are mandatory.'
			});
		}
		
		if (mainCatId == 1) { // Women Category
			const womenQuery = 'SELECT `women`.`ID` AS `productId`, `women`.`PRODUCT_ID` AS `id`, `women`.`NAME` AS `name`, `women`.`IMAGE` AS `image`, `women`.`VARIANTS` AS `price`, `women`.`CREATED_ON` AS `created_on`, `women`.`RATINGS` AS `rating`, `women`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `women` LEFT JOIN `brands` ON `women`.`BRAND_ID` = `brands`.`ID` WHERE `women`.`SELLER_ID`= ? AND `women`.`PRODUCT_ID` != ?'
			
			connection.query(womenQuery, [sellerId, productStyle], (err, womenResults) => {
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
			const kidsQuery = 'SELECT `kids`.`ID` AS `productId`, `kids`.`PRODUCT_ID` AS `id`, `kids`.`NAME` AS `name`, `kids`.`IMAGE` AS `image`, `kids`.`VARIANTS` AS `price`, `kids`.`CREATED_ON` AS `created_on`, `kids`.`RATINGS` AS `rating`, `kids`.`COLOUR` AS `color`, `brands`.`NAME` AS `brand` FROM `kids` LEFT JOIN `brands` ON `kids`.`BRAND_ID` = `brands`.`ID` WHERE `kids`.`SELLER_ID` = ? AND `kids`.`PRODUCT_ID` != ?'
			
			connection.query(kidsQuery, [sellerId, productStyle], (err, kidsResults) => {
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
			const menQuery = 'SELECT `men`.`ID` AS `productId`, `men`.`PRODUCT_ID` AS `id`, `men`.`NAME` AS `name`, `men`.`IMAGE` AS `image`, `men`.`VARIANTS` AS `price`, `men`.`CREATED_ON` AS `created_on`, `men`.`RATINGS` AS `rating`, `men`.`COLOUR` AS `color`, `brand`.`NAME` AS `brand` FROM `men` LEFT JOIN `brands` ON `men`.`BRAND_ID` = `brands`.`ID` WHERE `men`.`SELLER_ID` = ? AND `men`.`PRODUCT_ID` != ?'
			
			connection.query(menQuery, [sellerId, productStyle],(err, menResults) => {
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
		}
	});
}