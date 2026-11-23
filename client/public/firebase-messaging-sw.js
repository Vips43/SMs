console.log("[sw] loaded");

//eslint-disable-next-line
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js",
);

//eslint-disable-next-line
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDDyEFuwkrJ1XQpr1oU4Fa9CUybUnSCx9E",
  authDomain: "notification-9d3ab.firebaseapp.com",
  projectId: "notification-9d3ab",
  storageBucket: "notification-9d3ab.firebasestorage.app",
  messagingSenderId: "168780514012",
  appId: "1:168780514012:web:fbadf30402afdcb915ea19",
  measurementId: "G-ZTJ5QE20JW"
};

//eslint-disable-next-line
firebase.initializeApp(firebaseConfig);

//eslint-disable-next-line
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload,
  );

  // Safely extract title and body from notification or data payloads
  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "Hello! Your Duty time has changed";

  const body =
    payload?.notification?.body ||
    payload?.data?.body ||
    "Your shift has been updated.";

  const options = {
    body: body,
    icon: "/vite.svg",
    badge: "/vite.svg",
  };

  self.registration.showNotification(title, options);
});
