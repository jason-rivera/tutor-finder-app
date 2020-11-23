function populateTutorsTest() {
	// Add a new document in collection "cities"
	db.collection("TutorsTEST").doc("11111TEST").set({
		tutorid: "11111TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Jack",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "a@a.ca",
		rate: 10,
		subjects: [
			'math',
			'physics',
			'science'
		]
	})
	db.collection("TutorsTEST").doc("22222TEST").set({
		tutorid: "22222TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Susan",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "b@b.ca",
		rate: 15,
		subjects: [
			'math'
			
		]
	})
	db.collection("TutorsTEST").doc("33333TEST").set({
		tutorid: "33333TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Michael",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "c@c.ca",
		rate: 20,
		subjects: [
			'physics'
		]
	})
	db.collection("TutorsTEST").doc("44444TEST").set({
		tutorid: "44444TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Linda",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "d@d.ca",
		rate: 25,
		subjects: [
			'science'
		]
	})
	db.collection("TutorsTEST").doc("55555TEST").set({
		tutorid: "55555TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Jack",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "a@a.ca",
		rate: 30,
		subjects: [
			'math',
			'physics',
			'science'
		]
	})
	db.collection("TutorsTEST").doc("66666TEST").set({
		tutorid: "66666TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Susan",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "b@b.ca",
		rate: 35,
		subjects: [
			'math'
			
		]
	})
	db.collection("TutorsTEST").doc("77777TEST").set({
		tutorid: "77777TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Michael",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "c@c.ca",
		rate: 40,
		subjects: [
			'physics'
		]
	})
	db.collection("TutorsTEST").doc("88888TEST").set({
		tutorid: "88888TEST",
		tutorProfilePic: 'https://dummyimage.com/128x128/4d4d4d/ffffff&text=Tutor+profile+pic',
		name: "Linda",
		schedule: {
			// 0 never avalible, 1 avalible, 2 booked. array pos means hour
			Monday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Tuesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Wednesday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Thursday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Friday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Saturday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
			Sunday: 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
		},
		email: "d@d.ca",
		rate: 45,
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