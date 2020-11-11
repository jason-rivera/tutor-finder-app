function populateTutors() {
	// Add a new document in collection "cities"
	db.collection("Tutors").doc("Tutor1").set({
        tutorid: "1",
		name: "Jack",
		schedule: "Monday",
		email: "a@a.ca",
		history: true,
		english: true
	})
	db.collection("Tutors").doc("Tutor2").set({
        tutorid: "2",
		name: "Susan",
		schedule: "Tuesday",
		email: "b@b.ca",
		math: true,
		english: true
	})
	db.collection("Tutors").doc("Tutor3").set({
        tutorid: "3",
		name: "Michael",
		schedule: "Wednesday",
		email: "c@c.ca",
		math: true
	})
	db.collection("Tutors").doc("Tutor4").set({
        tutorid: "4",
		name: "Linda",
		schedule: "Thursday",
		email: "d@d.ca",
		computer_science: true,
		math: true
	})
	.then(function() {
		console.log("Tutors populated successfully!");
	})
	.catch(function(error) {
		console.error("Error populating: ", error);
	});
}

populateTutors();