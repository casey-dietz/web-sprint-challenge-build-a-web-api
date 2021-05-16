const Projects = require('./projects-model')

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(project => {
            if(!project || Object.keys(project).length === 0){
                return res.status(404).json("Project with specified ID not found")
            }
            req.project = project
            next()
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function validateProjectBody(req, res, next){
    if (!req.body.name || !req.body.description) {
        return res.status(400).json("Required fields missing")
    }
    next()
}

module.exports = { validateProjectId, validateProjectBody }