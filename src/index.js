// Not supported YET by Node.js
// import express from 'express'
const express = require('express')

// App
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next)=>{
  console.log('hi')
  req.special = 'salesforce'
  next()
})

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

app.post('/user/:id', userReq, cleanUpUser)

function cleanUpUser(){
  console.log('bye2')
}

function userReq(req, res, next){
  console.log('bye', req.special)
  const { id } = req.params
  const { info, profile } = req.query
  const { isEmployee } = req.body

  res.send('hi ' + id + info + profile + isEmployee)
  next()
}

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
  next()
}, cleanUpUser)

app.post('/', (req, res, next)=>{
  res.send('Post me')
}, cleanUpUser)

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