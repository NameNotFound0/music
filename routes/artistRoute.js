const express = require('express') //Getting Express
const Artist = require('../models/artistModel') //Model for Artist
const {getArtists, getArtist, createArtist, updateArtist, deleteArtist} = require('../controllers/artistController') //Getting controllers

const router = express.Router(); //Use routes

//Read -> Show all artists in Library
router.get('/', getArtists)

//Read -> Show an artist in Library with ID
router.get('/:id', getArtist)

//Create a new Artist
router.post('/', createArtist)

//Update an artist using ID
router.put('/:id', updateArtist)

//Delete an Artist
router.delete('/:id', deleteArtist)

module.exports = router; //exporting router variable