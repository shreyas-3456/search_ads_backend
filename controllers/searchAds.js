const Ads = require('../models/ads');
const { StatusCodes } = require('http-status-codes');

const searchAds = async (req, res) => {
	let data;
	if (!req.query.search) {
		// For the page intial load
		data = await Ads.aggregate([
			{
				$lookup: {
					from: 'companies',
					localField: 'companyId',
					foreignField: '_id',
					as: 'companiesData',
				},
			},
			{ $unwind: '$companiesData' },
			{
				$group: {
					_id: '$_id',
					company: { $first: '$companiesData' },
					primaryText: { $first: '$primaryText' },
					headline: { $first: '$headline' },
					description: { $first: '$description' },
					cta: { $first: '$CTA' },
					imageUrl: { $first: '$imageUrl' },
				},
			},
		]);
		return res.status(StatusCodes.OK).json({ count: data.length, data });
	}
	// For search query
	const { search } = req.query;
	data = await Ads.aggregate([
		{
			$lookup: {
				from: 'companies',
				localField: 'companyId',
				foreignField: '_id',
				as: 'companiesData',
			},
		},
		{
			$match: {
				$or: [
					{ 'companiesData.name': { $regex: search, $options: 'i' } },
					{ primaryText: { $regex: search, $options: 'i' } },
					{ headline: { $regex: search, $options: 'i' } },
					{ description: { $regex: search, $options: 'i' } },
				],
			},
		},
		{ $unwind: '$companiesData' },
		{
			$group: {
				_id: '$_id',
				company: { $first: '$companiesData' },
				primaryText: { $first: '$primaryText' },
				headline: { $first: '$headline' },
				description: { $first: '$description' },
				cta: { $first: '$CTA' },
				imageUrl: { $first: '$imageUrl' },
			},
		},
	]);
	res.status(StatusCodes.OK).json({ count: data.length, data });
};

module.exports = {
	searchAds,
};
