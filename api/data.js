const express           = require('express');
const fs                = require('fs');
const path              = require('path');
const SeededRand        = require('./util/SeededRand');
const router            = express.Router();

var getPath = str =>  path.join(path.basename(__dirname) + '/json/', str);

function Wordlist(entry) {
    this.entry = entry;
    try {
        this.list = JSON.parse(fs.readFileSync(getPath('lists/' + entry + '.json')));
    } catch (e) {
        console.log('data.js: Opening word list data failed: ' + entry);
        throw e;
    }
    this.getRandomOrder = function(seed) {
        var n = this.list.length;
        var range = new Array(n).fill(null).map((_, i) => i);
        SeededRand.seed(seed);
        for(let i = 1; i <= n; i++) {
            let c = range[n - i];
            let rand = Math.floor(SeededRand.random() * (n - i));
            range[n - i] = range[rand];
            range[rand]  = c;
        };
        return range.map(i => this.list[i]);
    }
}

var courses = {
    'cet4-easy': {
        name: 'CET4 easy',
        description: 'A collection of easy words for CET4',
        data: new Wordlist('cet4-easy')
    },
    'cet4-hard': {
        name: 'CET4 hard',
        description: 'A collection of hard words for CET4',
        data: new Wordlist('cet4-hard')
    },
    'cet6': {
        name: 'CET6',
        description: 'CET6 word collection',
        data: new Wordlist('cet6')
    },
    'elementary700': {
        name: 'Elementry 700',
        description: 'Elementry 700 words',
        data: new Wordlist('elementary700')
    },
    'gre': {
        name: 'GRE',
        description: 'GRE word collection',
        data: new Wordlist('gre')
    },
    'post-cet6': {
        name: 'Post-CET6',
        description: 'Post-CET6 word collection',
        data: new Wordlist('post-cet6')
    }
};

var wordData = {}, pronunciationData = {}, wordList = [];
try {
    wordData
        = JSON.parse(fs.readFileSync(getPath('worddata.min.json')));
    pronunciationData
        = JSON.parse(fs.readFileSync(getPath('pronunciation.min.json')));
    wordList = Object.keys(wordData);
} catch (e) {
    console.log(e);
    console.log('data.js: Reading data from the disk failed.');
    throw e;
}

router.get('/word/:word', (req, res) => {
    var word = req.params['word'];
    var data = wordData[word];
    if(data) {
        data['pronunciation'] = pronunciationData[word] ? pronunciationData[word] : null;
    } else {
        data = null;
    }
    var responseJSON = JSON.stringify(data);
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

router.get('/random/:k', (req, res) => {
    var k = req.params['k'];
    k = parseInt(k);
    var n = wordList.length;
    if(!(k+1)) {
        res.header('Content-Type', 'application/text').status(404).send('404 Invalid amount');
        return;
    }
    if(k > n) {
        res.header('Content-Type', 'application/text').status(404).send('404 Maximum index exceeds');
        return;
    }
    var range = new Array(n).fill(null).map((_, i) => i);
    for(let i = 1; i <= k; i++) {
        let c = range[n - i];
        let rand = Math.floor(Math.random() * (n - i));
        range[n - i] = range[rand];
        range[rand]  = c;
    }
    var result = range.slice(n - k, n).map(i => wordList[i]);
    var responseJSON = JSON.stringify(result);
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

router.get('/course', (req, res) => {
    var result = [];
    for(var course in courses) {
        result.push({
            entry       : course,
            name        : courses[course].name,
            description : courses[course].description
        });
    }
    var responseJSON = JSON.stringify(result);
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

router.get('/course/:entry', (req, res) => {
    var entry = req.params['entry'];
    if(typeof entry !== 'string' || !(entry in courses)) {
        res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + entry);
        return;
    }
    var responseJSON = JSON.stringify(courses[entry].data.list);
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

router.get('/course/:entry/:seed', (req, res) => {
    var entry   = req.params['entry'];
    var seed    = req.params['seed'];

    try {
        seed = parseInt(seed);
    } catch {
        res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + seed);
        return;
    }
    if(typeof entry !== 'string' || !(entry in courses)) {
        res.header('Content-Type', 'application/text').status(404).send('404 Not found: ' + entry);
        return;
    }

    var responseJSON = JSON.stringify(courses[entry].data.getRandomOrder(seed));
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

router.courses = courses;
router.wordData = wordData;
router.pronunciationData = pronunciationData;

module.exports = router;
