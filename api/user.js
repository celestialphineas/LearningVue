const auth              = require('./auth').auth;
const arrange           = require('./arrange');
const db                = require('./db');
const data              = require('./data');
const express           = require('express');
const router            = express.Router();

// Get user info with email
router.get('/:email', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email   = req.params['email'];

        db  .getUserdata(email)
            .then(data => {
                delete data._id;
                delete data.md5;
                res.json(data);
            })
            .catch(() => 
                res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + email));
    })
    .catch(x => res.status(403).end());
});

// Get user info with email
router.get('/:email/basic', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email   = req.params['email'];

        db  .getUserdata(email)
            .then(data => {
                res.json({name:data.name, email:data.email});
            })
            .catch(() => 
                res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + email));
    })
    .catch(x => res.status(403).end());
});

// Choose a course
router.post('/:email/course/:entry', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var entry = req.params['entry'];
        if(!(entry in data.courses)) {
            res.status(404).end();
        }
        else {
            var updateObj = {
                course:         entry,
                courseSeed:     Math.floor(Math.random() * 1000),
                courseEpoch:    new Date().getTime()
            };
            updateObj.wordsToLearn
                = data.courses[entry].data.getRandomOrder(updateObj.courseSeed);
            // Write database
            db.updateUser(email, updateObj).then(() => res.status(200).end());
        }
    })
    .catch(x => res.status(403).end());
});

// Pin a word
router.post('/:email/pinned/:word', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
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
                            .catch( err => {res.status(500).end(); console.log(err); });
                    })
                    .catch(err => {res.status(500).end(); console.log(err); });
            }
    })
    .catch(x => res.status(403).end());
});

// Unpin a word
router.delete('/:email/pinned/:word', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
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
                            .catch( err => {res.status(500).end(); console.log(err); });
                    }
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(err => res.status(500).end());
    })
    .catch(err => {res.status(403).end();});
});

// Define a word (insert a word to the learning set)
router.post('/:email/define', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var words = req.body;
        db  .getUserdata(email)
            .then(data => {
                var newToLearn;
                try { newToLearn = words.concat(data.wordsToLearn); }
                catch (e) { res.status(500).end(); }
                db  .updateUser(email, { wordsToLearn: newToLearn })
                    .then(() => res.status(200).end())
                    .catch( err => {res.status(500).end(); console.log(err); });
            })
            .catch(err => {res.status(500).end(); console.log(err); });
    })
    .catch(x => res.status(403).end());
});

// Change words daily
router.put('/:email/words-daily', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var newVal = req.body[0];
        db  .getUserdata(email)
            .then(data => {
                try { data.wordsDaily = newVal; }
                catch (e) { res.status(500).end(); }
                db  .updateUser(email, { wordsDaily: data.wordsDaily })
                    .then(() => res.status(200).end())
                    .catch( err => {res.status(500).end(); console.log(err); });
            })
            .catch(err => {res.status(500).end(); console.log(err); });
    })
    .catch(x => res.status(403).end());
});

// Change name
router.put('/:email/name', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var newVal = req.body[0];
        db  .getUserdata(email)
            .then(data => {
                try { data.name = newVal; }
                catch (e) { res.status(500).end(); }
                db  .updateUser(email, { name: data.name })
                    .then(() => res.status(200).end())
                    .catch( err => {res.status(500).end(); console.log(err); });
            })
            .catch(err => {res.status(500).end(); console.log(err); });
    })
    .catch(x => res.status(403).end());
});

// Get today's task
router.get('/:email/today', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var roundDate = timestamp => {
            timestamp -= timestamp % (24 * 60 * 60 * 1000);
            timestamp += new Date().getTimezoneOffset() * 60 * 1000;
            return timestamp;
        };
        db  .getUserdata(email)
            .then(data => {
                try {
                    var words = [], course = null;
                    var learntCount = 0;
                    var ex = data.experience;
                    if(ex && ex.length) {
                        // Check if the last activity is in the same day with now
                        if(roundDate(ex[ex.length - 1].time) === roundDate(new Date().getTime())) {
                            learntCount = ex[ex.length - 1].done;
                        }
                    }
                    var left = Math.max(data.wordsDaily - learntCount, 0);
                    var n = Math.min(left, data.wordsToLearn.length);
                    words = data.wordsToLearn.slice(0, n);
                    course = data.course;
                    res.json({words, course});
                } catch (e) { err => {res.status(500).end(); console.log(err); } }
            })
            .catch(err => {res.status(500).end(); console.log(err);});
    })
    .catch(x => res.status(403).end());
});

// Learn a new word
router.put('/:email/learnt', (req, res) => {
    auth(req, res).then(x => {let {req, res} = x;
        var email = req.params['email'];
        var word = req.body[0];
        var times = req.body[1];
        db  .getUserdata(email)
            .then(data => {
                // This function modifies the data object
                try {
                    arrange(data, word, times);
                } catch (e) {
                    res.status(500).end(); console.log(e);
                    return;
                }
                db  .updateUser(email, data)
                    .then(() => res.status(200).end())
                    .catch( err => {res.status(500).end(); console.log(err); });
            })
            .catch(err => {res.status(500).end(); console.log(err);});
    })
    .catch(x => res.status(403).end());
});

module.exports = router;
