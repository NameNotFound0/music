const mongoose = require('mongoose')

/*const artistSchema = mongoose.Schema({
	name: String,
	albums: [{
		title: String,
		songs: [{
			title: String,
			length: String
		}],
		description: String
	}]
})*/

const artistSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter name of Artist"]
	},
	albums: [{
		title: String,
		songs: [{
			title: String,
			length: String
		}],
		description: String
	}]
},
	{versionKey: false //don't add version key to document
})

const Artist = mongoose.model('Artist',artistSchema);
module.exports = Artist;