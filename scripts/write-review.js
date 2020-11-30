var tutorIDForReview = "yjkZGqsqF8cmCJziB05okSOYFj42"; //should be actual tutor id from session

function writeReview() {  
    $('#reviewTutor').submit(function () { //makes it so page doesn't refresh on submit
		return false;
	});
    $(document).ready(function () {
		$("#submitReview").click(function () {
			firebase.auth().onAuthStateChanged(function (user) {
				if (user){
					let reviewID = user.uid + tutorIDForReview;
					let reviewRef =  db.collection("Reviews").doc(reviewID);
					let tutorUserRef = db.collection("Users").doc(tutorIDForReview);
					let tutorRef = db.collection("Tutors").doc(tutorIDForReview);
					reviewRef.get()
					.then(function(docSnapshot) {
						if(docSnapshot.exists) {
							updateTutorUpdatedReview(tutorRef, reviewRef);
							reviewRef.get()
							.then(function(docSnapshot) {
								updateReview(reviewRef);
							});
						} else {
							updateTutorNewReview(tutorRef);
							setReview(reviewRef);
						}
						tutorRef.get()
						.then(function(docSnapshot) {
							updateTutorRating(tutorRef);
						});
					});
                } else {
					console.log("no user signed in");
				}
			})
		});
	});  
}

function updateReview(reviewRef) {
	reviewRef.update({
		onTime: parseInt(document.getElementById("rangeOnTime").value),
		teachingSkill: parseInt(document.getElementById("teachingAbility").value),
		knowledge: parseInt(document.getElementById("knowledge").value),
		message: document.getElementById("reviewTextArea").value,
		Date: new Date()
	})
}

function setReview(reviewRef) {
	reviewRef.set({
		onTime: parseInt(document.getElementById("rangeOnTime").value),
		teachingSkill: parseInt(document.getElementById("teachingAbility").value),
		knowledge: parseInt(document.getElementById("knowledge").value),
		message: document.getElementById("reviewTextArea").value,
		Date: new Date()
	})
}

function updateTutorNewReview(tutorRef) {
	tutorRef.get()
	.then(function(docSnapshot) {
		tutorRef.update({
			onTime: calculateNewAverage(docSnapshot.data().onTime, parseInt(document.getElementById("rangeOnTime").value), docSnapshot.data().reviews),
			teachingSkill: calculateNewAverage(docSnapshot.data().teachingSkill, parseInt(document.getElementById("teachingAbility").value), docSnapshot.data().reviews),
			knowledge: calculateNewAverage(docSnapshot.data().knowledge, parseInt(document.getElementById("knowledge").value), docSnapshot.data().reviews),
			reviews: firebase.firestore.FieldValue.increment(1),
		})
	});
}

function updateTutorUpdatedReview(tutorRef, reviewRef) {
	tutorRef.get()
	.then(function(tutorSnapshot) {
		reviewRef.get()
		.then(function(reviewSnapshot) {
			console.log(reviewSnapshot.data().onTime);
			console.log(updateOldScore(tutorSnapshot.data().onTime, parseInt(document.getElementById("rangeOnTime").value), 
				reviewSnapshot.data().onTime, tutorSnapshot.data().reviews));
			tutorRef.update({
				onTime: updateOldScore(tutorSnapshot.data().onTime, parseInt(document.getElementById("rangeOnTime").value), 
					reviewSnapshot.data().onTime, tutorSnapshot.data().reviews),
				teachingSkill: updateOldScore(tutorSnapshot.data().teachingSkill, parseInt(document.getElementById("teachingAbility").value), 
					reviewSnapshot.data().teachingSkill, tutorSnapshot.data().reviews),
				knowledge: updateOldScore(tutorSnapshot.data().knowledge, parseInt(document.getElementById("knowledge").value), 
					reviewSnapshot.data().knowledge, tutorSnapshot.data().reviews)
			})
		});
	});
}

function updateTutorRating(tutorRef) {
	tutorRef.get()
	.then(function(docSnapshot) {
		tutorRef.update({
			rating : (docSnapshot.data().onTime + docSnapshot.data().teachingSkill + docSnapshot.data().knowledge) / 3
		})
	});
	
}

function calculateNewAverage(average, score, total) {
	return ((average * total) + score) / (total + 1);
}

function updateOldScore(average, newScore, oldScore, total) {
	return ((average * total) + (newScore - oldScore)) / total;
}

writeReview();	                 