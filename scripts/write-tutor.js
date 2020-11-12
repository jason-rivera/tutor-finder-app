  
function isLoggedIn() {
  firebase.auth().onAuthStateChanged(function (user) {
        if (user){
            return true;
        }
        else {
            return false;
        }
  })
}

function writeTutor() {  
  $('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
	return false;
  });
  
	$(document).ready(function () {
		$("#submit-button").click(function (){
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					console.log(user.uid + " is now a tutor.");
					db.collection("Tutors").doc(user.uid).update({
						description: document.getElementById("tutor-description").value,
						rate: document.getElementById("rate").value
					})
					if(document.getElementById("mathCheckbox").checked) {
						db.collection("Tutors").doc(user.uid).update({
							math: true
						})
					}
					if(document.getElementById("englishCheckbox").checked) {
						db.collection("Tutors").doc(user.uid).update({
							english: true
						})
					}
					if(document.getElementById("historyCheckbox").checked) {
						db.collection("Tutors").doc(user.uid).update({
							history: true
						})
					}
					if(document.getElementById("programmingCheckbox").checked) {
						db.collection("Tutors").doc(user.uid).update({
							programming: true
						})
					}					
				}
				else {
					console.log("no user signed in");
				}
			})
		});
	});
}
  /*
  $(document).ready(function () {
    $("#submit-button").click(function (){
      
      db.collection("Tutors").doc(user.uid).set({
        rate: document.getElementById("rate").value
      })
                
        
      document.getElementById("welcome-msg").innerText = "Welcome " + n;
      console.log(document.getElementById("tutor-description").value);
      console.log(document.getElementById("rate").value);
      if(document.getElementById("inlineCheckbox1").checked) {
        console.log("Math checked");
      }
      
     });
  }); 
  */

writeTutor();