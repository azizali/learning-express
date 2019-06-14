const express = require('express')
const app = express()

const usersRouter = require('./users/')
const notesRouter = require('./notes/')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', require('./users/'))
app.use('/notes', notesRouter)

const PORT = 3100
app.listen(PORT, ()=>{
  console.log(`The app is running on http://localhost:${PORT}`)
})
