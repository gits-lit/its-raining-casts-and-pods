/* twilio stuff */
const twilio = require('twilio');
const config = require('./config.json');
const client = new twilio(config.twilioSid, config.twilioToken);

const functions = require('firebase-functions');

exports.textMessage = functions.database.ref('/')
    .onCreate(event => {
      const data = event.data.val;

      client.messages.create({
          body: 'Your new podcast is available at' + data.link,
          to: config.receiverNumber,  // Text this number
          from: config.senderNumber // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      .done();
    });
