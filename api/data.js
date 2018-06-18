const express           = require('express');
const fs                = require('fs');
const path              = require('path');
const router            = express.Router();

var getPath = str =>  path.join(path.basename(__dirname) + '/json/', str);

try {
    var wordData
        = JSON.parse(fs.readFileSync(getPath('worddata.min.json')));
    var pronunciationData
        = JSON.parse(fs.readFileSync(getPath('pronunciation.min.json')));
} catch (e) {
    console.log(e);
    console.log('data.js: Reading data from the disk failed.');
}

router.get('/:word', (req, res) => {
    var word = req.params['word'];
    var data = wordData[word];
    if(data) {
        data['pronunciation'] = pronunciationData[word] ? 'http://' + pronunciationData[word] : null;
    } else {
        data = null;
    }
    var responseJSON = JSON.stringify(data);
    res .header('Content-Type', 'application/json')
        .status(200)
        .send(responseJSON);
});

module.exports = router;
