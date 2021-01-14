const mongoose = require('mongoose');
const Calendar = mongoose.model('Calendars');
exports.list_all_tests = (req, res) => {
    Calendar.find({}, (err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
};
exports.create_a_test = (req, res) => {
    const newWord = new Calendar(req.body);
    newWord.save((err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};
exports.read_a_test = (req, res) => {
    Calendar.findById(req.params.id, (err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};
exports.update_a_test = (req, res) => {
    Calendar.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, word) => {
            if (err) res.send(err);
            res.json(word);
        }
    );
};
exports.delete_a_test = (req, res) => {
    Calendar.deleteOne({ _id: req.params.id }, err => {
        if (err) res.send(err);
        res.json({
            message: 'calendar successfully deleted',
            _id: req.params.wordId
        });
    });
};