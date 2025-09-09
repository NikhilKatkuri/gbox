// firebase.ts

// Import the necessary functions from the SDKs
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "@/types/firebase";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth function
export async function googleAuth() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // User Info
    const user = result.user;

    // Get device information including IP address
    const { getDeviceInfo } = await import("./deviceInfo");
    const deviceInfo = await getDeviceInfo();

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      updateDoc(userRef, {
        loginCount: increment(1),
        lastLoginAt: new Date(),
        loginHistory: arrayUnion({
          timestamp: new Date(),
          ip: deviceInfo.ip,
          deviceInfo: `${deviceInfo.deviceName} (${deviceInfo.os}) - ${deviceInfo.browser}`,
          userAgent: deviceInfo.userAgent,
          location: deviceInfo.location
            ? `${deviceInfo.location.city}, ${deviceInfo.location.country}`
            : "",
          deviceType: deviceInfo.deviceType,
          os: deviceInfo.os,
          browser: deviceInfo.browser,
        }),
      });
    } else {
      const dataBaseofUser: User = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoUrl: user.photoURL || "",
        createdAt: new Date(),
        updatedAt: new Date(),

        // Auth & Security
        provider: "google",
        isVerified: false,
        lastLoginAt: new Date(),
        loginCount: 1,
        roles: [],

        // Account Management
        status: "active",
        loginHistory: [
          {
            timestamp: new Date(),
            ip: deviceInfo.ip,
            deviceInfo: `${deviceInfo.deviceName} (${deviceInfo.os}) - ${deviceInfo.browser}`,
            userAgent: deviceInfo.userAgent,
            location: deviceInfo.location
              ? `${deviceInfo.location.city}, ${deviceInfo.location.country}`
              : "",
            deviceType: deviceInfo.deviceType,
            os: deviceInfo.os,
            browser: deviceInfo.browser,
          },
        ],

        // Customization & Product Features
        settings: {
          theme: "light",
          notifications: true,
        },
        subscription: {
          plan: "free",
          expiresAt: null,
        },
      };

      await setDoc(doc(db, "users", dataBaseofUser.uid), dataBaseofUser);
    }
    return { user, token };
  } catch (error) {
    console.error(
      "Error during Google authentication:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}
