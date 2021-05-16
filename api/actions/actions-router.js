// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')

const router = express.Router()
const mw = require('./actions-middleware')

router.get("/", (req, res, next) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(next)
})

router.get("/:id", mw.validateActionId, (req, res) => {
    res.status(200).json(req.action);
})

router.post("/", mw.validateActionBody, (req, res, next) => {
    Action.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(next)
})

router.put("/:id", mw.validateActionId, mw.validateActionBody, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next)
})

router.delete("/:id", mw.validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next)
})

router.use((err, req, res, next) => {  // eslint-disable-line
    res.status(err.status || 500).json({
      customeMessage: 'something tragic inside projects router happened',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router