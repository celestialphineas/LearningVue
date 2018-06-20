const express           = require('express');
const fs                = require('fs');
const path              = require('path');
const router            = express.Router();

var getPath = str =>  path.join(path.basename(__dirname) + '/json/', str);

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
}

router.get('/:word', (req, res) => {
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
    if(!(k+1)) 
        res.header('Content-Type', 'application/text').status(404).send('404 Invalid amount');
    if(k > n)
        res.header('Content-Type', 'application/text').status(404).send('404 Maximum index exceeds');
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
})

module.exports = router;
