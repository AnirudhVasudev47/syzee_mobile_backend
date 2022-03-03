const formidable = require("formidable");
const {connection} = require("../config/database_config");
const moment = require("moment");

exports.getUsersAddress = (req, res) => {
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
				error: 'All fields are mandatory.',
			});
		}
		
		const getAddressQuery = 'SELECT `ID` AS id,`NAME` AS name,`EMAIL` AS email,`CODE` AS code,`PHONE` AS phone,`ADDRESS` AS doorNo,`COUNTRY` AS buildingNo,`STATE` AS street,`CITY` AS zone, `POSTAL_CODE` AS country,`SET_ADDRESS` AS `type` FROM `user_address` WHERE `EMAIL`=? AND `STATUS`=1';
		
		connection.query(getAddressQuery, email, (err, addRes) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json({
				data: addRes,
			});
		});
	})
}

exports.addAddress = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {name, email, code, phone, doorNo, buildingNo, street, zone, country, addType} = fields;
		
		if (
			!name ||
			!email ||
			!code ||
			!phone ||
			!doorNo ||
			!buildingNo ||
			!street ||
			!zone ||
			!country ||
			!addType) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const date = moment();
		
		const addAddressQuery = 'INSERT INTO `user_address`(`NAME`, `EMAIL`, `CODE`, `PHONE`, `ADDRESS`, `COUNTRY`, `STATE`, `CITY`, `POSTAL_CODE`, `SET_ADDRESS`, `STATUS`, `CREATED_ON`, `CREATED_BY`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		
		connection.query(addAddressQuery, [name, email, code, phone, doorNo, buildingNo, street, zone, country, addType, 1, date.format('YYYY-MM-DD hh:mm:ss'), email], (err, addResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json(addResult);
		});
	});
	
}

exports.updateAddress = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {id, name, email, code, phone, doorNo, buildingNo, street, zone, country, addType} = fields;
		
		if (
			!id ||
			!name ||
			!email ||
			!code ||
			!phone ||
			!doorNo ||
			!buildingNo ||
			!street ||
			!zone ||
			!country ||
			!addType) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const date = moment();
		
		const addAddressQuery =
			'UPDATE `user_address` SET `NAME`=?,`CODE`=?,`PHONE`=?,`ADDRESS`=?,`COUNTRY`=?,`STATE`=?,`CITY`=?,`POSTAL_CODE`=?,`SET_ADDRESS`=?,`STATUS`=?,`RESET_ON`=?,`RESET_BY`=? WHERE `ID`=?';
		
		connection.query(addAddressQuery, [name, code, phone, doorNo, buildingNo, street, zone, country, addType, 1, date.format('YYYY-MM-DD hh:mm:ss'), email, id], (err, addResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json(addResult);
		});
	});
	
}

exports.deleteUserAddress = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {id} = fields;
		
		if (!id) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const deleteAddressQuery = 'UPDATE `user_address` SET `STATUS`=? WHERE `ID`=?';
		
		connection.query(deleteAddressQuery, [99, id], (err, fields) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			
			return res.json({
				data: fields,
			});
		});
		
	});
}

exports.updateAddress = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {id, name, email, code, phone, doorNo, buildingNo, street, zone, country, addType} = fields;
		
		if (
			!id ||
			!name ||
			!email ||
			!code ||
			!phone ||
			!doorNo ||
			!buildingNo ||
			!street ||
			!zone ||
			!country ||
			!addType) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const date = moment();
		
		const addAddressQuery =
			'UPDATE `user_address` SET `NAME`=?,`CODE`=?,`PHONE`=?,`ADDRESS`=?,`COUNTRY`=?,`STATE`=?,`CITY`=?,`POSTAL_CODE`=?,`SET_ADDRESS`=?,`STATUS`=?,`RESET_ON`=?,`RESET_BY`=? WHERE `ID`=?';
		
		connection.query(addAddressQuery, [name, code, phone, doorNo, buildingNo, street, zone, country, addType, 1, date.format('YYYY-MM-DD hh:mm:ss'), email, id], (err, addResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json(addResult);
		});
	});
	
}

exports.getUsersSizingProfiles = (req, res) => {
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
				error: 'All fields are mandatory',
			});
		}
		
		const getSizingProfileQuery = 'SELECT `ID` AS id, `HEIGHT` AS height, `HEIGHT_UNITS` AS height_unit, `WEIGHT` AS weight, `WEIGHT_UNITS`AS weight_unit, `UPPER_BODY`AS upper_body, `LOWER_BODY`AS lower_body, `LENGTH`AS length, `WIDTH`AS width, `CHEST`AS chest, `SLEEVES_FROM_NECK`AS sleeves_from_neck, `WAIST`AS waist, `WAIST_FROM_NECK`AS waist_from_neck, `CHEST_FROM_NECK`AS chest_from_neck, `HIPS`AS hips, `STATUS`AS status, `CREATED_ON`AS created_on, `CREATED_BY` AS created_by, `RESET_ON` AS reset_on FROM `size_profile` WHERE `CREATED_BY`=?';
		
		connection.query(getSizingProfileQuery, email, (err, getResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			
			let selectedId = -1;
			
			if (getResult.length !== 0) {
				getResult.map((size, index) => {
					if (size.status === 1) {
						selectedId = size.id;
					}
				});
			}
			
			res.json({
				data: getResult,
				selectedId: selectedId,
			});
			
		});
	});
	
}

