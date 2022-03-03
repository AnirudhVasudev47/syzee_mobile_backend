const {connection} = require("../config/database_config");
exports.listOfInfluencer = (req, res) => {
	
	const influencerQuery = 'SELECT DISTINCT `influencer_list`.`ID`, `influencer_list`.`NAME`, `influencer_list`.`IMAGE`, `influencer_list`.`EMAIL` FROM `influencer_stories` LEFT JOIN `influencer_list` ON `influencer_stories`.`influencer_id` = `influencer_list`.`ID`;';
	
	connection.query(influencerQuery, (err, influencerRes) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong.',
				error: err,
			});
		}
		
		return res.json({
			data: influencerRes,
		});
	});
}

exports.getStoriesById = (req, res) => {

	const {id} = req.params;
	
	const storyQuery = 'SELECT `stories_images`,`added_on` FROM `influencer_stories` WHERE `influencer_id`=? AND `added_on`>= NOW() - INTERVAL 1 DAY';
	
	connection.query(storyQuery, id, (err, storyRes) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong.',
				error: err,
			});
		}
		
		return res.json({
			data: storyRes,
		})
	})

}
