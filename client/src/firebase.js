import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const app = initializeApp({
  apiKey: "AIzaSyDDyEFuwkrJ1XQpr1oU4Fa9CUybUnSCx9E",
  authDomain: "notification-9d3ab.firebaseapp.com",
  projectId: "notification-9d3ab",
  storageBucket: "notification-9d3ab.firebasestorage.app",
  messagingSenderId: "168780514012",
  appId: "1:168780514012:web:2492ad8ed9d135f615ea19",
  measurementId: "G-VJYRL67T9K",
});

export const requestForToken = async () => {
  try {
    if ((await Notification.requestPermission()) !== "granted") return null;
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );
    return await getToken(getMessaging(app), {
      vapidKey:
        "BKHyHYzB2d1ecg5HgPs6ETzb2-jAq8c0uRuQU2JyPo6pg5ijFEJGRhiEaqjyZPFL9p_JoenPeq57QGtydvAJIlQ",
      serviceWorkerRegistration: registration,
    });
  } catch (e) {
    console.error("FCM token error:", e.code, e.message);
    return () => {};
  }
};

export const onForegroundMessage = (cb) => {
  try {
    return onMessage(getMessaging(app), cb);
  } catch {
    return () => {};
  }
};
