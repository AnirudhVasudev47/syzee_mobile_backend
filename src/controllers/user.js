const formidable = require("formidable");
const axios = require("axios");
const FormData = require('form-data');
const request = require('request');
const {mockUrl} = require("../config/constants");
const {connection} = require("../config/database_config");
const e = require("express");
const moment = require("moment");

exports.test = (req, res) => {
	return res.json({
		test: 'works',
		query: req.query,
	})
}

exports.signup = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: `An error occurred ${err}`
			});
		}
		
		const {name, email, phone, code, password} = fields;
		
		if (!name || !email || !phone || !code || !password) {
			
			return res.status(404).json({
				error: `All fields are mandatory`
			});
		}
		
		const regUrl = `${mockUrl}/login.php`;
		const options = {
			'method': 'POST',
			'url': regUrl,
			formData: {
				'action': 'RegisterCheck',
				'email': email,
				'phone': phone,
			}
		};
		request(options, function (error, checkRes) {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			if (checkRes.body === '0') {
				return res.json({
					data: 'Already registered',
				})
			} else {
				const options = {
					'method': 'POST',
					'url': regUrl,
					formData: {
						'action': 'Register',
						'name': name,
						'email': email,
						'phone': phone,
						'code': code,
						'password': password,
					}
				};
				request(options, (error, regRes) => {
					if (error) {
						return res.status(500).json({
							error: error,
						});
					}
					return res.json({
						data: 'Success'
					});
				});
			}
		});
	});
}

exports.checkUser = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: `An error occurred ${err}`
			});
		}
		
		const {email, phone} = fields;
		
		
		if (!email || !phone) {
			
			return res.status(404).json({
				error: `All fields are mandatory`
			});
		}
		
		const regUrl = `${mockUrl}/login.php`;
		const options = {
			'method': 'POST',
			'url': regUrl,
			formData: {
				'action': 'RegisterCheck',
				'email': email,
				'phone': phone,
			}
		};
		request(options, function (error, checkRes) {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			if (checkRes.body === '0') {
				return res.json({
					data: 'Already registered',
				})
			} else {
				return res.json({
					data: 'Not registered'
				});
			}
		});
	});
}

exports.signin = (req, res) => {
	
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: `An error occurred ${err}`
			});
		}
		
		const {email, password} = fields;
		
		if (!email || !password) {
			return res.status(404).json({
				error: `All fields are mandatory`
			});
		}
		console.log('email: ', email, '\npassword: ', password);
		const regUrl = `${mockUrl}/login.php`;
		const options = {
			'method': 'POST',
			'url': regUrl,
			formData: {
				'action': 'userLogin',
				'email': email,
				'password': password,
			}
		};
		request(options, function (error, checkRes) {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			if (checkRes.body === '3') {
				return res.json({
					data: 'Not registered',
				})
			} else if (checkRes.body === '1') {
				return res.json({
					data: 'Wrong password',
				})
			} else {
				let resArr = checkRes.body.split('|+|')
				console.log(resArr);
				
				return res.json({
					data: resArr[0],
				});
			}
		});
		
	})
	
}

exports.getUserDetailsByMail = (req, res) => {
	
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {email} = fields;
		
		if (!email) {
			return res.status(404).json({
				error: 'All fields mandatory',
			});
		}
		
		const getUserQuery = 'SELECT `ID`, `NAME`, `PHONE_NUMBER`, `CODE` FROM `register` WHERE `EMAIL`=?';
		
		connection.query(getUserQuery, email, (err, userRes) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			
			let finalRes = {};
			
			finalRes.id = userRes[0].ID;
			finalRes.name = userRes[0].NAME;
			finalRes.phone = userRes[0].PHONE_NUMBER;
			finalRes.code = userRes[0].CODE;
			finalRes.email = email;
			
			return res.json(finalRes);
		});
	});
	
}


