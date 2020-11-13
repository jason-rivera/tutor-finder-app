
function updateUserProfileAuth() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("Users").doc(user.uid).get().then(function(doc){
          let name = doc.data().name;
          let email = doc.data().email;
          let birthYear = doc.data().yearOfBirth;
          let location = doc.data().location;
          let pic = doc.data().photoURL;
          console.log('Your name is: ' + name);
          console.log('Your email is: ' + email);
          console.log('Your birth year is: ' + birthYear);
          console.log('Your location is: ' + location);
          console.log('Your photo is: ' + pic);
          document.getElementById("your-name").innerText = "Your name: " + name;
          document.getElementById("your-email").innerText = "Your email: " + email;
          document.getElementById("your-year").innerText = "Your birth year: " + birthYear;
          document.getElementById("your-location").innerText = "Your location: " + location;
          document.getElementById("your-picture").innerText = "Your picture: " + pic;
      });
    } else {
      console.log('not logged in');
    }
  });
}


updateUserProfileAuth();
