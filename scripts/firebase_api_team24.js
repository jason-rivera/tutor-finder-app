//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Specifies which firebase project your application is connected with.
//---------------------------------------------------------------------

var firebaseConfig = {
    
    apiKey: "AIzaSyAdceSCFD_y9j2u38Tiswuw4pr6fGM1Z-o",
    authDomain: "tutorapp-1800.firebaseapp.com",
    databaseURL: "https://tutorapp-1800.firebaseio.com",
    projectId: "tutorapp-1800",
    storageBucket: "tutorapp-1800.appspot.com",
    messagingSenderId: "109211739140",
    appId: "1:109211739140:web:abe622657c8a28788c0151"
    
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Create the Firestore database object
  // Henceforce, any reference to the database can be made with "db"
  const db = firebase.firestore();