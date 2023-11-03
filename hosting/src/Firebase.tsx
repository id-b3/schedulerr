// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099")

const db = getDatabase();
if (location.hostname === "localhost") {
        connectDatabaseEmulator(db, "127.0.0.1", 9000);
}

export { db, auth };
