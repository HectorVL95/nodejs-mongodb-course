const express = require('express')
const app = express()
const port = 3000
const uuid = require('uuid')


//parse JSON using ex´ress
app.use(express.json());
app.use(express.urlencoded({extended: false}))

let movies =[
  {
    id:"0",
    title: 'Inception',
    director: 'Christopher Nolan',
    release_date: '2010-7-16'
  },
  {
    id:"1",
    title: 'The Irishman',
    director: 'Martin Scorsese',
    release_date: '2019-09-27'
  }
]

//get the movie list in the form of json

app.get('/movies', (req,res) => {
  res.json(movies)
})

//set up port
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
})

//add movie to the list
app.post('/movies',(req, res)=>{
  const movie = req.body
  
  console.log(movie);
  movies.push(movie);
  res.send("Movie is added to the list!")
  
})


//get movie by id
app.get('/movies/:id', (req,res)=>{
  const id = req.params.id

  for(let movie of movies){
    if(movie.id === id){
      res.json(movie)
      return 
    }
  }

  res.status(404).send('Movie not found')
}) 

//delete movie from list
app.delete('/movies/:id', (req, res) =>{
  const id = req.params.id

  movies = movies.filter(movie => {
    if(movie.id !== id){
      return true
    }
    return false
  })

  res.send('Movie is deleted')
})