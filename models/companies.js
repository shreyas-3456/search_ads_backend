const mongoose = require('mongoose');

module.exports = mongoose.model(
	'companies',
	new mongoose.Schema({}, { strict: false })
);
