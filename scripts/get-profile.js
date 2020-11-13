
function getUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log ("user is signed in");
      db.collection("Users").doc(user.uid).get().then(function(doc){
          let name = doc.data().name;
          let email = doc.data().email;
          let birthYear = doc.data().birthYear;
          let location = doc.data().location;
          let pic = doc.data().photoURL;
          console.log('Your name is: ' + name);
          console.log('Your email is: ' + email);
          console.log('Your birth year is: ' + birthYear);
          console.log('Your location is: ' + location);
          console.log('Your photo is: ' + pic);
          document.getElementById("your-picture").innerHTML = 'Profile Picture: <br><center> <img src="' + pic + ' height="100" width="100" alt="Your photo" style="border-radius: 100px"></center>';
          document.getElementById("your-name").innerText = "Your name: " + name;
          document.getElementById("your-email").innerText = "Your email: " + email;
          document.getElementById("your-year").innerHTML = "Your birth year: " + birthYear;
          document.getElementById("your-location").innerText = "Your location: " + location;
          
      });
    } else {
      console.log('not logged in');
    }
  });
}


getUser();
