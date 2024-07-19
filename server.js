const express = require('express')
const app = express()

//Routes

app.get('/', (req, res)=>{
	res.send('Hi Music')
})

app.listen(5000,() =>{
	console.log('Music is running on port 5000')
})