const express = require('express')

// const app = express()
const router = express.Router()

router.post('/:id', userReq, cleanUpUser)

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

router.get('/', (req, res, next)=>{
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

module.exports = router