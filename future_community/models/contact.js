var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/MyOwn')

var contactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		enum: ["男","女"]
	},
	telphone: {
		type: String,
		required: true
	},
	desc: {
		type: String
	}
})

module.exports = mongoose.model('Contact',contactSchema)