const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.addMeasurement = functions.https.onRequest(async (req, res) => {
  if(req.method !== 'POST') {
    return res.json({result: 'Must be POST'})
  }

  functions.logger.info('Adding new measurement', {structuredData: true});
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()


  const writeResult = await admin.firestore().collection(`${year}/${month}/${day}`).doc(d.toJSON()).set(req.body);
  res.json({result: `Measurement with ID: ${d.toJSON()} added.`});
});
