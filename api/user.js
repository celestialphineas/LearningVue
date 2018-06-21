const db                = require('./db');
const express           = require('express');
const router            = express.Router();

// Get user info with email
router.get('/:email', (req, res) => {
    var email   = req.params['email'];

    db  .getUserdata(email)
        .then(data => {
            delete data._id;
            delete data.md5;
            res.json(data);
        })
        .catch(() => 
            res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + email));
});

router.post('/:email/course/:course-entry', (req, res) => {
    // TODO: Auth
    var email = req.params['email'];
    var entry = req.params['course-entry'];
    
    
})

module.exports = router;
