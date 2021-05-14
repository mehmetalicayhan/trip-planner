import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAfK61a0NXJ_30WWoeQKkqms-0rlcGgE2w",
    authDomain: "trip-planner-12a42.firebaseapp.com",
    projectId: "trip-planner-12a42",
    storageBucket: "trip-planner-12a42.appspot.com",
    messagingSenderId: "508889485587",
    appId: "1:508889485587:web:9f067ad0d8d4b8dc224ae6"
}

firebase.initializeApp(config);

export default firebase;
