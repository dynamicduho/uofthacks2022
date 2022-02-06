const firebase = require("firebase/app")
const firestore = require("firebase/firestore")

const getMessage = async (phone_number) => {
    const firebaseConfig = {
      apiKey: `${process.env.FIREBASE_API_KEY}`,
      authDomain: "uofthacks2022.firebaseapp.com",
      projectId: "uofthacks2022",
      storageBucket: "uofthacks2022.appspot.com",
      messagingSenderId: "125311308975",
      appId: "1:125311308975:web:0eb8603051787f04f1f05a"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firestore.getFirestore(app);

  const docRef = firestore.doc(db, "users", phone_number);
  const docSnap = await firestore.getDoc(docRef);

  return JSON.stringify(JSON.parse(JSON.stringify(docSnap.data())),null,2);
};


exports.handler = async function (context, event, callback) {
  // The pre-initialized Twilio Client is available from the `context` object
  const twilioClient = context.getTwilioClient();
  const userInfo = await getMessage(event.from); // event.from is user phone number

  // Query parameters or values sent in a POST body can be accessed from `event`
  const from = /*event.From ||*/ '+12262127233'; // the Safeline hotline number
  const to = /*event.To ||*/ 'Enter Police number or any other number';
  const body = event.Body || `${userInfo}`;

  // Use `messages.create` to generate a message. Be sure to chain with `then`
  // and `catch` to properly handle the promise and call `callback` _after_ the
  // message is sent successfully!
  twilioClient.messages
    .create({ body, to, from })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      // Make sure to only call `callback` once everything is finished, and to pass
      // null as the first parameter to signal successful execution.
      return callback(null, `Success! Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error(error);
      return callback(error);
    });
};