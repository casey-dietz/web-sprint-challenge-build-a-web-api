// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router()
const mw = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get(`/:id`, mw.validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post("/", mw.validateProjectBody, (req, res, next) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(next)
})

router.put("/:id", mw.validateProjectId, mw.validateProjectBody, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(next)
})

router.delete("/:id", mw.validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(next)
})

router.get('/:id/actions', mw.validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
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