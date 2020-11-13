function createUserProfile(studentid, name, email, yearOfBirth, location, photoURL) {
	// Add a new document in collection "cities"
	db.collection("Users").doc(studentid).set({
		name: name,
		email: email,
		yearOfBirth: yearOfBirth,
		location: location,
    photoURL: photoURL,
	})

	.then(function() {
		console.log("Added student successfuly");
	})
	.catch(function(error) {
		console.log("Error adding student");
	});
}

createUserProfile("111", "jacob twotwo", "j22@coolness.com", "2000", "Burnaby", "http://www.j22.com");