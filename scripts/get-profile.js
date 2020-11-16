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
          console.log('Name: ' + name);
          console.log('Email: ' + email);
          console.log('Birth year: ' + birthYear);
          console.log('Location: ' + location);
          console.log('Your photo is: ' + pic);
          document.getElementById("your-picture").innerHTML = '<center><br> <img src="' + pic + '" height="100" width="100" alt="Your photo" style="border-radius: 100px"></center><br>';
          document.getElementById("your-name").innerText = "Name: " + name;
          document.getElementById("your-email").innerText = "Email: " + email;
          document.getElementById("your-year").innerHTML = "Birth year: " + birthYear;
          document.getElementById("your-location").innerText = "Location: " + location;
          
      });
    } else {
      console.log('not logged in');
    }
  });
}

getUser();
