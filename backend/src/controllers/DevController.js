const Axios = require('axios');

const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		await Dev.find()
			.then((response) => {
				return res.json(response);
			})
			.catch((error) => {
				return res.status(400).json(error);
			});
	},

	async create(req, res) {
		const { github_username, techs, latitude, longitude } = req.body;

		const techsStringToArray = parseStringAsArray(techs);

		const location = {
			type: 'Point',
			coordinates: [ longitude, latitude ]
		};

		const api = await Axios.get(`https://api.github.com/users/${github_username}`);
		const { name = login, avatar_url, bio } = api.data;

		await Dev.create({
			github_username,
			name,
			avatar_url,
			bio,
			techs: techsStringToArray,
			location
		})
			.then((response) => {
				return res.json(response);
			})
			.catch((error) => {
				return res.status(400).json(error);
			});
	}
};
