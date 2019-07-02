var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/MyOwn')

var repairSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	detail: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	houseNumber: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Repair',repairSchema)