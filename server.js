require('dotenv').config() //Dotenv -> Make code cleaner (read .env)
const express = require('express') //For Server
const mongoose = require('mongoose') //For Connection to MongoDB
const artistRoute = require('./routes/artistRoute'); //Importing our Routes
const errorMiddleware = require('./middleware/errorMiddleware') //Error middleware
const cors = require('cors') //getting cors middleware for connections

const app = express() //Using app with express

app.use(cors())
app.use(express.json()) //for manipulation info with json
app.use(express.urlencoded({extended: false}))

//Variables for .env
const PORT = process.env.PORT || 5000
const MONGO_ADD = process.env.MONGO_ADD

//Routes
app.use('/api/artists', artistRoute);

//Index
app.get('/', (req, res)=>{
	//res.send('Hi Music')
})

app.use(errorMiddleware)

//mongoose.connect('mongodb://127.0.0.1:27017/music')
mongoose.connect(MONGO_ADD)
.then(()=>{
	console.log('Connected to MongoDB')
	app.listen(PORT,() =>{
		console.log('Music app is running on port: '  + PORT)
	});
}).catch((error)=>{
	console.log(error)
})