exports.updateUserSizingProfile = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {
			height,
			heightUnits,
			weight,
			weightUnits,
			upperBody,
			lowerBody,
			length,
			width,
			chest,
			sleevesFromNeck,
			waist,
			waistFormNeck,
			chestFromNeck,
			hips,
			id
		} = fields;
		
		if (
			!height ||
			!heightUnits ||
			!weight ||
			!weightUnits ||
			!upperBody ||
			!lowerBody ||
			!length ||
			!width ||
			!chest ||
			!waist ||
			!waistFormNeck ||
			!sleevesFromNeck ||
			!chestFromNeck ||
			!hips ||
			!id) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const date = moment();
		
		const addAddressQuery = 'UPDATE `size_profile` SET `HEIGHT`=?,`HEIGHT_UNITS`=?,`WEIGHT`=?,`WEIGHT_UNITS`=?,`UPPER_BODY`=?,`LOWER_BODY`=?,`LENGTH`=?,`WIDTH`=?,`CHEST`=?,`SLEEVES_FROM_NECK`=?,`WAIST`=?,`WAIST_FROM_NECK`=?,`CHEST_FROM_NECK`=?,`HIPS`=?,`STATUS`=?,`RESET_ON`=? WHERE `ID`=?';
		
		connection.query(addAddressQuery, [height, heightUnits, weight, weightUnits, upperBody, lowerBody, length, width, chest, sleevesFromNeck, waist, waistFormNeck, chestFromNeck, hips, 0, date.format('YYYY-MM-DD hh:mm:ss'), id], (err, addResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json(addResult);
		});
	});
	
}

exports.addUserSizingProfile = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {
			height,
			heightUnits,
			weight,
			weightUnits,
			upperBody,
			lowerBody,
			length,
			width,
			chest,
			sleevesFromNeck,
			waist,
			waistFormNeck,
			chestFromNeck,
			hips,
			email
		} = fields;
		
		if (
			!height ||
			!heightUnits ||
			!weight ||
			!weightUnits ||
			!upperBody ||
			!lowerBody ||
			!length ||
			!width ||
			!chest ||
			!waist ||
			!waistFormNeck ||
			!sleevesFromNeck ||
			!chestFromNeck ||
			!hips ||
			!email) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const date = moment();
		
		const addAddressQuery = 'INSERT INTO `size_profile`( `HEIGHT`, `HEIGHT_UNITS`, `WEIGHT`, `WEIGHT_UNITS`, `UPPER_BODY`, `LOWER_BODY`, `LENGTH`, `WIDTH`, `CHEST`, `SLEEVES_FROM_NECK`, `WAIST`, `WAIST_FROM_NECK`, `CHEST_FROM_NECK`, `HIPS`, `STATUS`, `CREATED_ON`, `CREATED_BY`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		
		connection.query(addAddressQuery, [height, heightUnits, weight, weightUnits, upperBody, lowerBody, length, width, chest, sleevesFromNeck, waist, waistFormNeck, chestFromNeck, hips, 0, date.format('YYYY-MM-DD hh:mm:ss'), email], (err, addResult) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			return res.json(addResult);
		});
	});
	
}

exports.delUserSizingProfile = (req, res) => {
	const {id} = req.params;
	
	const deleteSizeQuery = 'DELETE FROM `size_profile` WHERE `ID`=?';
	
	connection.query(deleteSizeQuery, id, (err, delRes) => {
		if (err) {
			return res.status(500).json({
				error: err,
			});
		}
		return res.json(delRes);
	});
}

exports.updateDefaultSizeProfile = (req, res) => {
	const form = formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		
		const {email, id} = fields;
		
		if (
			!email ||
			!id
		) {
			return res.status(404).json({
				error: 'All fields are mandatory',
			});
		}
		
		const firstQuery = 'UPDATE `size_profile` SET `STATUS`=0 WHERE `STATUS`=1 AND `CREATED_BY`=?';
		const updateQuery = 'UPDATE `size_profile` SET `STATUS`=1 WHERE `ID`=?'
		
		connection.query(firstQuery, email, (err, firstRes) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			connection.query(updateQuery, id, (err, updateRes) => {
				if (err) {
					return res.status(500).json({
						error: err,
					});
				}
				res.json(updateRes);
			});
		});
		
	});
	
}