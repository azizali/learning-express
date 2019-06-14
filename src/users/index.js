const express = require('express')
const router = express.Router()

const User = require('./Model')

function validateUser (req, res, next){
  const fields = []
  const name = req.body.name
  const age = req.body.age
  
  if(!name){
    fields.push('name')
  }

  if(!age){
    fields.push('age')
  }

  if(fields.length === 0){
    next()
  } else {
    res
      .status(403)
      .send(fields.join(',') + ' are required')
  }

}
router.post('/', validateUser, (req, res, next)=>{
  const {name, age} = req.body
  const userInstance = new User({ name, age })

  userInstance
    .save()
    .then((data)=>{
      console.log(data)
      res.json(data)
    })
    .catch((error)=>{
      res.status(403).send(error)
    })

})

router.get('/', (req, res, next)=>{
  User
    .find()
    .then(docs=>{
      res.json(docs)
    })
    .catch(()=>{
      res
        .status(500)
        .send('Something went wrong')
    })
})

router.get('/:id', (req, res, next)=>{
  const { id } = req.params
  User
    .findOne({_id: id})
    .then(docs=>{
      res.json(docs)
    })
    .catch(()=>{
      res
        .status(500)
        .send('Something went wrong')
    })
})

router.put('/:id', (req, res, next)=>{
  const { id } = req.params
  User
    .findOneAndUpdate({_id: id}, {
      ...req.body
    }, { new: true })
    .then(docs=>{
      res.json(docs)
    })
    .catch(()=>{
      res
        .status(500)
        .send('Something went wrong')
    })
})

router.delete('/:id', (req, res, next)=>{
  const { id } = req.params
  
  User
    .deleteOne({_id: id})
    .then(docs=>{
      res.json(docs)
    })
    .catch(()=>{
      res
        .status(500)
        .send('Something went wrong')
    })
})



module.exports = router