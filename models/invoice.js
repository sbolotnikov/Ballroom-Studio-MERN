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
        sessionType: {
            type: String,
            enum: ["private", "group", "party"]
        },
        price: Number,
        discount: Number,
        numberOfSessions: Number
    }],
    discount: Number

}
    , { toJSON: { virtuals: true, } }

);

//create a virtual "invoiceTotal" add up (sessions.session.price * sessions.discount)

InvoiceSchema.virtual('invoiceTotal')
    .get(function() {
         let sessionTotal= this.sessions.reduce((accumulator, session) =>{ return accumulator +
            (session.price * (100 - session.discount) / 100 * session.numberOfSessions)},0);
        return parseFloat(sessionTotal * (100 - this.discount)/100).toFixed(2);
    })
InvoiceSchema.virtual('paid')
    .get(function() {
        let paidAmount=0;
        for(let i=0;i<this.installments.length;i++){
          if(this.installments[i].isPaid){
              paidAmount+=this.installments[i].amount;
          }
        }
        return paidAmount;
    })

InvoiceSchema.set('timestamps', true);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;