// This module arranges data and updates

const CONTINUED = 1, NEWREC = 0;

function insertToExperience(data, word, times) {
    var roundDate = timestamp => {
        timestamp -= timestamp % (24 * 60 * 60 * 1000);
        timestamp += new Date().getTimezoneOffset() * 60 * 1000;
        return timestamp;
    };
    try {
    if(data.experience && data.experience.length) {
        var last = data.experience[data.experience.length - 1];
        if((typeof last.vector.find(x => x[0] === word)) !== 'undefined')
            return CONTINUED;
        if(roundDate(last.time) === roundDate(new Date().getTime())) {
            last.vector.push([word, times]);
            last.done++;
            last.time = new Date().getTime();
            return CONTINUED;
        }
    }
    // Push new
    if(!data.experience) data.experience = [];
    data.experience.push({
        time:   new Date().getTime(),
        target: data.wordsDaily,
        done:   1,
        vector: [[word, times]]
    });
    return NEWREC;
} catch(err) { throw err; }}

function popFromToLearn(data, word) {
    var index = data.wordsToLearn.indexOf(word);
    if(index !== -1) {
        data.wordsToLearn.splice(index, 1);
    }
}

function arrangeRevision(data, exp) {
    var wordsToReview = exp.vector.filter(pair => pair[1] !== 0).map(pair => pair[0]);
    // { word: [{time, count}] }
    var wordsActiviation = {};
    var isWordToReview = x => wordsToReview.indexOf(x) !== -1;
    // Retrieve the vector
    for(let exp in data.experience) {
        var ts = data.experience[exp].time;
        var vec = data.experience[exp].vector;
        vec
            // Filter those that are to review
            .filter(pair => isWordToReview(pair[0]))
            // Map
            .map(pair => {
                if(!wordsActiviation[pair[0]]) wordsActiviation[pair[0]] = [];
                wordsActiviation[pair[0]].push({ time: ts, count: pair[1] });
            });
    }
    // Revision scores
    var scores = {};
    var maxScore = 0;
    var now = new Date().getTime();
    for(let word in wordsActiviation) {
        // [{time, count}, {time, count}, {time, count}]
        scores[word] = wordsActiviation[word].map(
            x =>
                Math.exp((now - x.time)/1000/3600/24 * x.count)
        ).reduce((x, y) => x + y);
        if(scores[word] > maxScore) maxScore = scores[word];
    }
    // Normailize
    for(let word in scores) {
        scores[word] /= maxScore;
    }
    // Determine their positions in the wordsToLearn array
    var wordsToLearn = data.wordsToLearn;
    for(let word in scores) {
        let index = (scores[word] + 1) * 5 * data.wordsDaily;
        index = Math.min(index, wordsToLearn.length);
        wordsToLearn.splice(index, 0, word);
    }
}

// Arrange user data when a new word is learnt
// and the times parameter counts the times
// the user has learnt the word
function arrange(data, word, times) {
    try {
        var cond = insertToExperience(data, word, times);
        popFromToLearn(data, word);
        var lastButOne = data.experience[data.experience.length - 2]
        var last = data.experience[data.experience.length - 1];
        // Arrange revision if and only if a day's work is done
        // or a new day is started but the privious was not finished 
        if(last.target === last.done) {
            arrangeRevision(data, last);
        } else if(cond === NEWREC && lastButOne && lastButOne.target !== lastButOne.done) {
            arrangeRevision(data, lastButOne);
        }
    }
    catch(err) { throw err; }
}

module.exports = arrange;
