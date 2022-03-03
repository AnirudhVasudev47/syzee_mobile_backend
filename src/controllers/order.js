const formidable = require("formidable");
const {connection} = require("../config/database_config");

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