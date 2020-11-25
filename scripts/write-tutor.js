function writeTutor() {  
	$('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
  
	$(document).ready(function () {
		$("#submit-button").click(function (){
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					db.collection("Tutors").doc(user.uid).get()
					.then(function(docSnapshot) {
						if(docSnapshot.exists) {
							updateTutorFields(user);
							setCheckedSubjects(user);
						} else {
							setTutorFields(user);
							setCheckedSubjects(user);
						}
					});
				} else {
					console.log("no user signed in");
				}
				writeTimeslot();
				
			})
		});
	});
}

function setCheckedSubjects(user) {
	$('.form-check-input').each(function() {
		if(this.checked) {
			db.collection("Tutors").doc(user.uid).update({
				subjects: firebase.firestore.FieldValue.arrayUnion(this.id)
			})
		}
	})
}

function updateTutorFields(user) {
	console.log(user.uid + " has been updated.");
	db.collection("Tutors").doc(user.uid).update({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		subjects: [],
	});
}

function setTutorFields(user) {
	console.log(user.uid + "is now a tutor.");
	db.collection("Tutors").doc(user.uid).set({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		rating: 0,
		subjects: [],
	})
}

function writeTimeslot() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user){
			db.collection("Timeslots").add({
				tutorId: user.uid,
				day: document.getElementById("day").value,
				start: document.getElementById("start-time").value,
				end: document.getElementById("end-time").value
			})
		}
	});
}

writeTutor();