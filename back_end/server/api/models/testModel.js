const mongoose = require('mongoose');
const { Schema } = mongoose;
const CalendarSchema = new Schema(
    {
        name: {
            type: String,
            required: 'English word cannot be blank'
        },
        author: {
            type: String,
            required: 'German word cannot be blank'
        }
    },
    { collection: 'calendar' }
);
module.exports = mongoose.model('Calendars', CalendarSchema);