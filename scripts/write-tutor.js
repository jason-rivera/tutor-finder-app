function submitButton() {  
	$('#tutor-form').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
	$(document).ready(function () {
		$("#submit-button").click(function (){
			writeTutor();
		});
		//
	});
}

function writeTutor() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user){
			let tutorRef = db.collection("Tutors").doc(user.uid);
			tutorRef.get()
			.then(function(docSnapshot) {
				if(docSnapshot.exists) {
					updateTutorFields(user, tutorRef);
				} else {
					setTutorFields(user, tutorRef);
				}
				writeTimeslot();
				setCheckedSubjects(user, tutorRef);
			});
		} else {
			console.log("no user signed in");
		}
	})
}

function fillForm() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user){
			let tutorRef = db.collection("Tutors").doc(user.uid);
			tutorRef.get()
			.then(function(docSnapshot) {
				if(docSnapshot.exists) {
					$("#tutor-description").val(docSnapshot.data().description);
					$("#rate").val(docSnapshot.data().rate);
					for (i = 0; i < docSnapshot.data().subjects.length; i++) {
						$('#' + docSnapshot.data().subjects[i]).prop("checked", true );
					}
				}
			});
		} else {
			console.log("no user signed in");
			window.location.href = "index.html";
		}
	});
}

function setCheckedSubjects(user, tutorRef) {
	$('.subject-check-input').each(function() {
		if(this.checked) {
			tutorRef.update({
				subjects: firebase.firestore.FieldValue.arrayUnion(this.id)
			})
		}
	})
}

function updateTutorFields(user, tutorRef) {
	console.log(user.uid + " has been updated.");
	tutorRef.update({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		subjects: [] //don't worry about finding unchecked subjects, just reset the array
		//reviews and rating get updated when a review is submitted
	});
}

function setTutorFields(user, tutorRef) {
	console.log(user.uid + "is now a tutor.");
	tutorRef.set({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		rating: 0,
		reviews: 0,
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

fillForm();
submitButton()