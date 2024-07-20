const express = require('express') //For Server
const mongoose = require('mongoose') //For Connection to MongoDB
const Artist = require('./models/artistModel') //Model for Artist
const app = express() //Using app with express

app.use(express.json()) //for manipulation info with json
app.use(express.urlencoded({extended: false}))

//Routes

//Index
app.get('/', (req, res)=>{
	res.send('Hi Music')
})

//Read -> Show all artists in Library
app.get('/artists',async(req, res)=>{
	try{
		const artists = await Artist.find({});
		res.status(200).json(artists)
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

//Read -> Show an artist in Library with ID
app.get('/artists/:id', async(req, res)=>{
	try{
		const{id} = req.params;
		const artist = await Artist.findById(id);
		res.status(200).json(artist);
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

//Create a new Artist
app.post('/artist', async(req, res) =>{
	try{
		const artist = await Artist.create(req.body)
		res.status(200).json(artist);
	}catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message})
	}
})

//Update an artist using ID
app.put('/artists/:id', async(req, res)=>{
	try{
		const {id} = req.params;
		const artist = await Artist.findByIdAndUpdate(id, req.body);
		//If we don't find anything
		if(!artist){
			return res.status(404).json({message: 'We were not able to find any artist with ID: ${id}'})
		}
		const updatedArtist = await Artist.findById(id)
		res.status(200).json(updatedArtist)

	}catch(error){
		res.status(500).json({message: error.message})
	}
})

//Delete an Artist
app.delete('/artists/:id', async(req, res)=>{
	try{
		const {id} = req.params;
		const artist = await Artist.findByIdAndDelete(id);
		if(!artist){
			return res.status(404).json({message: 'We were not able to find any artist with ID: ${id}'})
		}
		res.status(200).json(artist)
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

mongoose.connect('mongodb://127.0.0.1:27017/music')
.then(()=>{
	console.log('Connected to MongoDB')
	app.listen(5000,() =>{
		console.log('Music app is running on port 5000')
	});
}).catch((error)=>{
	console.log(error)
})