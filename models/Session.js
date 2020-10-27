const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema ({
    sessionName: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    inPersonLimit: {type: Number},
    adultClass: {type: Boolean},
    sessionDuration: {
        type: Number,
        required: true
    },
    startTime: {type: Number},
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    daysOfWeek:[{
        type: String,
    }],
    sessionCalendar: [{
        date: {
            type: Date,
        }
    }],
    price: Number
});

SessionSchema.set('timestamps', true);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session