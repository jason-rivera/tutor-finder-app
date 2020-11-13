
function updateUserProfileAuth() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("Users").doc(user.uid).get().then(function(doc){
          var n = doc.data().name;
          console.log('Your name is: ' + n);
          document.getElementById("hello").innerText = "Hello " + n;
      });
    } else {
      console.log('not logged in');
    }
  });
}

updateUserProfileAuth();
