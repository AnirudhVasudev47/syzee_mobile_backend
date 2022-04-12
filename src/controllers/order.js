const formidable = require("formidable");
const {connection} = require("../config/database_config");
const {mockUrl} = require("../config/constants");
const request = require("request");

exports.getUserOrderHistory = (req, res) => {
	const form = new formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Bad request'
			});
		}
		
		const {email} = fields;
		
		const orderQuery = 'SELECT `PRODUCT_DETAILS`,`PRODUCT_TOTAL`,`ORDER_STATUS`,`ORDER_ID`, `CREATED_ON` FROM `place_order` WHERE `CREATED_BY`=?';
		
		connection.query(orderQuery, email, (err, orderRes) => {
			if (err) {
				return res.status(500).json({
					error: 'Something went wrong.'
				});
			}
			let tempList = [];
			orderRes.map((order) => {
				try {
					let prodDetails = JSON.parse(order.PRODUCT_DETAILS)
					let prodPrice = JSON.parse(order.PRODUCT_TOTAL)
					let orderStatus = JSON.parse(order.ORDER_STATUS)
					
					prodDetails.map((prod, index) => {
						let obj = {};
						obj.prodId = prod.PRODUCT_ID;
						obj.mainCatId = prod.MAIN_ID;
						obj.price = prodPrice[index];
						obj.status = orderStatus[index];
						obj.orderId = order.ORDER_ID;
						obj.date = order.CREATED_ON;
						obj.orderIndex = index;
						
						tempList.push(obj);
					});
					
				} catch (e) {
					console.log(e);
				}
			});
			return res.json({
				data: tempList,
			});
		});
	});
}

exports.getOrderDetails = (req, res) => {
	const form = new formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Bad request'
			});
		}
		
		const {mainCatId, prodId} = fields;
		
		const womenQuery = 'SELECT `IMAGE`,`NAME`,`PRODUCT_ID` FROM `women` WHERE `ID`=?'
		const menQuery = 'SELECT `IMAGE`,`NAME`,`PRODUCT_ID` FROM `men` WHERE `ID`=?'
		const kidsQuery = 'SELECT `IMAGE`,`NAME`,`PRODUCT_ID` FROM `kids` WHERE `ID`=?'
		
		if (mainCatId == 1) {
			connection.query(womenQuery, prodId, (err, womenRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					
					obj.image = JSON.parse(womenRes[0].IMAGE)[0];
					obj.name = womenRes[0].NAME;
					obj.prodId = womenRes[0].PRODUCT_ID;
					return res.json(obj);
				} catch (e) {
					return console.log(e);
				}
			})
		} else if (mainCatId == 2) {
			connection.query(kidsQuery, prodId, (err, kidsRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					
					obj.image = JSON.parse(kidsRes[0].IMAGE)[0];
					obj.name = kidsRes[0].NAME;
					obj.prodId = kidsRes[0].PRODUCT_ID;
					
					return res.json(obj);
				} catch (e) {
					return console.log(e);
				}
			})
		} else {
			connection.query(menQuery, prodId, (err, menRes) => {
				if (err) {
					return res.status(500).json({
						error: 'Something went wrong.'
					});
				}
				try {
					let obj = {};
					
					obj.image = JSON.parse(menRes[0].IMAGE)[0];
					obj.name = menRes[0].NAME;
					obj.prodId = menRes[0].PRODUCT_ID;
					
					return res.json(obj);
				} catch (e) {
					return console.log(e);
				}
			})
		}
		
	})
}

