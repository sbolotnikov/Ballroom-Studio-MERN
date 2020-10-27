// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Stripe create checkout session
const YOUR_DOMAIN = 'http://localhost:3000/checkout';

module.exports = function (app) {
    app.post('/create-customer', async (req, res) => {
        const customer = await stripe.customers.create({
            email: 'jenny.rosen@example.com',
            payment_method: 'pm_1FWS6ZClCIKljWvsVCvkdyWg',
            invoice_settings: {
              default_payment_method: 'pm_1FWS6ZClCIKljWvsVCvkdyWg',
            },
        });
        res.json(customer);
    })


    app.post('/create-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                // price_data: {
                //     currency: 'usd',
                //     product_data: {
                //         name: 'Stubborn Attachments',
                //         images: ['https://i.imgur.com/EHyR2nP.png'],
                //     },
                //     unit_amount: 2000,
                // },
                // quantity: 1,
            }, ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        res.json({
            id: session.id
        });
    });

    // send invoice to customer.email
    app.post('/send-invoice', async (req, res) => {
        const invoice = await stripe.invoices.create({
            customer: 'cus_4fdAW5ftNQow1a',
            collection_method: 'send_invoice',
            days_until_due: 30,
        });
        res.json(invoice);
    })

}