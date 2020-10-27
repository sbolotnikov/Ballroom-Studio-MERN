const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    manager: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        //validate user to teacher or admin
    }],
    customer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        //valid user to student
    }],
    installments: [{
        date: Date,
        amount: Number,
        isPaid: Boolean,
    }],
    expirationDate: Date,
    sessions: [{
        session: {
            type: Schema.Types.ObjectId,
            ref: 'Session'
        },
        discount: Number,
        numberOfSessions: Number
    }],
    discount: Number

});

//create a virtual "invoiceTotal" add up (sessions.session.price * sessions.discount)

InvoiceSchema.virtual('invoiceTotal')
.get( () => {
    let sessionTotal = this.sessions.reduce((accumulator, session)=> accumulator + 
        (session.session.price * (1-session.discount) * session.numberOfSessions));
    return sessionTotal * (1-this.discount);
})

InvoiceSchema.set('timestamps', true);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;