exports.placeOrderFromCart = (req, res) => {
	const form = new formidable.IncomingForm(req);
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: 'Bad request'
			});
		}
		
		const {
			email,
			userName,
			mobile,
			address,
			country,
			state,
			city,
			postalCode,
			addressType,
			total,
			coupon,
			points,
			grandTotal,
			paymentStatus,
			paymentId,
			couponDetails
		} = fields;
		
		if (
			!email ||
			!userName ||
			!mobile ||
			!address ||
			!country ||
			!state ||
			!city ||
			!postalCode ||
			!addressType ||
			!total ||
			!coupon ||
			!points ||
			!grandTotal ||
			!paymentStatus ||
			!paymentId ||
			!couponDetails
		) {
			
			console.log(
				`email: ${email}\n`,
				`userName: ${userName}\n`,
				`mobile: ${mobile}\n`,
				`address: ${address}\n`,
				`country: ${country}\n`,
				`state: ${state}\n`,
				`city: ${city}\n`,
				`postalCode: ${postalCode}\n`,
				`addressType: ${addressType}\n`,
				`total: ${total}\n`,
				`coupon: ${coupon}\n`,
				`points: ${points}\n`,
				`grandTotal: ${grandTotal}\n`,
				`paymentStatus: ${paymentStatus}\n`,
				`paymentId: ${paymentId}\n`,
				`couponDetails: ${couponDetails}\n`,
			)
			
			return res.status(404).json({
				error: 'All Fields are mandatory.'
			});
		}
		
		
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
			
			
			if (cartRes.body == 0) {
				return res.status(400).json({
					error: 'No items available in cart.'
				});
			}
			
			const data = JSON.parse(cartRes.body)
			
			// res.json(data);
			// console.log(data)
			
			let productDetArr = [];
			let prodTotArr = [];
			let orderStatusArr = [];
			let orderStatusReasonArr = [];
			let resetDateArr = [];
			let productIdArr = [];
			data.map((cart) => {
				try {
					let productDetObj = {};
					
					productDetObj.MAIN_ID = cart.MAIN_ID;
					productDetObj.PRODUCT_ID = cart.PRODUCT_ID;
					productDetObj.QTY = cart.QTY;
					productDetObj.SIZE = cart.SIZE;
					productDetObj.TAILOR_ASSIST = cart.TAILOR_ASSIST;
					productDetObj.HEIGHT = cart.HEIGHT;
					productDetObj.HEIGHT_UNITS = cart.HEIGHT_UNITS;
					productDetObj.WEIGHT = cart.WEIGHT;
					productDetObj.WEIGHT_UNITS = cart.WEIGHT_UNITS;
					productDetObj.UPPER_BODY = cart.UPPER_BODY;
					productDetObj.LOWER_BODY = cart.LOWER_BODY;
					productDetObj.LENGTH = cart.LENGTH;
					productDetObj.WIDTH = cart.WIDTH;
					productDetObj.CHEST = cart.CHEST;
					productDetObj.SLEEVES_FROM_NECK = cart.SLEEVES_FROM_NECK;
					productDetObj.WAIST = cart.WAIST;
					productDetObj.WAIST_FROM_NECK = cart.WAIST_FROM_NECK;
					productDetObj.CHEST_FROM_NECK = cart.CHEST_FROM_NECK;
					productDetObj.HIPS = cart.HIPS;
					
					productIdArr.push(cart.MAIN_ID);
					
					productDetArr.push(productDetObj)
					
					let sizeData = JSON.parse(cart.VARIANTS);
					
					let size = sizeData.find(o => o.OTHER_SIZE === cart.SIZE);
					
					if (size.DISCOUNT_PRICE == "" || size.DISCOUNT_PRICE == null) {
						prodTotArr.push(size.RETAILED_PRICE);
					} else {
						prodTotArr.push(size.DISCOUNT_PRICE);
					}
					orderStatusArr.push("0");
					orderStatusReasonArr.push("null");
					resetDateArr.push("null");
				} catch (e) {
					console.log(e);
				}
			});
			const options = {
				'method': 'POST',
				'url': regUrl,
				formData: {
					'action': 'placeNewOrder',
					'email': email,
					'Product_id': JSON.stringify(productIdArr),
					'Product_price': JSON.stringify(prodTotArr),
					'Product_detail': JSON.stringify(productDetArr),
					'UserName': userName,
					'UserMobileNo': mobile,
					'UserAddress': address,
					'country': country,
					'state': state,
					'city': city,
					'postalCode': postalCode,
					'type': addressType,
					'total': total,
					'coupon': coupon,
					'points': points,
					'grandTotal': grandTotal,
					'paymentstatus': paymentStatus,
					'paymentid': paymentId,
					'orderstatus': JSON.stringify(orderStatusArr),
					'couponDetails': couponDetails,
					'reasonOrderStatus': JSON.stringify(orderStatusReasonArr),
					'resetDate': JSON.stringify(resetDateArr),
				}
			};
			
			request(options, (error, cartRes) => {
				if (error) {
					return res.status(500).json({
						error: error,
					});
				}
				console.log(cartRes.body);
				return res.json(cartRes.body);
			})
			
		});
	});
	
}

/*
				email
				Product_id
				Product_price
				Product_detail
				UserName
				UserMobileNo
				UserAddress
				country
				state
				city
				postalCode
				type
				total
				coupon
				points
				grandTotal
				paymentstatus
				paymentid
				orderstatus
				couponDetails
				reasonOrderStatus
				resetDate
				
//-------------------------//
				
				{
			    ID: 41,
			    MAIN_ID: 1,
			    PRODUCT_ID: 17,
			    mainCateID: 1,
			    mainCateName: 'women',
			    IMAGE: '[\n    "abayas.webp",\n    "abayas1.png"\n]',
			    NAME: 'Kaftans',
			    CATEGORY_NAME: 'Kaftans',
			    TAG_LINE: ' vhm',
			    VARIANTS: '[
			                {"OTHER_SIZE":"XS","QTY":6,"RETAILED_PRICE":"300","DISCOUNT_PRICE":"240"},
			                {"OTHER_SIZE":"S","QTY":10,"RETAILED_PRICE":"300","DISCOUNT_PRICE":"240"},
			                {"OTHER_SIZE":"M","QTY":10,"RETAILED_PRICE":"300","DISCOUNT_PRICE":"240"},
			                {"OTHER_SIZE":"L","QTY":10,"RETAILED_PRICE":"300","DISCOUNT_PRICE":"240"}
			               ]',
			    STOCK_STATUS: '1',
			    RATINGS: '0',
			    POINTS: '10',
			    OFFERS: '2',
			    OFFER_TYPE: 'per',
			    QTY: 1,
			    SIZE: 'XS',
			    EMAIL: 'qw@gmail.com',
			    CREATED_ON: '2022-03-04 10:20:05',
			    TAILOR_ASSIST: 1,
			    HEIGHT: '12',
			    HEIGHT_UNITS: 'cm',
			    WEIGHT: '12',
			    WEIGHT_UNITS: 'kg',
			    UPPER_BODY: '42.5',
			    LOWER_BODY: '59.2',
			    LENGTH: '12',
			    WIDTH: '12',
			    CHEST: '12',
			    SLEEVES_FROM_NECK: '12',
			    WAIST: '12',
			    WAIST_FROM_NECK: '12',
			    CHEST_FROM_NECK: '12',
			    HIPS: '12'
			  },

 */