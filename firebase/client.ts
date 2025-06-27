// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps } from "firebase/app";
// import {Auth, getAuth} from "firebase/auth"
// import {FirebaseStorage, getStorage} from "firebase/storage"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDcw9H6Gi1joA8HwNY3u9mBlPMPce4rpkI",
//   authDomain: "nextjs-project-a5fd3.firebaseapp.com",
//   projectId: "nextjs-project-a5fd3",
//   storageBucket: "nextjs-project-a5fd3.firebasestorage.app",
//   messagingSenderId: "161177126780",
//   appId: "1:161177126780:web:49dea03842fec1794746f9"
// };

// // Initialize Firebase (getApps return a list of initialize app)
// const currentApps = getApps()
// let auth: Auth;
// let storage

// if(!currentApps.length) {
//     const app = initializeApp(firebaseConfig); 
//     auth = getAuth(app)
//     storage = getStorage(app)
// } else {
//     const app = currentApps[0]
//     storage = getStorage(app)
// }
// export {auth, storage}
// import {auth, storage} from '@/firebase/client

// firebase/client.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuration Firebase (peut aussi venir de variables d'environnement)
const firebaseConfig = {
  apiKey: "AIzaSyDcw9H6Gi1joA8HwNY3u9mBlPMPce4rpkI",
  authDomain: "nextjs-project-a5fd3.firebaseapp.com",
  projectId: "nextjs-project-a5fd3",
  storageBucket: "nextjs-project-a5fd3.appspot.com", // ⛔️ Fix: `.app` → `.appspot.com`
  messagingSenderId: "161177126780",
  appId: "1:161177126780:web:49dea03842fec1794746f9",
};

// Initialisation de l'app Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialisation des services
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
