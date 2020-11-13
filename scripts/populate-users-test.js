function populateUsers() {
	// Add a new document in collection "cities"
	db.collection("Users").doc("user1").set({
    studentid: "A001",
		name: "Jack",
		email: "asdf1@asdf.ca",
		photoURL: "url#1.com",
	})
	db.collection("Users").doc("user2").set({
    tutorid: "A002",
		name: "Jack",
		email: "asdf2@asdf.ca",
		photoURL: "url#2.com",
	})
	db.collection("Users").doc("user3").set({
    tutorid: "A003",
		name: "Jack",
		email: "asdf3@asdf.ca",
		photoURL: "url#3.com",
	})
	db.collection("Users").doc("user4").set({
    tutorid: "A004",
		name: "Jack",
		email: "asdf4@asdf.ca",
		photoURL: "url#4.com",
	})
	.then(function() {
		console.log("Users populated successfully!");
	})
	.catch(function(error) {
		console.error("Error populating: ", error);
	});
}

populateUsers();