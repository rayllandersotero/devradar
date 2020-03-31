const parseStringAsArray = require('../utils/parseStringAsArray');
const Devs = require('../models/Dev');

module.exports = {
	async index(req, res) {
		const { latitude, longitude, techs } = req.query;

		const techsStringToArray = parseStringAsArray(techs);

		await Devs.find({
			techs: { $in: techsStringToArray },
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [ longitude, latitude ]
					},
					$maxDistance: 10000
				}
			}
		})
			.then((response) => {
				return res.send(response);
			})
			.catch((error) => {
				return res.status(400).send(error);
			});
	}
};
