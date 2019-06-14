const express = require('express')
const router = express.Router()

const Notes = require('./Model')
const Users = require('../users/Model')

router.post('/', (req, res, next)=>{
  const { name, userId } = req.body
  const NotesInstance = new Notes({ name, userId })

  let note
  NotesInstance
    .save()
    .then((noteDoc)=>{
      note = noteDoc
      return Users.findOne({_id: userId})
    })
    .then((userDoc)=>{
      console.log(userDoc)
      userDoc.noteIds.push(note._id)
      return userDoc.save()
    })
    .then(()=>{
      res.json(note)
    })
    .catch((error)=>{
      res.status(403).send(error)
    })

})

router.get('/', (req, res, next)=>{
  Notes
    .find()
    .populate('userId')
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
  Notes
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
  Notes
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
  
  Notes
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