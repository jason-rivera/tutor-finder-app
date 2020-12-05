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
          document.getElementById("your-picture").innerHTML = '<center> <img id="profile-pic" src="' + pic + '"></center><br>';
          document.getElementById("your-name").innerText = name;
          document.getElementById("your-email").innerText = email;
          document.getElementById("your-year").innerHTML = birthYear;
          document.getElementById("your-location").innerText = location;
		  document.getElementById("name-text").value = name;
		  document.getElementById("email-text").value = email;
		  document.getElementById("birth-year-text").value = birthYear;
		  document.getElementById("location-text").value = location;
		  if(pic != "images/profile_pic0.png") {
			document.getElementById("picture-text").value = pic;
		  }
      });
    } else {
      console.log('not logged in');
    }
  });
}

getUser();