exports.addToCart = (req, res) => {
	
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		
		const {mainCatId, productId, size, email} = fields;
		
		if (!mainCatId || !productId || !size || !email) {
			return res.status(404).json({
				error: 'All fields are mandatory.',
			});
		}
		const date = moment();
		
		const checkCartQuery = 'SELECT * FROM `cart_view` WHERE `MAIN_ID`=? AND `PRODUCT_ID`=? AND `SIZE`=? AND `EMAIL`=?'
		const checkValues = [mainCatId, productId, size, email];
		
		const addCartQuery = 'INSERT INTO `cart_view` (`MAIN_ID`, `PRODUCT_ID`, `QTY`, `SIZE`, `EMAIL`, `CREATED_ON`) VALUES (?, ?, ?, ?, ?, ?)'
		const values = [mainCatId, productId, 1, size, email, date.format('YYYY-MM-DD hh:mm:ss')];
		
		connection.query(checkCartQuery, checkValues, (err, checkRes) => {
			if (err) {
				return res.status(500).json({
					error: err
				});
			}
			console.log(checkRes);
			if (checkRes.length !== 0) {
				const finalQty = parseInt(checkRes[0].QTY) + 1;
				
				const addQtyQuery = 'UPDATE `cart_view` SET `QTY` = ? WHERE `ID` = ?';
				const addQtyValues = [finalQty, checkRes[0].ID];
				return connection.query(addQtyQuery, addQtyValues, (err, result) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					}
					return res.json({
						data: 'success',
						result: result,
					});
				});
			}
			
			connection.query(addCartQuery, values, (err, cartRes) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				}
				
				return res.json({
					data: 'success',
					result: cartRes,
				});
				
			});
		});
	})
	
}


exports.getCartByUserEmail = (req, res) => {
	
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {email} = fields;
		
		if (!email) {
			res.status(404).json({
				error: 'All Fields are mandatory.'
			});
		}
		
		// const fetchCartQuery = 'SELECT `cart_view`.`MAIN_ID` AS main_id, `cart_view`.`PRODUCT_ID` AS prod_id, `cart_view`.`QTY` AS quantity, `cart_view`.`SIZE` AS size, `women`.`NAME`, `women`.`TAG_LINE`, `women`.`COLOUR`, `women`.`COLOUR_CODE` FROM `cart_view` LEFT JOIN `women` ON `cart_view`.`PRODUCT_ID` = `women`.`ID`';
		
		
		const regUrl = `${mockUrl}/inclued.php`;
		const options = {
			'method': 'POST',
			'url': regUrl,
			formData: {
				'action': 'fetchCartlist',
				'email': email,
			}
		};
		request(options, (error, cartRes) => {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			
			let result = {};
			
			if (cartRes.body == 0) {
				return res.json({
					data: {
						cart: [],
						noOfItems: 0,
						total: 0,
					},
				})
			}
			
			const data = JSON.parse(cartRes.body)
			
			// res.json(data);
			// console.log(data)
			
			let cartList = [];
			data.map((cart) => {
				try {
					let cartObj = {};
					
					cartObj.name = cart.NAME;
					cartObj.id = cart.PRODUCT_ID;
					cartObj.mainId = cart.MAIN_ID;
					cartObj.tagLine = cart.TAG_LINE ?? 'NA';
					cartObj.size = cart.SIZE;
					cartObj.quantity = cart.QTY;
					
					let image = JSON.parse(cart.IMAGE);
					cartObj.image = image[0];
					
					let variant = JSON.parse(cart.VARIANTS);
					
					let obj = variant.find(o => o.OTHER_SIZE == cart.SIZE);
					
					cartObj.price = obj.DISCOUNT_PRICE == "" ? obj.RETAILED_PRICE : obj.DISCOUNT_PRICE;
					
					cartList.push(cartObj);
				} catch (e) {
					console.log(e);
				}
			});
			result.cart = cartList;
			let sum = 0;
			let itemSum = 0;
			cartList.map((cart) => {
				sum = sum + parseInt(`${cart.price}`);
				itemSum = itemSum + parseInt(`${cart.quantity}`);
			});
			result.noOfItems = itemSum;
			result.total = sum;
			
			res.json({
				data: result,
			});
		});
		
	});
	
}

