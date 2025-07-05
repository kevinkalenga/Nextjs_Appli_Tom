// import {FireStore} from 'firebase-admin/firestore';
// // import { getApps } from 'firebase-admin/firestore';
// import admin, { initializeApp } from 'firebase-admin';
// import { Auth, getAuth } from 'firebase/auth';
// import { getApps } from 'firebase/app';



// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "nextjs-project-a5fd3",
//   "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//   "private_key": process.env.FIREBASE_PRIVATE_KEY,
//   "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//   "client_id": process.env.FIREBASE_CLIENT_ID,
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nextjs-project-a5fd3.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }

// let firestore: FireStore;
// let auth: Auth;
// const currentApps = getApps()

// if(!currentApps.length) {
//     const app = initializeApp({
//         credential: admin.credential.cert(serviceAccount as ServiceAccount)
//     });
//     firestore = getFirestore(app)
//     auth = getAuth(app)
// } else {
//     const app = currentApps[0]
//     firestore = getFirestore(app)
//     auth = getAuth(app)
// }
// export {firestore, auth}

// firebase/server.ts

import admin from 'firebase-admin';
import { getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  type: "service_account",
  project_id: "nextjs-project-a5fd3",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nextjs-project-a5fd3.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
} as ServiceAccount;

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = getFirestore();
const auth = getAuth();

export { firestore, auth };

// pagination
export const getTotalPages = async (firestoreQuery: FirebaseFirestore.Query<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData

  >, pageSize: number) => {
   const queryCount = firestoreQuery.count();
   const countSnapshot = await queryCount.get();
   const countData = countSnapshot.data();
   const total = countData.count;
   const totalPages = Math.ceil(total /pageSize)
   return totalPages;
}
