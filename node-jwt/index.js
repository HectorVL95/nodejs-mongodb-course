const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = 3000

app.get('/api', (req, res)=>{
  res.json({
    message: 'Hey there! welcome to this API service',
  });

})

app.post('/api/posts', verifyToken, (req, res) => {
  res.json({
    message: "Post Created..."
  })
})

app.post('/api/login', (req,res) =>{
  const user = {
    id:1,
    username: "John",
    email: "john@gmail.com"
  }

  jwt.sign({user: user}, 'secretkey', (err, token) => {
  res.json({
    token,
  })
})
})

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  }
  else{
    res.sendStatus(403)
  }
}


app.listen(PORT, ()=>{
 console.log('Listening to port 3000')}
)
