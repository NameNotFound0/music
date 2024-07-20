const Artist = require('../models/artistModel') //Model for Artist
const asyncHandler = require('express-async-handler')

//Read -> Show all artists in Library
const getArtists = asyncHandler(async(req, res)=>{
	try{
		const artists = await Artist.find({});
		res.status(200).json(artists)
	}catch(error){
		//res.status(500).json({message: error.message})
		res.status(500);
		throw new Error(error.message);
	}
})

//Read -> Show an artist in Library with ID
const getArtist = asyncHandler(async(req, res)=>{
	try{
		const{id} = req.params;
		const artist = await Artist.findById(id);
		res.status(200).json(artist);
	}catch(error){
		//res.status(500).json({message: error.message})
		res.status(500);
		throw new Error(error.message);
	}
})

//Create a new Artist
const createArtist = asyncHandler(async(req, res) =>{
	try{
		const artist = await Artist.create(req.body)
		res.status(200).json(artist);
	}catch(error){
		console.log(error.message);
		//res.status(500).json({message: error.message})
		res.status(500);
		throw new Error(error.message);
	}
})

//Update an artist using ID
const updateArtist = asyncHandler(async(req, res)=>{
	try{
		const {id} = req.params;
		const artist = await Artist.findByIdAndUpdate(id, req.body);
		//If we don't find anything
		if(!artist){
			res.status(404);
			throw new Error('We were not able to find any artist with ID: ' + id);
			//return res.status(404).json({message: 'We were not able to find any artist with ID: ' + id})
		}
		const updatedArtist = await Artist.findById(id)
		res.status(200).json(updatedArtist)

	}catch(error){
		//res.status(500).json({message: error.message})
		res.status(500);
		throw new Error(error.message);
	}
})

//Delete an Artist
const deleteArtist = asyncHandler(async(req, res)=>{
	try{
		const {id} = req.params;
		const artist = await Artist.findByIdAndDelete(id);
		if(!artist){
			res.status(404);
			throw new Error('We were not able to find any artist with ID: ' + id);
			//return res.status(404).json({message: 'We were not able to find any artist with ID: ' + id})
		}
		res.status(200).json(artist)
	}catch(error){
		//res.status(500).json({message: error.message})
		res.status(500);
		throw new Error(error.message);
	}
})

module.exports = {
	getArtists,
	getArtist,
	createArtist,
	updateArtist,
	deleteArtist
}