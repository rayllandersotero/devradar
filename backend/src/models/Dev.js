const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
	name: String,
	github_username: {
		type: String,
		required: true
	},
	bio: String,
	avatart_url: String,
	techs: [ String ],
	location: {
		type: PointSchema,
		index: '2dsphere'
	}
});

module.exports = mongoose.model('dev', DevSchema);