exports.setCartQuantity = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {productId, quantity, email, size} = fields;
		
		if (!productId || !quantity || !email || !size) {
			res.status(404).json({
				error: 'All Fields are mandatory.'
			});
		}
		
		const updateQuery = 'UPDATE `cart_view` SET `QTY`=? WHERE `PRODUCT_ID`=? AND `EMAIL`=? AND `SIZE`=?'
		connection.query(updateQuery, [quantity, productId, email, size], (err, delResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			
			return res.json(delResult);
			
		});
	});
}

exports.getAllCoupons = (req, res) => {
	
	const couponQuery = 'SELECT `ID`AS id, `COUPON_CODE` AS code, `AMOUNT` AS amount, `AMOUNT_TYPE` AS type, `MINI_PURCHASE` AS minimum, `EXIPER_DATE`AS expiry FROM `coupon`';
	connection.query(couponQuery, (err, couponRes) => {
		if (err) {
			return res.status(500).json({
				error: err,
			});
		}
		let result = [];
		couponRes.map((coupon) => {
			
			let coup = moment(coupon.expiry);
			
			if (coup > moment.now()) { //TODO: flip the symbol (for test: '<')
				result.push(coupon);
			}
			
		});
		
		return res.json({
			data: result,
		});
	})
	
}

exports.deleteFromCart = (req, res) => {
	
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		
		const {id, size, email} = fields;
		
		if (!id || !size || !email) {
			res.status(404).json({
				error: 'All Fields are mandatory.'
			});
		}
		
		const delQuery = 'DELETE FROM `cart_view` WHERE `PRODUCT_ID`=? AND `SIZE`=? AND `EMAIL`=?'
		connection.query(delQuery, [id, size, email], (err, delResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			
			return res.json(delResult);
			
		})
		
	})
	
}

exports.getUserWishlist = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: `An error occurred ${err}`
			});
		}
		
		const {email} = fields;
		
		if (!email) {
			return res.status(404).json({
				error: `All fields are mandatory`
			});
		}
		
		const getWishUrl = `${mockUrl}/inclued.php`;
		const options = {
			'method': 'POST',
			'url': getWishUrl,
			formData: {
				'action': 'fetchWishlist',
				'email': email,
			}
		};
		request(options, function (error, checkRes) {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			
			let temp = [];
			if (checkRes.body != 0) {
				const response = JSON.parse(checkRes.body);
				response.map((wish) => {
					let obj = {};
					obj.mainCatId = wish.mainCateID;
					obj.productId = wish.PRODUCT_ID;
					obj.image = JSON.parse(wish.IMAGE)[0];
					obj.productName = wish.NAME;
					obj.tagLine = wish.TAG_LINE;
					obj.size = wish.SIZE;
					obj.wishlist = true;
					let data = JSON.parse(wish.VARIANTS);
					obj.price = parseInt(data[0].RETAILED_PRICE);
					temp.push(obj);
				});
			}
			return res.json({
				data: temp,
			});
		});
		
	})
}

exports.addToWishlist = (req, res) => {
	
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		
		const {mainCatId, productId, size, email} = fields;
		
		if (!mainCatId || !productId || !size || !email) {
			return res.status(404).json({
				error: 'All fields are mandatory.',
			});
		}
		const date = moment();
		const addToWishQuery = "INSERT INTO `wishlist`(`SIZE`, `MAIN_ID`, `PRODUCT_ID`, `EMAIL`, `CREATED_ON`) VALUES (?,?,?,?,?)"
		
		connection.query(addToWishQuery, [size, mainCatId, productId, email, date.format('YYYY-MM-DD hh:mm:ss')], (error, addRes) => {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			
			return res.json({
				data: addRes,
			});
		});
	});
}

exports.removeFromWishlist = (req, res) => {
	
	const form = formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		
		const {mainCatId, productId, email} = fields;
		
		if (!mainCatId || !productId || !email) {
			return res.status(404).json({
				error: 'All fields are mandatory.',
			});
		}
		
		const removeFromWishQuery = "DELETE FROM `wishlist` WHERE `MAIN_ID`=? AND `PRODUCT_ID`=? AND `EMAIL`=?"
		
		connection.query(removeFromWishQuery, [mainCatId, productId, email], (error, removeRes) => {
			if (error) {
				return res.status(500).json({
					error: error,
				});
			}
			
			return res.json({
				data: removeRes,
			});
		});
	});
}