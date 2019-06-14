const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
  res
    .header('Content-Type', 'text/plain')
    .status(401)
    .end()
    //.download
    //.json()
})

router.post('/', (req, res, next)=>{
  res.send('Post me')
})

router.put('/', (req, res, next)=>{
  res.send('Put')
})

router.delete('/', (req, res, next)=>{
  res.send('Delete')
})

module.exports = router