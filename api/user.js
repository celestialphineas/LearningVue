const db                = require('./db');
const data              = require('./data');
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

// Choose a course
router.post('/:email/course/:course-entry', (req, res) => {
    // TODO: Auth
    var email = req.params['email'];
    var entry = req.params['course-entry'];
    if(!(entry in data.courses))
        res.status(404).end();
    else {
        var updateObj = {
            course:         entry,
            courseSeed:     Math.floor(Math.random() * 1000),
            courseEpoch:    new Date().getTime()
        };
        updateObj.wordsToLearn
            = data.courses.getRandomOrder(updateObj.courseSeed);
        // Write database
        db.updateUser(email, updateObj).then(() => res.status(200).end());
    }
});

// Pin a word
router.post('/:email/pinned/:word', (req, res) => {
    // TODO: Auth
    var email = req.params['email'];
    var word  = req.params['word'];
    if(!(word in data.wordData))
        res.status(204).end();
    else {
        db  .getUserdata(email)
            .then(data => {
                try { if(data.pinned.indexOf(word) !== -1) { res.status(204).end(); return;} }
                catch (e) { res.status(500).end(); }
                try { data.pinned.push(word); }
                catch (e) { res.status(500).end(); }
                db  .updateUser(email, { pinned: data.pinned })
                    .then(() => res.status(200).end())
                    .catch( err => {res.status(500).end(); throw err;});
            })
            .catch(err => {res.status(500).end(); throw err;});
    }
});

// Unpin a word
router.delete('/:email/pinned/:word', (req, res) => {
    // Todo: Auth
    var email = req.params['email'];
    var word  = req.params['word'];
    db  .getUserdata(email)
        .then(data => {
            try {
                if(data.pinned.indexOf(word) === -1) {
                    res.status(204).end(); return;
                } else {
                    data.pinned.splice(data.pinned.indexOf(word), 1);
                    db  .updateUser(email, { pinned: data.pinned })
                        .then(() => res.status(200).end())
                        .catch( err => {res.status(500).end(); throw err;});
                }
            } catch (e) {
                throw e;
            }
        })
        .catch(err => {res.status(500).end(); throw err;});
})

module.exports = router;
