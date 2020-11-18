function populateTutorsTest() {
	// Add a new document in collection "cities"
	db.collection("TutorsTEST").doc("11111TEST").set({
		tutorid: "11111TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Jack",
		schedule: "Monday",
		email: "a@a.ca",
		subjects: [
			'math',
			'physics',
			'science'
		]
	})
	db.collection("Tutors").doc("22222TEST").set({
		tutorid: "22222TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Susan",
		schedule: "Tuesday",
		email: "b@b.ca",
		subjects: [
			'math'
			
		]
	})
	db.collection("Tutors").doc("33333TEST").set({
		tutorid: "33333TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Michael",
		schedule: "Wednesday",
		email: "c@c.ca",
		subjects: [
			'physics'
		]
	})
	db.collection("Tutors").doc("44444TEST").set({
		tutorid: "44444TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Linda",
		schedule: "Thursday",
		email: "d@d.ca",
		computer_science: true,
		subjects: [
			'science'
		]
	})
	db.collection("TutorsTEST").doc("55555TEST").set({
		tutorid: "55555TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Jack",
		schedule: "Monday",
		email: "a@a.ca",
		subjects: [
			'math',
			'physics',
			'science'
		]
	})
	db.collection("Tutors").doc("66666TEST").set({
		tutorid: "66666TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Susan",
		schedule: "Tuesday",
		email: "b@b.ca",
		subjects: [
			'math'
			
		]
	})
	db.collection("Tutors").doc("77777TEST").set({
		tutorid: "77777TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Michael",
		schedule: "Wednesday",
		email: "c@c.ca",
		subjects: [
			'physics'
		]
	})
	db.collection("Tutors").doc("88888TEST").set({
		tutorid: "88888TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Linda",
		schedule: "Thursday",
		email: "d@d.ca",
		computer_science: true,
		subjects: [
			'science'
		]
	})
	.then(function() {
		console.log("Tutors populated successfully!");
	})
	.catch(function(error) {
		console.error("Error populating: ", error);
	});
}

populateTutorsTest();