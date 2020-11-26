function submitButtonEvent() {  
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
				updateTable(user.uid);
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
					setCalendar(user.uid);
					createCalendar();
				} else {
					createCalendar();
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
		subjects: [], //don't worry about finding unchecked subjects, just reset the array
		//reviews and rating get updated when a review is submitted
	});
}

function setTutorFields(user, tutorRef) {
	console.log(user.uid + "is now a tutor.");
	tutorRef
	.set({
		description: document.getElementById("tutor-description").value,
		rate: parseFloat(document.getElementById("rate").value),
		rating: 0,
		reviews: 0,
		subjects: [],
        schedule: {
			Monday: 	availability.get(calDays[1]),
			Tuesday: 	availability.get(calDays[2]),
			Wednesday: 	availability.get(calDays[3]),
			Thursday: 	availability.get(calDays[4]),
			Friday: 	availability.get(calDays[5]),
			Saturday: 	availability.get(calDays[6]),
			Sunday: 	availability.get(calDays[0])
		}
	})
}




fillForm();
submitButtonEvent();