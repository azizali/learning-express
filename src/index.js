// Not supported YET by Node.js
// import express from 'express'
const express = require('express')

// App
const app = express()

// CRUD
// CREATE READ UPDATE DELETE

// Path, Middleware(function)
app.get('/', (req, res, next)=>{
  res
    .header('Content-Type', 'text/plain')
    .status(401)
    .end()
    //.download
    //.json()
})

app.get('/user', (req, res, next)=>{
  res.format({
    'text/plain': function () {
      res.send('User')
    },
  
    'text/html': function () {
      res.send('<p>User HTML</p>')
    },
  
    'application/json': function () {
      res.send({ user: 'I am JSON User' })
    },
  
    'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
})

app.post('/', (req, res, next)=>{
  res.send('Post me')
})

app.put('/', (req, res, next)=>{
  res.send('Put')
})

app.delete('/', (req, res, next)=>{
  res.send('Delete')
})

const PORT = 3100
app.listen(PORT, ()=>{
  console.log(`The app is running on http://localhost:${PORT}`)
})