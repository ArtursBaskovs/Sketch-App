import admin from "firebase-admin";

import serviceAccount from "../db/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
const dbFirestore = admin.firestore();

export default dbFirestore;