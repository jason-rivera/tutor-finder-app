function writeTutor() {  
	$('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
  
	$(document).ready(function () {
		$("#submit-button").click(function (){
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					console.log(user.uid + " is now a tutor.");
					db.collection("Tutors").doc(user.uid).set({
						description: document.getElementById("tutor-description").value,
						rate: parseFloat(document.getElementById("rate").value),
						math: document.getElementById("mathCheckbox").checked,
						english: document.getElementById("englishCheckbox").checked,
						history: document.getElementById("historyCheckbox").checked,
						programming: document.getElementById("programmingCheckbox").checked
					})
				} else {
					console.log("no user signed in");
				}
			})
		});
	});
}

writeTutor();