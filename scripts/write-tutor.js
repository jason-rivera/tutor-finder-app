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
						subjects: []
					})
					$('.form-check-input').each(function() {
						if(this.checked) {
							db.collection("Tutors").doc(user.uid).update({
								subjects: firebase.firestore.FieldValue.arrayUnion(this.id)
							})
						}
					})

					/*
					if(document.getElementById("math").checked) {
						db.collection("Tutors").doc(user.uid).update({
							subjects: firebase.firestore.FieldValue.arrayUnion("math")
						})
					}
					if(document.getElementById("english").checked) {
						db.collection("Tutors").doc(user.uid).update({
							subjects: firebase.firestore.FieldValue.arrayUnion("english")
						})
					}
					if(document.getElementById("history").checked) {
						db.collection("Tutors").doc(user.uid).update({
							subjects: firebase.firestore.FieldValue.arrayUnion("history")
						})
					}
					if(document.getElementById("programming").checked) {
						db.collection("Tutors").doc(user.uid).update({
							subjects: firebase.firestore.FieldValue.arrayUnion("programming")
						})
					}
					*/
				} else {
					console.log("no user signed in");
				}
			})
		});
	});
}

writeTutor();